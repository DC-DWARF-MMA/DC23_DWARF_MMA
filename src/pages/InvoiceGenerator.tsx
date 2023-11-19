import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";
import jsPDF from "jspdf";
import { ContractInterface } from "../models/models";
import { useEffect } from "react";
import "../fonts/Lato-Regular-normal";

export const InvoiceGenerator = ({
  contract,
}: {
  contract: ContractInterface;
}) => {
  const { invoice, fetchInvoice } = useInvoice(contract);

  useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);

  const generateInvoice = async () => {
    if (!invoice) return;
    const doc = new jsPDF("p", "pt");
    doc.setFont("Lato-Regular", "normal");
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
    // Add item details
    doc.setFontSize(10);
    let yOffset = 240;
    let total = 0;

    invoice.contract.services.forEach((item) => {
      const itemPrice =
        invoice.services
          .filter((service) => service.name === item.ServiceName)
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

    doc.save("faktura.pdf");
  };

  return (
    <Button variant="contained" onClick={generateInvoice} color="error">
      Wygeneruj fakturę
    </Button>
  );
};
