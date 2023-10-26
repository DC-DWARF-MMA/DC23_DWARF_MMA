interface Contract {
    id: string;
    email: string;
    endDate: string;
    paymentFreq: number;
    paymentMethod: boolean;
    services: string[];
    startDate: string;
    status: Date;
}

export default Contract;