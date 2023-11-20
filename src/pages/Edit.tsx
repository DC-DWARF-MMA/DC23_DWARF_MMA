import Button from "@mui/material/Button";
import { Link, useSearchParams } from "react-router-dom";
import { useUser } from "../forms/formsContext/UserContext";
import { useUserContracts } from "../services/FirebaseService";
import { Navbar } from "../shared/Navbar";
import { InvoiceGenerator } from "./InvoiceGenerator";
import { UserContracts } from "./UserContracts";
import { useContract } from "../services/FirebaseService";
import ContractEditForm from "../forms/ContractEditForm";
import { backgroundStyle } from "./Home";
import "../App.css";
const centerStyle = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  minHeight: "100vh",
  padding: "10px",
};

export const Edit = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  let id = searchParams.get("id");
  if (id == null) throw new Error("Contract not found");

  const contract = useContract(id);

  return (
    <>
      <Navbar />
      <div className="App" style={backgroundStyle}>
        {contract !== undefined ? (
          <ContractEditForm contract={contract} />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
