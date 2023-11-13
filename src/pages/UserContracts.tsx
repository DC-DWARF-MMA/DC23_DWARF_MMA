import Button from "@mui/material/Button/Button";
import { useUserContracts } from "../services/FirebaseService";
import { Contract } from "./Contract";
import { AdminView } from "./AdminView";

interface UserContractsInterface {
  userMail: string;
}

export const UserContracts = ({ userMail }: UserContractsInterface) => {
  const contracts = useUserContracts();

  if (contracts?.length !== 0) {
    return (
      <div>
        <h2>Email: {userMail} </h2>

        {userMail === "admin@admin.com" && <AdminView contracts={contracts} />}
        {contracts?.map((contract) => (
          <div>
            <Contract contract={contract} key={contract.id} />
          </div>
        ))}
      </div>
    );
  } else {
    return <div>No contracts available!</div>;
  }
};
