import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import Contract from "../models/contract";
import { Client, Service } from "../models/models";

class FirebaseService {
    
    static async getAllContracts(): Promise<Contract[]> {
        const docSnap = await getDocs(collection(db, "contract"));
        const contracts = [] as Contract[];
        docSnap.forEach((doc) => {
            const contract = doc.data() as Contract;
            contract.id = doc.id;
            contracts.push(contract)
        });
        return contracts;
    }

    static async getContract(id: string): Promise<Contract> {
        const docSnap = await getDoc(doc(db, "contracts", id));
        if (docSnap.exists()) {
            const contract = docSnap.data() as Contract;
            contract.id = docSnap.id;
            return contract;
        }
        throw new Error("Contract not found");
    }

    static async getClient(email: string): Promise<Client> {
        console.log(email);
        const docSnap = await getDoc(doc(db, "clients", email));
        if (docSnap.exists()) {
            const client = docSnap.data() as Client;
            client.id = docSnap.id;
            return client;
        }
        throw new Error("Client not found");
    }

    static async getServices(): Promise<Service[]> {
        const docSnap = await getDocs(collection(db, "services"));
        const services = [] as Service[];
        docSnap.forEach((doc) => {
            const service = doc.data() as Service;
            service.id = doc.id;
            services.push(service)
        });
        return services;
    }
}

export default FirebaseService;

