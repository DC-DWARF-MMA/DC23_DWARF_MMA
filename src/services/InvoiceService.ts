import { useCallback, useEffect, useState } from "react";
import { useClient, useContract, useServices } from "./FirebaseService";
import {
  ClientInterface,
  ContractInterface,
  ServiceInterface,
} from "../models/models";

export const useInvoice = (contract: ContractInterface) => {
  const { client, fetchClient } = useClient();
  const services = useServices();

  const [invoice, setInvoice] = useState<InvoiceInterface>();

  useEffect(() => {
    if (contract && client && services) {
      const total = services
        ?.filter((service) =>
          contract?.services
            .map((service) => service.ServiceName)
            .includes(service.name)
        )
        .reduce((acc, service) => acc + service.price, 0);
      setInvoice({ id: contract.id, client, contract, services, total });
    }
  }, [contract, client, services]);

  const fetchInvoice = useCallback(async () => {
    await fetchClient(contract.email);
  }, [contract.email, fetchClient]);

  return { invoice, fetchInvoice };
};

interface InvoiceInterface {
  id: string;
  client: ClientInterface;
  contract: ContractInterface;
  services: ServiceInterface[];
  total: number;
}
