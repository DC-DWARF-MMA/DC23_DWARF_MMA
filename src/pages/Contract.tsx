import CircularProgress from "@mui/material/CircularProgress";
import { useUserContracts } from "../services/FirebaseService";
import { ContractInterface } from "../models/models";

export const Contract = ({ contract }: { contract: ContractInterface }) => {
  return (
    <div>
      <h2>Email: {contract.email}</h2>
      <h2>Services: {contract.services.toString()}</h2>
      <h2>Start date: {contract.startDate.toString()}</h2>
      <h2>
        End date:
        {contract.endDate.toString()}
      </h2>
      <h2>Payment method: {contract.paymentMethod}</h2>
      <h2>Payment frequency: {contract.paymentFreq}</h2>
      <h2>Status: {contract.status}</h2>
    </div>
  );
};
