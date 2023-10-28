import { Navbar } from "../shared/Navbar";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useClient } from "../services/FirebaseService";
import UserRegistrationForm from "../forms/UserRegistrationForm";
import { ServicePurchaseForm } from "../forms/ServicePurchaseForm";
const centerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  minHeight: "100vh",
};

export const Services = () => {
  const [email, setEmail] = useState<string>("e-mail");
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const { client, fetchClient } = useClient();
  async function handleClick() {
    await fetchClient(email);
    setUserExists(client ? true : false);
  }
  console.log(userExists);
  return (
    <>
      <Navbar />
      <div style={centerStyle}>
        {!userExists && (
          <>
            <Typography variant="h5">Please provide your e-mail:</Typography>
            <TextField
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="e-mail"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleClick}>
              Check e-mail
            </Button>
          </>
        )}
        {userExists === false && (
          <>
            <UserRegistrationForm email={email} setUserExists={setUserExists} />
          </>
        )}
        {userExists === true && (
          <>
            <Typography variant="h5">User: {email}</Typography>
            <ServicePurchaseForm />
          </>
        )}
      </div>
    </>
  );
};
