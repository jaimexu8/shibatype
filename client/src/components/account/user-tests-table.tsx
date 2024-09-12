import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../app/hooks";

function createData(
  index: number,
  wpm: number,
  accuracy: number,
  date: string
) {
  return { index, wpm, accuracy, date };
}

const rows = [
  createData(0, 159.4, 100, "8/22/2024"),
  createData(1, 104.7, 97.46, "8/19/2024"),
  createData(2, 49.1, 74.23, "5/10/2012"),
  createData(3, 87.8, 58.36, "1/26/1973"),
];

export default function UserTestsTable() {
  const { theme } = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{ background: theme.backgroundColor }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: theme.primaryDark }}>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              wpm
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              accuracy
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.index}
              sx={{
                backgroundColor:
                  row.index % 2 === 0
                    ? theme.backgroundColor
                    : theme.primaryDark,
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {row.wpm}
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {row.accuracy}%
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
