type ServiceType = {
  ServiceName: string;
  Amount: number;
};
export interface ContractInterface {
  id: string;
  email: string;
  endDate: Date;
  paymentMethod: string;
  services: ServiceType[];
  startDate: Date;
  status: string;
}

export interface ContractInterfaceIn {
  email: string;
  endDate: Date;
  paymentMethod: string;
  services: ServiceType[];
  startDate: Date;
  status: string;
}

enum PaymentFreq {
  single = 0,
  monthly = 1,
  quarterly = 2,
  yearly = 3,
}
export enum PaymentType {
  CREDIT_CARD = "Credit Card",
  PAYPAL = "PayPal",
  GOOGLE_PAY = "Google Pay",
  BLIK = "Blik",
}

export interface ClientInterface {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
}
export interface ClientInterfaceIn {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: string;
  phoneNumber: string;
}

export interface ServiceInterface {
  id: string;
  name: string;
  type: string;
  price: number;
}
export interface ServiceInterfaceIn {
  name: string;
  type: string;
  price: number;
}
