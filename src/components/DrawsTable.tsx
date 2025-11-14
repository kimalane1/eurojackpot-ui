import { Card } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import type { Draw } from "../common/Draw";

interface DrawsTableProps {
  data: Draw[];
  loading: boolean;
}

export function DrawsTable({ data, loading }: DrawsTableProps) {
  if (loading) return <div>Loading...</div>;


  const rows = data.map((d) => ({
    id: d.number,         
    drawNumber: d.number,
    date: new Date(d.date),
    number1: d.numbers[0],
    number2: d.numbers[1],
    number3: d.numbers[2],
    number4: d.numbers[3],
    number5: d.numbers[4],
    number6: d.stars[0],
    number7: d.stars[1],
  }));

  const columns: GridColDef[] = [
    { field: "drawNumber", headerName: "Draw #", width: 100 },
    {
      field: "date",
      headerName: "Date",
      width: 160,
    },
    { field: "number1", headerName: "1", width: 70 },
    { field: "number2", headerName: "2", width: 70 },
    { field: "number3", headerName: "3", width: 70 },
    { field: "number4", headerName: "4", width: 70 },
    { field: "number5", headerName: "5", width: 70 },
    { field: "number6", headerName: "7", width: 70 },
    { field: "number7", headerName: "8", width: 70 },
  ];

  return (
    <Card sx={{ height: 600, padding: 2 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        disableRowSelectionOnClick
      />
    </Card>
  );
}
