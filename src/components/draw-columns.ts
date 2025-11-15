import type { GridColDef } from "@mui/x-data-grid";
import { formatDate } from "../utils/date";

export const getDrawColumns = (): GridColDef[] => [
  { field: "drawNumber", headerName: "Draw #" },
  {
    field: "date",
    headerName: "Date",
    width: 150,
    valueFormatter: (params) => formatDate(params),
  },
  { field: "number1", headerName: "# 1" },
  { field: "number2", headerName: "# 2" },
  { field: "number3", headerName: "# 3" },
  { field: "number4", headerName: "# 4" },
  { field: "number5", headerName: "# 5" },
  { field: "number6", headerName: "# 6" },
  { field: "number7", headerName: "# 7" },
];
