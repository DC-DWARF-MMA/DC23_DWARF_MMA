import { ContractInterface } from "../models/models";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Invoice } from "./Invoice";

export const Contract = ({ contract }: { contract: ContractInterface }) => {
  const [showInvoice, setShowInvoice] = useState(false);

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
        backgroundColor: "#89CFF3",
      }}
    >
      <Paper elevation={3}>
        <h2>Services:</h2>
        <div>
          {contract.services.map((service, index) => (
            <div key={index}>
              <p>
                Name: {service.ServiceName}, Amount: {service.Amount.toString()}
              </p>
            </div>
          ))}
        </div>
        <h2>Start date:</h2>
        <p>{contract.startDate.toDate().toDateString()}</p>
        <h2>End date:</h2>
        <p>{contract.endDate.toDate().toDateString()}</p>
        <h2>Payment method:</h2>
        <p>{contract.paymentMethod}</p>
        <h2>Status:</h2>
        <p>{contract.status}</p>
        <Invoice contract={contract} />
      </Paper>
    </Box>
  );
};
