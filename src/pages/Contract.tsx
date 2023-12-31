import { ContractInterface } from "../models/models";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { InvoiceGenerator } from "./InvoiceGenerator";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Contract = ({ contract }: { contract: ContractInterface }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        paddingY: "20px",
        "& > :not(style)": {
          m: 1,
          minWidth: 300,
          width: "50%",
          height: 700,
        },
      }}
    >
      <Paper elevation={3}>
        <h2>Usługi:</h2>
        <div>
          {contract.services.map((service, index) => (
            <div key={index}>
              <p>Nazwa: {service.ServiceName}</p>
            </div>
          ))}
        </div>
        <h2>Data zakupu:</h2>
        <p>{contract.startDate.toDate().toDateString()}</p>
        <h2>Data zakończenia umowy:</h2>
        <p>{contract.endDate.toDate().toDateString()}</p>
        <h2>Metoda płatności:</h2>
        <p>{contract.paymentMethod}</p>
        <h2>Status:</h2>
        <p>{contract.status}</p>
        <InvoiceGenerator contract={contract} />
        <p> </p>
        <Button variant="contained" component={Link} to={"/Edit?id=" + contract.id}>
            Edytuj Kontrakt
        </Button>
      </Paper>
    </Box>
  );
};
