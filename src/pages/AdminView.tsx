import Button from "@mui/material/Button/Button";
import { ContractInterface } from "../models/models";
import { Document, HeadingLevel, Packer, Paragraph } from "docx";

import { saveAs } from "file-saver";

export const AdminView = ({
  contracts,
}: {
  contracts: ContractInterface[];
}) => {
  const onClick = () => {
    const now = new Date();
    var priorDate = new Date(new Date().setDate(now.getDate() - 30));
    const correctContracts = contracts.filter(
      (contract) =>
        contract.startDate.toDate() > priorDate &&
        contract.startDate.toDate() < now
    );

    const results: Record<string, string> = {};
    const results2: Record<string, string> = {};

    correctContracts.forEach((contract) => {
      contract.services.forEach((service) => {
        results[service.ServiceName] = results[service.ServiceName] ?? "0";
        const currentAmount = parseFloat(results[service.ServiceName]);
        let serviceAmount = service.Amount;
        if (typeof serviceAmount === "string") {
          serviceAmount = parseFloat(serviceAmount as string);
        }

        results[service.ServiceName] = (
          currentAmount + serviceAmount
        ).toString();
      });
      results2[contract.paymentMethod] =
        results2[contract.paymentMethod] ?? "0";
      results2[contract.paymentMethod] = (
        parseFloat(results2[contract.paymentMethod]) + 1
      ).toString();
    });

    const servicesDisplay = Object.entries(results).map(
      (entry) =>
        new Paragraph({
          text: entry[0] + " została zamówiona " + entry[1] + " razy",
          bullet: { level: 0 },
        })
    );

    const paymentMethods = Object.entries(results2).map(
      (entry) =>
        new Paragraph({
          text: entry[0] + " był użyty " + entry[1] + " razy",
          bullet: { level: 0 },
        })
    );

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              text: "Statystyki",
              heading: HeadingLevel.TITLE,
            }),
            new Paragraph({
              text: `Z okresu ${priorDate.toDateString()} - ${now.toDateString()}`,
            }),
            new Paragraph({
              text: "Wykaz wykorzystywanych usług:",
            }),
            ...servicesDisplay,
            new Paragraph({
              text: "Wykaz wykorzystywanych metod płatności:",
            }),
            ...paymentMethods,
          ],
        },
      ],
    });
    Packer.toBlob(doc).then((blob) => saveAs(blob, "statystyki.docx"));
  };

  return (
    <>
      <Button variant="contained" onClick={onClick}>
        Generuj statystyki z ubiegłego miesiąca
      </Button>
      <h2>Umowy wszystkich klientow</h2>
    </>
  );
};
