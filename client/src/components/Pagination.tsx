import { IconButton, Box } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from "../app/hooks";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { theme } = useTheme();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <IconButton
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        sx={{
          color: currentPage <= 1 ? theme.secondaryColor : theme.textColor,
          "&:hover": {
            backgroundColor: theme.primaryDark,
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <Box
        sx={{
          color: theme.textColor,
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        Page {currentPage} of {totalPages}
      </Box>

      <IconButton
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        sx={{
          color:
            currentPage >= totalPages ? theme.secondaryColor : theme.textColor,
          "&:hover": {
            backgroundColor: theme.primaryDark,
          },
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
}
