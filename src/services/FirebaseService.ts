import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import {
  ClientInterface,
  ContractInterface,
  ServiceInterface,
} from "../models/models";
import { useEffect, useState } from "react";

export const useContracts = () => {
  const [contracts, setContracts] = useState<ContractInterface[]>();

  useEffect(() => {
    (async () => {
      const contractsCollection = collection(db, "contracts");
      const snapshot = await getDocs(contractsCollection);
      const userContract = snapshot.docs.map((doc) => {
        const contract = doc.data() as ContractInterface;
        contract.id = doc.id;
        return contract;
      });
      setContracts(userContract);
    })();
  }, [setContracts]);

  return contracts;
};

export const useUserContracts = (userMail: string) => {
  const [userContracts, setUserContracts] = useState<ContractInterface[]>();
  const allContracts = useContracts();

  useEffect(() => {
    setUserContracts(allContracts?.filter((data) => data.email === userMail));
  }, [userMail, allContracts, setUserContracts]);

  return userContracts;
};

export const useContract = (id: string) => {
  const [contract, setContract] = useState<ContractInterface>();

  useEffect(() => {
    (async () => {
      const contractDoc = doc(db, "contracts", id);
      const snapshot = await getDoc(contractDoc);
      if (!snapshot.exists()) {
        throw new Error("Contract not found");
      }
      setContract({ ...(snapshot.data() as ContractInterface), id: id });
    })();
  }, [setContract]);

  return contract;
};

export const useClient = (email: string) => {
  const [client, setClient] = useState<ClientInterface>();
  useEffect(() => {
    (async () => {
      const clientDoc = doc(db, "clients", email);
      const snapshot = await getDoc(clientDoc);
      if (!snapshot.exists()) {
        throw new Error("Client not found");
      }
      setClient({ ...(snapshot.data() as ClientInterface), id: snapshot.id });
    })();
  }, [setClient]);

  return client;
};

export const useServices = () => {
  const [services, setServices] = useState<ServiceInterface[]>();
  useEffect(() => {
    (async () => {
      const servicesCollection = collection(db, "services");
      const snapshot = await getDocs(servicesCollection);
      const allServices = snapshot.docs.map((doc) => {
        const service = doc.data() as ServiceInterface;
        service.id = doc.id;
        return service;
      });
      setServices(allServices);
    })();
  }, [setServices]);

  return services;
};
