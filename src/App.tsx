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
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);

  const {email} = useUser();
  const userContracts = useUserContracts("uwu@gmail.com");

  return (
    <div className="App">
      <Navbar />
      <h1>DWARF MMA</h1>
      {!email && <UserEmailInputForm/>}
      {email && (
        <>
          <UserContracts userMail={email} />
          <section>
          <br />
          {userContracts.length && <Invoice {contract={userContracts.at(0)??{id="dupa", email="uwu@gmail.com", startDate="2013-08-13", endDate="2013-08-13", paymentMethod="dupa", status="dupa", services=[]}}}/>}
        </section>
        </>
      )}
    </div>
  );
};

export default App;
