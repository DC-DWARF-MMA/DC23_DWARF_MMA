import CircularProgress from "@mui/material/CircularProgress";
import { useUserContracts } from "../services/FirebaseService";
import { Contract } from "./Contract";

interface UserContractsInterface {
  userMail: string;
}

export const UserContracts = ({ userMail }: UserContractsInterface) => {
  const contracts = useUserContracts(userMail);

  return contracts ? (
    <div>
      {contracts.map((contract) => (
        <Contract contract={contract} />
      ))}
    </div>
  ) : (
    <CircularProgress />
  );
};
