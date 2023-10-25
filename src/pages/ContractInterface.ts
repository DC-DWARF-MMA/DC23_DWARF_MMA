export interface Contract {
    email: string;
    endDate: string;
    startDate: string;
    paymentFreq: string;
    paymentMethod: string;
    services: Service[];
    status: string;
}

interface Service {
    name: string;
}