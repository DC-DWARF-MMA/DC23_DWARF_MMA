import Button from "@mui/material/Button";
import { useInvoice } from "../services/InvoiceService";

export const Invoice = () => {
  const { invoice, fetchInvoice } = useInvoice(
    "XvOOXEwCVhOq6q6oha1X",
    "piotrgarbowski@gmail.com"
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
