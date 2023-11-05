import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";
import jsPDF from "jspdf";
import { ContractInterface } from "../models/models";
import { useEffect } from "react";

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
    doc.setFontSize(24);
    doc.text("Invoice", 40, 60);
    doc.setFontSize(10);
    doc.text(`Invoice Number: ${invoice.id}`, 40, 90);
    doc.text(
      "Date: " + invoice.contract.startDate.toDate().toDateString(),
      40,
      110
    );
    doc.text(
      `Customer Name: ${invoice.client.firstName} ${invoice.client.lastName}`,
      40,
      130
    );
    doc.text(`Customer Email Address: ${invoice.client.email}`, 40, 150);

    doc.setFontSize(14);
    doc.text("Services:", 40, 200);
    doc.line(40, 210, 550, 210);
    // Add item details
    doc.setFontSize(12);
    let yOffset = 240;
    let total = 0;

    invoice.contract.services.forEach((item) => {
      const itemPrice =
        invoice.services
          .filter((service) => service.name === item.ServiceName)
          .at(0)?.price ?? 0;
      doc.text(`Service: ${item.ServiceName}`, 40, yOffset);
      doc.text(`Quantity: ${item.Amount}`, 300, yOffset);
      doc.text(`Price: ${itemPrice}`, 400, yOffset);
      doc.text(`Total: ${itemPrice * item.Amount}`, 500, yOffset);
      total += itemPrice * item.Amount;
      yOffset += 20;
    });
    // Add total
    doc.line(40, yOffset, 550, yOffset);
    doc.setFontSize(14);
    doc.text(`Total: ${total}`, 400, yOffset + 30);

    doc.save("testPDF.pdf");
  };

  return (
    <Button variant="contained" onClick={generateInvoice}>
      Click here to generate invoice
    </Button>
  );
};
