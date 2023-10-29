import { Navbar } from "../shared/Navbar";
import { Typography, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useClient } from "../services/FirebaseService";
import UserRegistrationForm from "../forms/UserRegistrationForm";
import { ServicePurchaseForm } from "../forms/ServicePurchaseForm";
import { UserEmailInputForm } from "../forms/UserEmailInputForm";
import { useUser } from "../forms/formsContext/UserContext";
const centerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  minHeight: "100vh",
};

export const Services = () => {
  const { email } = useUser();

  return (
    <>
      <Navbar />
      <div style={centerStyle}>
        {!email && <UserEmailInputForm />}
        {email && (
          <>
            <Typography variant="h5">User: {email}</Typography>
            <ServicePurchaseForm email={email} />
          </>
        )}
      </div>
    </>
  );
};
