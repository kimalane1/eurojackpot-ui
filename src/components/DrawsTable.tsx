import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Draw } from "../common/Draw";

interface DrawsTableProps {
  data: Draw[];
  loading: boolean;
}

export function DrawsTable({ data, loading }: DrawsTableProps) {
  if (loading) return <div>Loading...</div>;

  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Draw #</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Numbers</TableCell>
            <TableCell>Stars</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row: Draw) => (
            <TableRow key={row.number}>
              <TableCell>{row.number}</TableCell>

              <TableCell>
                {new Date(row.date).toLocaleString("et-EE")}
              </TableCell>

              <TableCell>{row.numbers.join(", ")}</TableCell>
              <TableCell>{row.stars.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
