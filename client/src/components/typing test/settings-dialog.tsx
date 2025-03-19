import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Typography, Box } from "@mui/material";
import { useTheme } from "../../app/hooks";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  onWordCountChange: (wordCount: number) => void;
  currentWordCount: number;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onClose,
  onWordCountChange,
  currentWordCount,
}) => {
  const { theme } = useTheme();

  return (
    <Dialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ background: theme.primaryDark, color: "#fff" }}>
        Settings
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#fff",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          background: theme.primaryDark,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ textAlign: "left", width: "100%" }}
        >
          Words
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          {[15, 30, 60].map((num) => (
            <Button
              key={num}
              variant="contained"
              sx={{
                background:
                  currentWordCount === num
                    ? theme.secondaryColor
                    : theme.primaryColor,
                color: "#fff",
                "&:hover": {
                  background: theme.primaryDark,
                },
              }}
              onClick={() => {
                onWordCountChange(num);
                onClose();
              }}
            >
              {num}
            </Button>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
