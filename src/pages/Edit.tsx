import Button from "@mui/material/Button";
import { Link, useSearchParams } from "react-router-dom";
import { useUser } from "../forms/formsContext/UserContext";
import { useUserContracts } from "../services/FirebaseService";
import { Navbar } from "../shared/Navbar";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { UserContracts } from "./UserContracts";
import { useContract } from "../services/FirebaseService";
import ContractEditForm from "../forms/ContractEditForm";

const centerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    minHeight: "100vh",
  };

export const Edit = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");
  if (id == null) throw new Error("Contract not found");
  
  const contract = useContract(id);
  const { email } = useUser();

  let editForm;
  if(contract != undefined) {
    editForm = <ContractEditForm contract={contract!} />;
  } else {
    editForm = <p>Loading...</p>
  }

  return (
    <>
      <Navbar />
      <div style={centerStyle}>
        <h1>Edit Contract</h1>
        <p>{id}</p>
        {editForm}
      </div>
    </>
  );
};
