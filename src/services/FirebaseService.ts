import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  ClientInterface,
  ContractInterface,
  ServiceInterface,
} from "../models/models";
import { useEffect, useState, useCallback } from "react";

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
  }, [setContract, id]);

  return contract;
};

export const useClient = () => {
  const [client, setClient] = useState<ClientInterface>();
  const [error, setError] = useState<boolean>(false);
  const fetchClient = useCallback(
    async (email: string) => {
      const clientDoc = doc(db, "clients", email);
      const snapshot = await getDoc(clientDoc);
      if (snapshot.exists()) {
        setClient({ ...(snapshot.data() as ClientInterface), id: snapshot.id });
        return true;
      } else {
        setError(true);
        return false;
      }
    },
    [setClient, setError]
  );

  return { client, error, fetchClient };
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
export const useSaveData = (collectionName: string) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [error, setError] = useState<string>("");

  const saveData = useCallback(
    async (data: any, primaryKey?: string) => {
      setIsCompleted(false);
      try {
        // const customDocRef = doc(db, "yourCollectionName", documentId);
        if (primaryKey) {
          const customDocRef = doc(db, collectionName, primaryKey);
          await setDoc(customDocRef, data);
        } else {
          await addDoc(collection(db, collectionName), data);
        }
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError(String(error));
      }
      setIsCompleted(true);
    },
    [collectionName]
  );

  return { saveData, isCompleted, error };
};
