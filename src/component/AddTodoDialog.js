import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Add, Close, ExitToApp } from "@mui/icons-material";
import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  MenuList,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { MenuItem, TabsListProvider } from "@mui/base";
import ColorIndicator from "./ColorIndicator";
import priorityColor from "../utils/Todo";

export default function AddTodoDialog({ activityId, refetch }) {
  const [open, setOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [priority, setPriority] = React.useState("very-high");

  const handleChange = (event) => {
    setPriority(event.target.value);
  };

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

    refetch();
    handleClose();
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <Button variant="contained" startIcon={<Add />} onClick={handleClickOpen}>
        Tambah
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          justifyContent="space-between"
          display="flex"
          flexDirection="row"
          alignItems="center"
          variant="div"
          minWidth="350px"
        >
          Tambah List Item
          <IconButton onClick={handleClose} variant="contained">
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            <Typography variant="subtitle1">NAMA LIST ITEM</Typography>
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
            />
          </Box>
          <Box marginTop={"12px"}>
            <Typography variant="subtitle1">PRIORITY</Typography>
            <ColorIndicator
              color={priorityColor(priority)}
              sx={{
                display: "inline-block",
                position: "absolute",
                top: "238px",
                left: "42px",
              }}
            />
            <Select
              native
              value={priority}
              onChange={handleChange}
              input={<OutlinedInput />}
              sx={{
                width: "200px",
                paddingLeft: "20px",
                minWidth: "200px",
              }}
            >
              <option value={"very-high"}>Very High</option>
              <option value={"high"}>High</option>
              <option value={"normal"}>Normal</option>
              <option value={"low"}>Low</option>
              <option value={"very-low"}>Very Low</option>
            </Select>
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
            disabled={title === ""}
          >
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
