import { useState } from "react";
import { useSaveData, useServices } from "../services/FirebaseService";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Checkbox,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import {
  ContractInterfaceIn,
  PaymentType,
  ServiceInterfaceIn,
} from "../models/models";
import axios from "axios";
import { API_SEND_EMAIL_URL, MULTIPART_FORM_DATA_HEADER } from "../models/constants";
type ServicePurchaseFormPropsType = {
  email: string;
};
type ContractInformationType = {
  paymentMethod: PaymentType;
  subscriptionLength: number;
};
export const ServicePurchaseForm: React.FC<ServicePurchaseFormPropsType> = (
  props
) => {
  const services = useServices();
  const { saveData, isCompleted } = useSaveData("contracts");
  const [selectedCards, setSelectedCards] = useState<ServiceInterfaceIn[]>([]);
  const [contractInformation, setContractInformation] =
    useState<ContractInformationType>({
      paymentMethod: PaymentType.CREDIT_CARD,
      subscriptionLength: 1,
    });
  const toggleCardSelection = (service: ServiceInterfaceIn) => {
    if (selectedCards.includes(service)) {
      setSelectedCards(
        selectedCards.filter((selectedService) => selectedService !== service)
      );
    } else {
      setSelectedCards([...selectedCards, service]);
    }
  };

  const totalSelectedPrice = selectedCards.reduce((total, service) => {
    return (
      total +
      (service
        ? service.type === "Subscription"
          ? service.price * contractInformation.subscriptionLength
          : service.price
        : 0)
    );
  }, 0);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setContractInformation({ ...contractInformation, [name]: value });
  };
  const getEndDate = () => {
    let endDate = new Date();
    if (!selectedCards.some((service) => service.type === "Subscription")) {
      console.log("No subscription service selected");
      return endDate;
    }
    if (Number(contractInformation.subscriptionLength) === 1) {
      endDate.setMonth(endDate.getMonth() + 1); // Add 1 month
    } else if (Number(contractInformation.subscriptionLength) === 12) {
      endDate.setMonth(endDate.getMonth() + 12); // Add 12 months
      console.log("12 months added");
    }
    return endDate;
  };
  const handlePurchase = () => {
    console.log("handlePurchase");
    const data: ContractInterfaceIn = {
      email: props.email,
      services: selectedCards.map((service) => ({
        ServiceName: service.name,
        Amount:
          service.type === "Subscription"
            ? contractInformation.subscriptionLength
            : 1,
      })),
      startDate: new Date(),
      endDate: getEndDate(),
      paymentMethod: contractInformation.paymentMethod,
      status: "Unpaid",
    };
    saveData(data);
    sendEmail(props.email, 'Krotki tekst widoczny w mailu', new File([], 'test.pdf'));
  };

  const sendEmail = (email: string, text: string, pdfInvoideFile: File) => {
    const formData = new FormData();

    formData.append('to', email);
    formData.append('subject', 'Mail od Dwarf MMA');
    formData.append('text', text);
    formData.append('attachment', pdfInvoideFile);

    axios.post(API_SEND_EMAIL_URL, formData, MULTIPART_FORM_DATA_HEADER).catch((error) => {
      alert("Email was not sent! Server is probably down.");
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!isCompleted ? (
        <>
          <Typography variant="h5">
            Total Selected Price: ${totalSelectedPrice}
          </Typography>
          <Grid container spacing={2}>
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
                        Type: {service.type}
                      </Typography>
                      <Typography variant="subtitle2">
                        Price: ${service.price}
                      </Typography>
                      <Checkbox
                        checked={selectedCards.includes(service)}
                        onChange={() => toggleCardSelection(service)}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
          <FormControl component="fieldset">
            <Typography variant="h6">Subscription Length</Typography>
            <RadioGroup
              aria-label="Subscription Length"
              name="subscriptionLength"
              value={contractInformation.subscriptionLength}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value={1} control={<Radio />} label="1 Month" />
              <FormControlLabel
                value={12}
                control={<Radio />}
                label="12 Months"
              />
            </RadioGroup>
            <Typography variant="h6">Payment Method</Typography>
            <RadioGroup
              aria-label="Payment Method"
              name="paymentMethod"
              value={contractInformation.paymentMethod}
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
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePurchase}
            >
              BUY SERVICES
            </Button>
          </FormControl>
        </>
      ) : (
        <Typography variant="h5">Purchase completed!</Typography>
      )}
    </div>
  );
};
