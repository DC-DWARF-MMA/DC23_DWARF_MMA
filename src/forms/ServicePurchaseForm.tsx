import { useState } from "react";
import { useClient, useSaveData, useServices } from "../services/FirebaseService";
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
  ContractInterface,
  PaymentType,
  ServiceInterfaceIn,
  ClientInterface,
  ServiceInterface,
} from "../models/models";
import axios from "axios";
import { API_SEND_EMAIL_URL, API_UPLOAD_FILE_URL, MULTIPART_FORM_DATA_HEADER, JSON_DATA_HEADER } from "../models/constants";
import { InvoiceInterface, generatePDFInvoiceFile } from "../services/InvoiceService";
import useEmailSender from "./SendEmail";
import { Timestamp } from "firebase/firestore";
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
  const { client, fetchClient } = useClient();
  const { sendEmail } = useEmailSender();
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
  const handlePurchase = async () => {
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
    let emailTextString : string;

    emailTextString = "Zakupiono ";
    selectedCards.map((service, index) => {
      if(service.type === "Subscription"){
        emailTextString += "regularną subskrypcję na " + contractInformation.subscriptionLength + " ";
        if(contractInformation.subscriptionLength > 1){
          emailTextString += "miesięcy";
        }
        else{
          emailTextString += "miesiąc";
        }
      }
      else{
        emailTextString += "transmisję jednorazową"
      }
      if(index != selectedCards.length - 1){
        emailTextString += " i";
      }
      emailTextString += " ";
    }
    )
    emailTextString += "za " + totalSelectedPrice.toString() + "zł. Dziękujemy za korzystanie z naszych usług. W załączniku znajduje się faktura w postaci pliku .pdf.";
    console.log(emailTextString);

    var farmazonskieSerwisy: ServiceInterface[] = selectedCards.map((service) => {
      return {
        name: service.name,
        type: service.type,
        price: service.price
      } as ServiceInterface;
    });


    var farmazon_data = {...data, 
      id: generateFarmazonId(20), 
      endDate: Timestamp.fromDate(data.endDate),
      startDate: Timestamp.fromDate(data.startDate)} as ContractInterface;

    let invoice : InvoiceInterface = {
      id: generateFarmazonId(20),
      client: {
        firstName: "Marek",
        lastName: "Brandt",
        email: props.email
      } as ClientInterface,
      contract: farmazon_data,
      services: farmazonskieSerwisy,
      total: 10.0
    };

    if (await fetchClient(props.email) && client != null) {
      invoice.client = client;
    } else {
      console.log("Client not found | Using default client data");
    }
    

    let pdfFile: Blob;
    try {
      pdfFile = await generatePDFInvoiceFile(invoice, "faktura");
    } catch (error) {
      console.error(error);
      return;
    }

    sendEmail(props.email, emailTextString, pdfFile);
    uploadFileToDrive(data);
  };

  function generateFarmazonId(length: number): string {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }

  const uploadFileToDrive = (data: ContractInterfaceIn) => {
    const request_json = {
      "email": data.email,
      "endDate": data.endDate,
      "paymentMethod": data.paymentMethod,
      "services": data.services,
      "startDate": data.startDate,
      "status": data.status
    };
    axios.post(API_UPLOAD_FILE_URL, request_json, JSON_DATA_HEADER).catch((error) => {
      alert("Plik nie został wysłany.");
    });
  }

  return (
    <div style={{ textAlign: "center" }}>
      {!isCompleted ? (
        <>
          <Typography variant="h5">
            Całkowity koszt: {totalSelectedPrice} zł
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
          </Grid>
          <FormControl component="fieldset">
            <Typography variant="h6">Długość subskrypcji</Typography>
            <RadioGroup
              aria-label="Subscription Length"
              name="subscriptionLength"
              value={contractInformation.subscriptionLength}
              onChange={handleInputChange}
              row
            >
              <FormControlLabel value={1} control={<Radio />} label="1 miesiąc" />
              <FormControlLabel
                value={12}
                control={<Radio />}
                label="12 miesięcy"
              />
            </RadioGroup>
            <Typography variant="h6">Metoda płatności</Typography>
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
              KUP TERAZ
            </Button>
          </FormControl>
        </>
      ) : (
        <Typography variant="h5">Transakcja powiodła się!</Typography>
      )}
    </div>
  );
};
