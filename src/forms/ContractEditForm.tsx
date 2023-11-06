import React, { useState, useEffect } from "react";
import { ClientInterfaceIn, ContractInterface, ContractInterfaceIn, PaymentType } from "../models/models";
import { TextField, Button, Grid, Container, Typography, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useSaveData } from "../services/FirebaseService";
import { Option, Select } from "../forms/formElements/Select";
import { useUser } from "./formsContext/UserContext";

type ContractEditPropsType = {
    contract: ContractInterface
};

const ContractEditForm: React.FC<ContractEditPropsType> = (props) => {
    const [formValues, setFormValues] = useState<ContractInterfaceIn>({
        email: props.contract.email,
        endDate: new Date(props.contract.endDate.toDate()),
        paymentMethod: props.contract.paymentMethod,
        services: props.contract.services,
        startDate: new Date(props.contract.endDate.toDate()),
        status: props.contract.status,
    });

    //const isCompleted = false;
    const { isCompleted, saveData } = useSaveData("contracts");
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      saveData(formValues, props.contract.id);
      console.log(formValues);
    };
  
    // useEffect(() => {
    //   if (isCompleted) {
    //     const timeoutId = setTimeout(() => {
    //       setEmail(formValues.email);
    //     }, 2000);
    //     return () => {
    //       clearTimeout(timeoutId);
    //     };
    //   }
    // }, [isCompleted]);
  
    return (
      <Container maxWidth="sm" style={{ marginTop: "10px" }}>
        {!isCompleted && (
          <>
            <form onSubmit={handleSubmit}>
               {/* <Grid item xs={12}>
                  <TextField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={formValues.startDate.toISOString().slice(0,10)}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="endDate"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={formValues.endDate.toISOString().slice(0,10)}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid> */}
              <Typography variant="h6">Payment Method</Typography>
                  <RadioGroup
                    aria-label="Payment Method"
                    name="paymentMethod"
                    value={formValues.paymentMethod}
                    onChange={handleInputChange}
                    row
                  >
                    {Object.values(PaymentType).map((paymentType) => (
                      <FormControlLabel
                        key={paymentType}
                        value={paymentType}
                        control={<Radio />}
                        label={paymentType}
                      />
                    ))}
                  </RadioGroup>

                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </Grid>
            </form>
          </>
        )}
        {isCompleted && (
          <Typography variant="h5" justifyContent="center">
            Form submitted!
          </Typography>
        )}
      </Container>
    );
  };
  
export default ContractEditForm;
    