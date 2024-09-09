import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../app/hooks";
import { useEffect, useState } from "react";
import api from "../../services/api";

interface TestData {
  displayName: string;
  wpm: number;
  accuracy: number;
  testDate: string;
}

const fetchLeaderboard = async (sortOrder: 1 | -1, count: number) => {
  try {
    const params = new URLSearchParams({
      sortOrder: sortOrder.toString(),
      count: count.toString(),
    });

    const res = await api.get("/api/test/leaderboard/", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};

export default function LeaderboardTable() {
  const { theme } = useTheme();
  const [tests, setTests] = useState<TestData[]>([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const data = await fetchLeaderboard(1, 100);
      setTests(data);
    };

    loadLeaderboard();
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ background: theme.backgroundColor }}
    >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ background: theme.primaryDark }}>
            <TableCell sx={{ color: theme.secondaryColor, border: "none" }}>
              #
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              User
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              WPM
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              Accuracy
            </TableCell>
            <TableCell sx={{ color: theme.textColor, border: "none" }}>
              Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tests.map((test, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? theme.backgroundColor : theme.primaryDark,
                "&:last-child td, &:last-child th": { border: 0 },
              }}
            >
              <TableCell sx={{ color: theme.secondaryColor, border: "none" }}>
                {index + 1}
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {test.displayName}
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {test.wpm}
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {test.accuracy + "%"}
              </TableCell>
              <TableCell sx={{ color: theme.textColor, border: "none" }}>
                {test.testDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
