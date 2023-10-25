import "./App.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import Button from "@mui/material/Button";

const App = () => {
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

  return (
    <div className="App">
      <h1>Dwarf-mma</h1>
      <section>
        <Button variant="contained" onClick={saveToDb}>
          Click here to save to db
        </Button>
      </section>
    </div>
  );
};

export default App;
