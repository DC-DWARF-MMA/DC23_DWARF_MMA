import { memo } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useUser } from "../forms/formsContext/UserContext";
import background from "../images/background.png";
import dwarf_mma_logo from "../images/dwarf_mma_logo.png";

function NavbarMemo() {
  const { email, setEmail } = useUser();

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#BE3144" }}>
        <Toolbar>
          <img src={dwarf_mma_logo} alt="Logo" style={{ height: 100, padding: 5 }}/>
          <Button component={Link} to="/" color="inherit" style={{marginLeft: 20}}>
            Strona klienta
          </Button>
          <Button component={Link} to="/Services" color="inherit" style={{marginLeft: 20}}>
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
