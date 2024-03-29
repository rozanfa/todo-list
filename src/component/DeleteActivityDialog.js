import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { DeleteOutline } from "@mui/icons-material";
import { Button, DialogTitle, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Warning from "../asset/warning.png";

export default function DeleteActivityDialog({ activity, notify, refetch }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const submitForm = async (e) => {
    e.stopPropagation();
    await fetch(`${backendUrl}/activity-groups/${activity.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    refetch();
    handleClose(e);
    notify();
  };

  return (
    <div>
      <IconButton
        size="small"
        onClick={handleClickOpen}
        data-cy="activity-item-delete-button"
      >
        <DeleteOutline />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          alignItems="center"
          variant="div"
          minWidth="350px"
        ></DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{
                margin: "48px",
              }}
            >
              <img width={80} height={80} src={Warning} alt="Warning" />
            </Box>
            <Typography textAlign="center">
              Apakah anda yakin menghapus activity <b>"{activity.title}"</b>?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            margin: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <Button
            data-cy="modal-delete-cancel-button"
            variant="contained"
            onClick={handleClose}
            sx={{
              width: "100px",
              backgroundColor: "#F4F4F4",
              color: "#000000",
              "&:hover": {
                backgroundColor: "#E4E4E4",
              },
              marginX: "12px",
            }}
          >
            Batal
          </Button>
          <Button
            data-cy="modal-delete-confirm-button"
            variant="contained"
            onClick={submitForm}
            sx={{
              width: "100px",
              backgroundColor: "#ED4C5C",
              "&:hover": {
                backgroundColor: "#CC3C4C",
              },
              marginX: "12px",
            }}
          >
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
