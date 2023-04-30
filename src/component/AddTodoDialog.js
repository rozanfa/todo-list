import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add, Close } from "@mui/icons-material";
import { Button, Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ColorIndicator from "./ColorIndicator";
import priorityColor from "../utils/Todo";
import PriorityMenu from "./PriorityMenu";

export default function AddTodoDialog({ activityId, refetch }) {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const submitForm = async () => {
    const data = {
      title: title,
      priority: priority,
      activity_group_id: activityId,
    };

    console.log(backendUrl);

    await fetch(`${backendUrl}/todo-items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setTitle("");
    setPriority(null);

    refetch();
    handleClose();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleClickOpen}
        data-cy="todo-add-button"
      >
        Tambah
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        data-cy="modal-add"
      >
        <DialogTitle
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          alignItems="center"
          variant="div"
          minWidth="350px"
        >
          Tambah List Item
          <IconButton
            onClick={handleClose}
            variant="contained"
            data-cy="modal-add-close-button"
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography variant="subtitle1" data-cy="modal-add-name-title">
              NAMA LIST ITEM
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              fullWidth
              variant="outlined"
              placeholder="Tambahkan nama list item"
              onChange={handleTitleChange}
              sx={{
                marginTop: "2px",
                width: "100%",
              }}
              data-cy="modal-add-name-input"
            />
          </Box>
          <Box marginTop={"12px"}>
            <Typography variant="subtitle1">PRIORITY</Typography>
            <ColorIndicator
              color={priorityColor(priority)}
              sx={{
                display: "inline-block",
                position: "absolute",
                top: "236px",
                left: "36px",
              }}
            />
            <PriorityMenu priority={priority} handleSetPriority={setPriority} />
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions
          sx={{
            margin: "12px",
          }}
        >
          <Button
            variant="contained"
            onClick={submitForm}
            sx={{
              width: "100px",
            }}
            disabled={title.trim() === "" || priority === null}
            data-cy="modal-add-save-button"
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
