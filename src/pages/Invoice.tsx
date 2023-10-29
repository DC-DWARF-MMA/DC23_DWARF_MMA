import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";
import { ContractInterface } from "../models/models";

interface InvoiceInterface{
  contract: ContractInterface
}

export const Invoice = ({contract} : InvoiceInterface) => {
  const { invoice, fetchInvoice } = useInvoice(
    contract
  );

  return (
    <div>
      {invoice ? (
        <h2>{JSON.stringify(invoice)}</h2>
      ) : (
        <Button variant="contained" onClick={fetchInvoice}>
          Click here to generate invoice
        </Button>
      )}
    </div>
  );
};
