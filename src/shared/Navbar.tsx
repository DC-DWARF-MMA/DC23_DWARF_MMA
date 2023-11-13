import { memo } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../forms/formsContext/UserContext";
import background from "../images/background.png";
function NavbarMemo() {
  const { email, setEmail } = useUser();

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "red" }}>
        <Toolbar>
          <Typography variant="h6">DWARF MMA</Typography>
          <Button component={Link} to="/" color="inherit">
            Strona klienta
          </Button>
          <Button component={Link} to="/Services" color="inherit">
            Zakup usług
          </Button>
          {email && (
            <>
              <Typography
                variant="h6"
                style={{ marginLeft: "auto", marginRight: "5px" }}
              >
                Użytkownik: {email}
              </Typography>
              <Button onClick={() => setEmail(null)} color="inherit">
                <LogoutIcon />
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const Navbar = memo(NavbarMemo);
