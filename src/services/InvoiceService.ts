import { useCallback, useEffect, useState } from "react";
import { useClient, useContract, useServices } from "./FirebaseService";
import {
  ClientInterface,
  ContractInterface,
  ServiceInterface,
} from "../models/models";

export const useInvoice = (contractId: string, email: string) => {
  const contract = useContract(contractId);
  const { client, fetchClient } = useClient();
  const services = useServices();

  const [invoice, setInvoice] = useState<InvoiceInterface>();

  const fetchInvoice = useCallback(async () => {
    await fetchClient(email);
    if (contract && client && services) {
      const total = services
        ?.filter((service) => contract?.services.includes(service.name))
        .reduce((acc, service) => acc + service.price, 0);
      setInvoice({ id: contractId, client, contract, services, total });
    }
  }, [contract, client, services, setInvoice, fetchClient]);

  return { invoice, fetchInvoice };
};

interface InvoiceInterface {
  id: string;
  client: ClientInterface;
  contract: ContractInterface;
  services: ServiceInterface[];
  total: number;
}
