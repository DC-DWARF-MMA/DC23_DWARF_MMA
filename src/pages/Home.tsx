import { useUser } from "../forms/formsContext/UserContext";
import { useUserContracts } from "../services/FirebaseService";
import { Navbar } from "../shared/Navbar";
import { Invoice } from "./Invoice";
import { UserContracts } from "./UserContracts";

export const Home = () => {
  const mail = useUser();

  return (
    <div className="App">
      <Navbar />
      <h1>DWARF MMA</h1>
      <UserContracts userMail={mail.email ?? "cannot happen"} />
    </div>
  );
};
