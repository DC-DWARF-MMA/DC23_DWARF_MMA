import { useUserContracts } from "../services/FirebaseService";
import { Contract } from "./Contract";

interface UserContractsInterface {
  userMail: string;
}

export const UserContracts = ({ userMail }: UserContractsInterface) => {
  const contracts = useUserContracts();

  if (contracts?.length != 0) {
    return (
      <div>
        <h2>Email: {userMail} </h2>
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
