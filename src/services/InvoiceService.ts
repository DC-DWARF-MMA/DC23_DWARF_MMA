import FirebaseService from "./FirebaseService";

class InvoiceService {

    static async generateInvoice(contractId: string) {
        const contract = await FirebaseService.getContract(contractId);
        const client = await FirebaseService.getClient(contract.email);
        const services = await FirebaseService.getServices();

        services.filter((service) => {contract.services.includes(service.name)});

        const total = services.reduce((acc, service) => acc + service.price, 0);

        const invoice = {
            id: contractId,
            client: client,
            contract: contract,
            services: services,
            total: total
        };
        return invoice;
    }
}

export default InvoiceService;