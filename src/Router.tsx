import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Edit } from "./pages/Edit";
import { Services } from "./pages/Services";
import { Home } from "./pages/Home";
import { useUser } from "./forms/formsContext/UserContext";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
