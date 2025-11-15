import { Button, Card, Grid } from "@mui/material";
import { useState } from "react";
import { useCountStats } from "../hooks/use-count-stats";
import { CustomDatePicker } from "./custom-date-picker";
import { NumericTextField } from "./numeric-text-field";
import { validateDateRange } from "../utils/date";

export function CountStats() {
  const [num, setNum] = useState("1");
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);

  const number = num ? Number(num) : undefined;
  const fromParam = from ?? undefined;
  const toParam = to ?? undefined;

  const { data, isLoading, refetch } = useCountStats(
    number,
    fromParam,
    toParam
  );

  const handleSubmit = () => {
    if (!number || (!from && !to)) return;
    validateDateRange(from, to);
    refetch();
  };

  const handleReset = () => {
    setNum("");
    setTo(null);
    setFrom(null);
  };
  return (
    <Card sx={{ p: 2, mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid>
          <NumericTextField
            label="Number"
            value={num}
            onChange={setNum}
            min={1}
            max={50}
          />
        </Grid>
        <Grid>
          <CustomDatePicker label="From" value={from} onChange={setFrom} />
        </Grid>
        <Grid>
          <CustomDatePicker label="To" value={to} onChange={setTo} />
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!num || (!from && !to)}
          >
            SEARCH
          </Button>
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={handleReset}>
            RESET
          </Button>
        </Grid>
      </Grid>
      {!isLoading && data != null && (
        <Card sx={{ mt: 4, p: 2 }}>Occurrences: {data.count}</Card>
      )}
    </Card>
  );
}
