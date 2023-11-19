import { useCallback, useEffect, useState } from "react";
import { useClient, useServices } from "./FirebaseService";
import {
  ClientInterface,
  ContractInterface,
  ServiceInterface,
} from "../models/models";
import jsPDF from "jspdf";

export const useInvoice = (contract: ContractInterface) => {
  const { client, fetchClient } = useClient();
  const services = useServices();

  const [invoice, setInvoice] = useState<InvoiceInterface>();

  useEffect(() => {
    if (contract && client && services) {
      const total = services
        ?.filter((service) =>
          contract?.services
            .map((service) => service.ServiceName)
            .includes(service.name)
        )
        .reduce((acc, service) => acc + service.price, 0);
      setInvoice({ id: contract.id, client, contract, services, total });
    }
  }, [contract, client, services]);

  const fetchInvoice = useCallback(async () => {
    await fetchClient(contract.email);
  }, [contract.email, fetchClient]);

  return { invoice, fetchInvoice };
};

export const generatePDFInvoiceFile = async (invoice: any, fileName: String): Promise<File> => {
  
  const doc = new jsPDF("p", "pt");
  doc.setFont('Lato-Regular', 'normal');
  doc.setFontSize(24);
  doc.text("Faktura", 40, 60);
  doc.setFontSize(10);
  doc.text(`Identyfikator faktury: ${invoice.id}`, 40, 90);
  doc.text(
    "Data: " + invoice.contract.startDate.toDate().toDateString(),
    40,
    110
  );
  doc.text(
    `Nazwa klienta: ${invoice.client.firstName} ${invoice.client.lastName}`,
    40,
    130
  );
  doc.text(`Adres e-mail klienta: ${invoice.client.email}`, 40, 150);

  doc.setFontSize(14);
  doc.text("Usługi:", 40, 200);
  doc.line(40, 210, 550, 210);
  // Add item details
  doc.setFontSize(10);
  let yOffset = 240;
  let total = 0;

  invoice.contract.services.forEach((item: any) => {
    const itemPrice =
      invoice.services
        .filter((service: any) => service.name === item.ServiceName)
        .at(0)?.price ?? 0;
    doc.text(`Usługa: ${item.ServiceName}`, 40, yOffset);
    doc.text(`Długość: ${item.Amount}`, 240, yOffset);
    doc.text(`Cena: ${itemPrice} zł`, 340, yOffset);
    doc.text(`Całkowita cena: ${itemPrice * item.Amount} zł`, 440, yOffset);
    total += itemPrice * item.Amount;
    yOffset += 20;
  });
  // Add total
  doc.line(40, yOffset, 550, yOffset);
  doc.setFontSize(14);
  doc.text(`Całkowita cena: ${total} zł`, 400, yOffset + 30);

  doc.save(`${fileName}.pdf`);
  // new Blob([doc.output()], { type: "application/pdf" });
  return new File([doc.output()], `${fileName}.pdf`, {
    type: "application/pdf",
  });
};

export interface InvoiceInterface {
  id: string;
  client: ClientInterface;
  contract: ContractInterface;
  services: ServiceInterface[];
  total: number;
}
