import { Card, Grid, Button } from "@mui/material";
import { CustomDatePicker } from "./custom-date-picker";

interface Props {
  from: string | null;
  to: string | null;
  setFrom: (v: string | null) => void;
  setTo: (v: string | null) => void;
  onSubmit: () => void;
  onReset: () => void;
  loading: boolean;
}

export function SearchFilters({
  from,
  to,
  setFrom,
  setTo,
  onSubmit,
  onReset,
  loading,
}: Props) {
  return (
    <Card sx={{ p: 2, mb: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <CustomDatePicker label="From" value={from} onChange={setFrom} />
        </Grid>

        <Grid>
          <CustomDatePicker label="To" value={to} onChange={setTo} />
        </Grid>

        <Grid>
          <Button variant="contained" onClick={onSubmit} loading={loading}>
            SEARCH
          </Button>
        </Grid>

        <Grid>
          <Button variant="outlined" onClick={onReset} loading={loading}>
            RESET
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
