import { useClient } from "../services/FirebaseService";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import { useUser } from "./formsContext/UserContext";
type UserExists = {
  state: boolean | null;
};
export const UserEmailInputForm = () => {
  const { fetchClient } = useClient();
  const [userExists, setUserExists] = useState<UserExists>({ state: null });
  const [emailInput, setEmailInput] = useState<string>("e-mail");
  const { email, setEmail } = useUser();
  async function handleClick() {
    const isFound = await fetchClient(emailInput);
    if (isFound) {
      setEmail(emailInput);
    } else {
      setUserExists({ state: false });
    }
  }
  return (
    <>
      {email === null && (
        <>
          <Typography variant="h5">Wpisz E-mail:</Typography>
          <TextField
            label="e-mail"
            variant="outlined"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleClick}
            style={{ marginTop: "5px" }}
          >
            Zatwierdź
          </Button>
        </>
      )}
      {userExists.state === false && (
        <>
          <UserRegistrationForm email={emailInput} />
        </>
      )}
    </>
  );
};
