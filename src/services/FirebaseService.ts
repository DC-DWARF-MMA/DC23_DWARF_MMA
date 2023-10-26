import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Client, ContractInterface, Service } from "../models/models";
import { useEffect, useState } from "react";

export const useContracts = () => {
  const [contracts, setContracts] = useState<ContractInterface[]>();

  useEffect(() => {
    (async () => {
      const contractsCollection = collection(db, "contracts");
      const snapshot = await getDocs(contractsCollection);
      const userContract = snapshot.docs.map(
        (doc) => doc.data() as ContractInterface
      );
      setContracts(userContract);
    })();
  }, []);

  return contracts;
};

export const useUserContracts = (userMail: string) => {
  const [userContracts, setUserContracts] = useState<ContractInterface[]>();
  const allContracts = useContracts();

  useEffect(() => {
    setUserContracts(allContracts?.filter((data) => data.email == userMail));
  }, [userMail, allContracts]);

  return userContracts;
};

class FirebaseService {
  static async getAllContracts(): Promise<ContractInterface[]> {
    const docSnap = await getDocs(collection(db, "contract"));
    const contracts = [] as ContractInterface[];
    docSnap.forEach((doc) => {
      const contract = doc.data() as ContractInterface;
      contract.id = doc.id;
      contracts.push(contract);
    });
    return contracts;
  }

  static async getContract(id: string): Promise<ContractInterface> {
    const docSnap = await getDoc(doc(db, "contracts", id));
    if (docSnap.exists()) {
      const contract = docSnap.data() as ContractInterface;
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
      services.push(service);
    });
    return services;
  }
}

export default FirebaseService;
