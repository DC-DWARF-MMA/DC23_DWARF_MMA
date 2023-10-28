import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import { Services } from "./pages/Services";
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
