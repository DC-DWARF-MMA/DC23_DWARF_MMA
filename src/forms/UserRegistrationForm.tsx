import React, { useState, useEffect } from "react";
import { ClientInterfaceIn } from "../models/models";
import { TextField, Button, Grid, Container, Typography } from "@mui/material";
import { useSaveData } from "../services/FirebaseService";
import { Option, Select } from "../forms/formElements/Select";
type UserRegistrationPropsType = {
  email: string;
  setUserExists: (value: boolean) => void;
};
const UserRegistrationForm: React.FC<UserRegistrationPropsType> = (props) => {
  const [formValues, setFormValues] = useState<ClientInterfaceIn>({
    birthDate: new Date(),
    email: props.email,
    firstName: "",
    gender: "male",
    lastName: "",
    phoneNumber: "",
  });
  const { isCompleted, saveData } = useSaveData("clients");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveData(formValues);
    console.log(formValues);
  };

  useEffect(() => {
    if (isCompleted) {
      const timeoutId = setTimeout(() => {
        props.setUserExists(true);
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isCompleted]);
  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      {!isCompleted && (
        <>
          <Typography variant="h5">
            User not found. Please fill your data:
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={formValues.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={formValues.email}
                  disabled={true}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                  value={formValues.phoneNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  defaultValue={"male"}
                  onChange={(_, newGender) => {
                    if (newGender !== null) {
                      setFormValues({ ...formValues, gender: newGender });
                    }
                  }}
                >
                  <Option value={"male"}>Male</Option>
                  <Option value={"female"}>Female</Option>
                </Select>
                {/* <TextField
              name="gender"
              label="Gender"
              variant="outlined"
              fullWidth
              value={formValues.gender}
              onChange={handleInputChange}
            /> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="birthDate"
                  label="Birth Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  value={formValues.birthDate}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      )}
      {isCompleted && <h4>Form submitted!</h4>}
    </Container>
  );
};

export default UserRegistrationForm;
