import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import App from "./App";
import { Services } from "./pages/Services";
import { Home } from "./pages/Home";
import { useUser } from "./forms/formsContext/UserContext";
import { Invoice } from "./pages/Invoice";
function AppRouter() {
  const user = useUser();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user.email ? <Navigate to="/home" /> : <App />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
