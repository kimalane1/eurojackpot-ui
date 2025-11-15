import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export function NavigationBar() {
  const location = useLocation();

  const isDraws = location.pathname === "/";
  const isStats = location.pathname === "/statistics";

  return (
    <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
      <Button
        variant={isDraws ? "contained" : "outlined"}
        component={Link}
        to="/"
      >
        Draws
      </Button>

      <Button
        variant={isStats ? "contained" : "outlined"}
        component={Link}
        to="/statistics"
      >
        Statistics
      </Button>
    </Box>
  );
}
