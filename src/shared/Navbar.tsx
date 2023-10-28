import { memo } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function NavbarMemo() {
  return (
    <div>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar>
          <Typography variant="h6">DWARF MMA</Typography>
          <Button component={Link} to="/" color="inherit">
            Main Page
          </Button>
          <Button component={Link} to="/Services" color="inherit">
            Services
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export const Navbar = memo(NavbarMemo);
