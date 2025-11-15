import { Card, CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { Draw } from "../common/Draw";
import { useDrawRows } from "../hooks/use-draw-rows";
import { getDrawColumns } from "./draw-columns";

interface DrawsTableProps {
  data: Draw[];
  loading: boolean;
}

export function DrawsTable({ data, loading }: DrawsTableProps) {
  if (loading) return <CircularProgress />;
  const rows = useDrawRows(data);

  return (
    <Card sx={{ height: "fit-content", padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={getDrawColumns()}
        disableRowSelectionOnClick
        disableColumnMenu
      />
    </Card>
  );
}
