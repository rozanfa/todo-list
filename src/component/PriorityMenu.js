import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { ClickAwayListener, Popper, Button } from "@mui/material";

const priorityText = (priority) => {
  switch (priority) {
    case "very-low":
      return "Very Low";
    case "low":
      return "Low";
    case "medium":
      return "Medium";
    case "high":
      return "High";
    case "very-high":
      return "Very High";
    default:
      return "Pilih Prioritas";
  }
};

export default function PriorityMenu({ priority, handleSetPriority }) {
  const [openPriority, setOpenPriority] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenPriority((prevOpen) => !prevOpen);
  };

  const prevOpen = React.useRef(openPriority);
  React.useEffect(() => {
    if (prevOpen.current === true && openPriority === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openPriority;
  }, [openPriority]);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenPriority(false);
    } else if (event.key === "Escape") {
      setOpenPriority(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpenPriority(false);
  };
  return (
    <>
      <Button
        size="small"
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={openPriority ? "composition-menu" : undefined}
        aria-expanded={openPriority ? "true" : undefined}
        aria-haspopup="true"
        data-cy="modal-add-priority-dropdown"
        sx={{
          border: "1px solid rgb(118, 118, 118)",
          marginRight: "12px",
          color: "#000000",
          fontWeight: "normal",
          borderRadius: "4px",
          padding: "12px",
          paddingLeft: "30px",
          fontSize: "14px",
        }}
      >
        {priorityText(priority)}
      </Button>
      <Popper
        open={openPriority}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        sx={{
          zIndex: 100000,
        }}
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={openPriority}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem
                onClick={() => {
                  handleSetPriority("very-high");
                  setOpenPriority(false);
                }}
                data-cy="modal-add-priority-item"
              >
                <ListItemText>Very High</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetPriority("high");
                  setOpenPriority(false);
                }}
                data-cy="modal-add-priority-item"
              >
                <ListItemText>High</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetPriority("medium");
                  setOpenPriority(false);
                }}
                data-cy="modal-add-priority-item"
              >
                <ListItemText>Medium</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetPriority("low");
                  setOpenPriority(false);
                }}
                data-cy="modal-add-priority-item"
              >
                <ListItemText>Low</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetPriority("very-low");
                  setOpenPriority(false);
                }}
                data-cy="modal-add-priority-item"
              >
                <ListItemText>Very Low</ListItemText>
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
