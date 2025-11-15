import { Container } from "@mui/material";
import { NavigationBar } from "./navigation-bar";


export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        mb: 4,
        minHeight: "calc(100vh - 150px)",
      }}
    >
      <NavigationBar />
      {children}
    </Container>
  );
}
