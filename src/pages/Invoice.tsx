import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";
import { ContractInterface } from "../models/models";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

interface InvoiceInterface {
  contract: ContractInterface;
}

export const Invoice = ({ contract }: InvoiceInterface) => {
  const { invoice, fetchInvoice } = useInvoice(contract);
  const [invoiceFetched, setInvoiceFetched] = useState(false);

  return (
    <div>
      {invoiceFetched ? (
        invoice ? (
          <h2>{JSON.stringify(invoice, null, 2)}</h2>
        ) : (
          <CircularProgress />
        )
      ) : (
        <Button
          variant="contained"
          onClick={() => {
            fetchInvoice();
            setInvoiceFetched(true);
          }}
        >
          Click here to generate invoice
        </Button>
      )}
    </div>
  );
};