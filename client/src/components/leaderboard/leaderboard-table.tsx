import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useTheme } from "../../app/hooks";
import { useEffect, useState, useMemo } from "react";
import api from "../../services/api";
import Pagination from "../Pagination";
import Skeleton from "../Skeleton";
import { useDelayedSkeleton } from "../../hooks/useDelayedSkeleton";

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

    if (Array.isArray(res.data)) {
      return res.data;
    } else if (res.data && Array.isArray(res.data.tests)) {
      return res.data.tests;
    } else {
      console.error("Invalid leaderboard response format:", res.data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return null;
  }
};

const ITEMS_PER_PAGE = 10;

export default function LeaderboardTable() {
  const { theme } = useTheme();
  const [tests, setTests] = useState<TestData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const showSkeleton = useDelayedSkeleton(loading);

  useEffect(() => {
    const loadLeaderboard = async () => {
      setLoading(true);
      const data = await fetchLeaderboard(-1, 100);
      if (data !== null && Array.isArray(data)) {
        setTests(data);
        setLoading(false);
      } else {
        console.error("Leaderboard fetch failed");
      }
    };

    loadLeaderboard();
  }, []);

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
            {loading ? (
              showSkeleton ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    sx={{
                      backgroundColor:
                        index % 2 === 0 ? theme.backgroundColor : theme.primaryDark,
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell sx={{ border: "none", padding: "16px" }}>
                      <Skeleton width="20px" />
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "16px" }}>
                      <Skeleton width="120px" />
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "16px" }}>
                      <Skeleton width="50px" />
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "16px" }}>
                      <Skeleton width="60px" />
                    </TableCell>
                    <TableCell sx={{ border: "none", padding: "16px" }}>
                      <Skeleton width="100px" />
                    </TableCell>
                  </TableRow>
                ))
              ) : null
            ) : (
              paginatedTests.map((test, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor:
                      index % 2 === 0 ? theme.backgroundColor : theme.primaryDark,
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell sx={{ color: theme.secondaryColor, border: "none" }}>
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell sx={{ color: theme.textColor, border: "none" }}>
                    {test.displayName || "Anonymous"}
                  </TableCell>
                  <TableCell sx={{ color: theme.textColor, border: "none" }}>
                    {test.wpm ? test.wpm.toFixed(2) : "0.00"}
                  </TableCell>
                  <TableCell sx={{ color: theme.textColor, border: "none" }}>
                    {test.accuracy ? test.accuracy.toFixed(2) + "%" : "0.00%"}
                  </TableCell>
                  <TableCell sx={{ color: theme.textColor, border: "none" }}>
                    {test.testDate || "N/A"}
                  </TableCell>
                </TableRow>
              ))
            )}
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
