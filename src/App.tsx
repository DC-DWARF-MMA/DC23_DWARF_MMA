import "./App.css";
import { Navbar } from "./shared/Navbar";
import { UserEmailInputForm } from "./forms/UserEmailInputForm";

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
