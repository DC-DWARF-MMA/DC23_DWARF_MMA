export interface Contract {
    id: string;
    email: string;
    endDate: string;
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
    yearly = 3
}

export interface Client {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    sex: boolean;
    phone: string;
}

export interface Service {
    id: string;
    name: string;
    type: string;
    price: number;    
}