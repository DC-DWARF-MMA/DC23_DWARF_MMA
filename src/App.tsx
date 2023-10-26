import "./App.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import Button from "@mui/material/Button";
import { useState } from "react";
import InvoiceService from "./services/InvoiceService";
import { UserContracts } from "./pages/UserContracts";

const App = () => {
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);

  const saveToDb = async () => {
    try {
      const docRef = await addDoc(collection(db, "testTable"), {
        first: "Dada",
        last: "Lacelove",
        born: Math.floor(Math.random() * 123) + 1900,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const generateInvoice = async () => {
    setLoading(true);
    InvoiceService.generateInvoice("JmkmSHO5vsi1jHm8oHwt")
      .then((data) => {
        setInvoice(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Dwarf-mma</h1>
      <UserContracts userMail="miroslaw@gmail.com" />
      <section>
        <Button variant="contained" onClick={saveToDb}>
          Click here to save to db
        </Button>
        <br />
        <br />
        <Button variant="contained" onClick={generateInvoice}>
          Click here to generate invoice for ""
        </Button>
      </section>

      <section>
        <h2>Contracts</h2>
        {loading && <div>Loading...</div>}
        {JSON.stringify(invoice)}
      </section>
    </div>
  );
};

export default App;
