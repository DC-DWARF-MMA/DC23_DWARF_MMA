import { useUser } from "../forms/formsContext/UserContext";
import { Navbar } from "../shared/Navbar";
import { UserContracts } from "./UserContracts";
import { UserEmailInputForm } from "../forms/UserEmailInputForm";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { JSON_DATA_HEADER } from "../models/constants";
import { useProcess } from "../forms/formsContext/ProcessContext";
import background from "../images/background-wide.png";
export const backgroundStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  minHeight: "100vh",
};
export const Home = () => {
  const mail = useUser();
  const { processId, setProcessId } = useProcess();

  const startProcess = async () => {
    const data = await axios
      .post(
        "http://localhost:8080/engine-rest/process-definition/key/Process_190revr/start",
        {},
        JSON_DATA_HEADER
      )
      .catch(() => alert("Could not find deployed process definition"));
    if (!!data) {
      const result = await data.data.id;
      setProcessId(result);
      console.log(result);
    }
  };

  useEffect(() => {
    //this will make new process instance with every refresh...
    startProcess();
  }, []);

  return (
    <div className="App" style={backgroundStyle}>
      <Navbar />
      <h1>DWARF MMA</h1>
      {mail.email ? (
        <UserContracts userMail={mail.email ?? "cannot happen"} />
      ) : (
        <UserEmailInputForm />
      )}
    </div>
  );
};
