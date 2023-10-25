import { useUserContract } from "../hooks/useUserContract";
import CircularProgress from "@mui/material/CircularProgress";

export const UserContracts = ({ userMail }: { userMail: string }) => {
  const contract = useUserContract(userMail);

  return contract ? (
    <div>
      <h2>Email: {contract.email}</h2>
      <h2>Services: {contract.services.toString()}</h2>
      <h2>Start date: {contract.startDate.toString()}</h2>
      <h2>
        End date:
        {contract.endDate.length ? contract.endDate : "Still active"}
      </h2>
      <h2>Payment method: {contract.paymentMethod}</h2>
      <h2>Payment frequency: {contract.paymentFreq}</h2>
    </div>
  ) : (
    <CircularProgress />
  );
};
