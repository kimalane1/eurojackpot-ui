import { Card, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawsTable } from "../components/draws-table";
import { PageContainer } from "../components/layout/page-container";
import { SearchFilters } from "../components/search-filter";
import { emitError } from "../event-bus";
import { useDrawsQuery } from "../hooks/use-draws";
import { validateDateRange } from "../utils/date";

export default function DrawsPage() {
  const [params, setParams] = useSearchParams();
  const from = params.get("from");
  const to = params.get("to");
  const [localFrom, setLocalFrom] = useState<string | null>(from);
  const [localTo, setLocalTo] = useState<string | null>(to);

  const { data, isLoading } = useDrawsQuery(from ?? undefined, to ?? undefined);

  const handleReset = () => {
    setLocalFrom(null);
    setLocalTo(null);
    setParams({});
  };

  const handleSubmit = () => {
    const newParams: Record<string, string> = {};

    if (localFrom) newParams.from = localFrom;
    if (localTo) newParams.to = localTo;

    validateDateRange(localFrom, localTo);

    setParams(newParams);
  };
  return (
    <PageContainer>
      <Card sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">EUROJACKPOT DRAWS</Typography>
      </Card>

      <SearchFilters
        from={localFrom}
        to={localTo}
        setFrom={setLocalFrom}
        setTo={setLocalTo}
        onSubmit={handleSubmit}
        onReset={handleReset}
        loading={isLoading}
      />

      {!isLoading && data && data.length > 0 && (
        <DrawsTable data={data} loading={isLoading} />
      )}

      {!isLoading && !data && (
        <Card sx={{ p: 3, textAlign: "center", mt: 2 }}>
          <Typography variant="body1" color="text.secondary">
            No results found for selected date range.
          </Typography>
        </Card>
      )}
    </PageContainer>
  );
}
