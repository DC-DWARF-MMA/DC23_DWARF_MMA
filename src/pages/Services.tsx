import { Navbar } from "../shared/Navbar";
import { Typography } from "@mui/material";
import { ServicePurchaseForm } from "../forms/ServicePurchaseForm";
import { UserEmailInputForm } from "../forms/UserEmailInputForm";
import { useUser } from "../forms/formsContext/UserContext";
import background from "../images/background-wide.png";
export const centerStyle = {
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
};

export const Services = () => {
  const { email } = useUser();

  return (
    <>
      <Navbar />
      <div style={centerStyle}>
        {!email && <UserEmailInputForm />}
        {email && (
          <>
            <Typography variant="h5">User: {email}</Typography>
            <ServicePurchaseForm email={email} />
          </>
        )}
      </div>
    </>
  );
};
