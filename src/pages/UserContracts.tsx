import CircularProgress from "@mui/material/CircularProgress";
import { useUserContracts } from "../services/FirebaseService";
import { Contract } from "./Contract";

export const UserContracts = ({ userMail }: { userMail: string }) => {
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
