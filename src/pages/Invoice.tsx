import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";

export const Invoice = () => {
  const { invoice, fetchInvoice } = useInvoice(
    "JmkmSHO5vsi1jHm8oHwt",
    "miroslaw@gmail.com"
  );

  return (
    <div>
      {invoice ? (
        <h2>{JSON.stringify(invoice)}</h2>
      ) : (
        <Button variant="contained" onClick={fetchInvoice}>
          Click here to generate invoice for ""
        </Button>
      )}
    </div>
  );
};
