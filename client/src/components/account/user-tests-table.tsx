import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../app/hooks";
import { useState, useMemo } from "react";
import Pagination from "../Pagination";

interface Test {
  wpm: number;
  accuracy: number;
  date: string;
  seconds: number;
  wordsTyped: number;
}

interface UserTestsTableProps {
  tests: Test[];
}

const ITEMS_PER_PAGE = 10;

export default function UserTestsTable({ tests }: UserTestsTableProps) {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(tests.length / ITEMS_PER_PAGE);

  const paginatedTests = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return tests.slice(startIndex, endIndex);
  }, [tests, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
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
            {paginatedTests.map((test, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor:
                    index % 2 === 0 ? theme.backgroundColor : theme.primaryDark,
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell sx={{ color: theme.textColor, border: "none" }}>
                  {test.wpm ? test.wpm.toFixed(1) : "0.0"}
                </TableCell>
                <TableCell sx={{ color: theme.textColor, border: "none" }}>
                  {test.accuracy ? test.accuracy.toFixed(1) + "%" : "0.0%"}
                </TableCell>
                <TableCell sx={{ color: theme.textColor, border: "none" }}>
                  {test.date || "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
