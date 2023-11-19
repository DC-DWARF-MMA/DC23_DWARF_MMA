import React, { useState, useEffect } from "react";
import {
  ClientInterfaceIn,
  ContractInterface,
  ContractInterfaceIn,
  PaymentType,
  ServiceInterfaceIn,
} from "../models/models";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Card,
  CardContent,
  Checkbox,
} from "@mui/material";
import { useSaveData, useServices } from "../services/FirebaseService";
import { Option, Select } from "../forms/formElements/Select";
import { useUser } from "./formsContext/UserContext";

type ContractEditPropsType = {
  contract: ContractInterface;
};

const ContractEditForm: React.FC<ContractEditPropsType> = (props) => {
  const services = useServices();

  const [formValues, setFormValues] = useState<ContractInterfaceIn>({
    email: props.contract.email,
    endDate: new Date(props.contract.endDate.toDate()),
    paymentMethod: props.contract.paymentMethod,
    services: props.contract.services,
    startDate: new Date(props.contract.startDate.toDate()),
    status: props.contract.status,
  });
  const [subscriptionLength, setSubscriptionLength] = useState<number>(1);

  const { isCompleted, saveData } = useSaveData("contracts");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == "startDateString") {
      const endDate = getEndDate(new Date(value), subscriptionLength);
      setFormValues({
        ...formValues,
        ["startDate"]: new Date(value),
        ["endDate"]: endDate,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveData(formValues, props.contract.id);
  };

  const handleLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name == "subscriptionLength") {
      setSubscriptionLength(Number(value));

      const endDate = getEndDate(formValues.startDate, Number(value));

      let services = props.contract.services;
      let newServices = services.map((service) => ({
        ServiceName: service.ServiceName,
        Amount: Number(value),
      }));
      setFormValues({
        ...formValues,
        ["services"]: newServices,
        ["endDate"]: endDate,
      });
    }
  };

  //   const handleServiceChange = () => {
  //     const newServices = selectedCards.map((service) => ());
  //     setFormValues({...formValues, ["services"]: newServices});
  //   };

  // const [selectedCards, setSelectedCards] = useState<ServiceInterfaceIn[]>([]);

  // const toggleCardSelection = (service: ServiceInterfaceIn) => {
  //   if (selectedCards.includes(service)) {
  //     setSelectedCards(
  //       selectedCards.filter((selectedService) => selectedService !== service)
  //     );
  //   } else {
  //     setSelectedCards([...selectedCards, service]);
  //   }
  //   handleServiceChange();
  // };

  const getEndDate = (startDate: Date, subscriptionLength: number) => {
    let endDate = new Date(startDate);
    if (
      !props.contract.services.some(
        (service) => service.ServiceName === "Regularna Subskrybcja"
      )
    ) {
      console.log("No subscription service selected");
      return endDate;
    }
    if (subscriptionLength == 1) {
      endDate.setMonth(endDate.getMonth() + 1); // Add 1 month
    } else if (subscriptionLength == 12) {
      endDate.setMonth(endDate.getMonth() + 12); // Add 12 months
    }
    return endDate;
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "10px" }}>
      {!isCompleted && (
        <>
          <form onSubmit={handleSubmit}>
            {/* <Grid container spacing={2}>
            {services &&
              services.map((service) => (
                <Grid
                  item
                  key={service.name}
                  xs={12}
                  sm={6}
                  md={4}
                  minWidth={300}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {service.name}
                      </Typography>
                      <Typography variant="subtitle1">
                        Typ: {service.type}
                      </Typography>
                      <Typography variant="subtitle2">
                        Cena: {service.price} zł
                      </Typography>
                      <Checkbox
                        checked={selectedCards.includes(service)}
                        onChange={() => toggleCardSelection(service)}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid> */}
            {/* 
            <Grid item xs={12}>
              <TextField
                name="endDateString"
                label="End Date"
                type="date"
                variant="outlined"
                fullWidth
                value={formValues.endDate.toISOString().slice(0, 10)}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                name="startDateString"
                label="Data rozpoczęcia"
                type="date"
                variant="outlined"
                fullWidth
                value={formValues.startDate.toISOString().slice(0, 10)}
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Typography variant="h6">Długość subskrypcji</Typography>
            <RadioGroup
              aria-label="Subscription Length"
              name="subscriptionLength"
              value={subscriptionLength}
              onChange={handleLengthChange}
              row
            >
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="1 miesiąc"
              />
              <FormControlLabel
                value={12}
                control={<Radio />}
                label="12 miesięcy"
              />
            </RadioGroup>
            <Typography variant="h6">Metoda Płatności</Typography>
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
                Wyślij
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
