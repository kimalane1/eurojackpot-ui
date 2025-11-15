import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { CountStats } from "../components/count-stats";
import { PageContainer } from "../components/layout/page-container";
export default function StatsPage() {
  return (
    <PageContainer>
       <Card sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">STATISTICS</Typography>
      </Card>
      <CountStats />
    </PageContainer>
  );
}
