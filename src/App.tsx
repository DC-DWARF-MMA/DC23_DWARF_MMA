import "./App.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import Button from "@mui/material/Button";
import { useState } from "react";
import { UserContracts } from "./pages/UserContracts";
import { Invoice } from "./pages/Invoice";
import { Navbar } from "./shared/Navbar";
import { useUser } from "./forms/formsContext/UserContext";
import { UserEmailInputForm } from "./forms/UserEmailInputForm";
import { useUserContracts } from "./services/FirebaseService";
import { ContractInterface } from "./models/models";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <h1>DWARF MMA</h1>
      <UserEmailInputForm />
    </div>
  );
};

export default App;
