export interface ContractInterface {
  id: string;
  email: string;
  endDate: Date;
  paymentFreq: PaymentFreq;
  paymentMethod: string;
  services: string[];
  startDate: Date;
  status: string;
}

enum PaymentFreq {
  single = 0,
  monthly = 1,
  quarterly = 2,
  yearly = 3,
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
