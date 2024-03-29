import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ClickAwayListener, Popper, IconButton } from "@mui/material";
import { SwapVert } from "@mui/icons-material";
import {
  ArrowDownward,
  ArrowUpward,
  DoneOutlined,
  ImportExport,
  TextRotateUp,
  TextRotationDown,
} from "@mui/icons-material";

export default function SortMenu({ sort, handleSetSort }) {
  const [openSort, setOpenSort] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenSort((prevOpen) => !prevOpen);
  };

  const prevOpen = React.useRef(openSort);
  React.useEffect(() => {
    if (prevOpen.current === true && openSort === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openSort;
  }, [openSort]);

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenSort(false);
    } else if (event.key === "Escape") {
      setOpenSort(false);
    }
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpenSort(false);
  };
  return (
    <>
      <IconButton
        size="small"
        sx={{
          border: "1px solid #E5E5E5",
          marginRight: "12px",
        }}
        onClick={handleToggle}
        ref={anchorRef}
        aria-controls={openSort ? "composition-menu" : undefined}
        aria-expanded={openSort ? "true" : undefined}
        aria-haspopup="true"
        data-cy="todo-sort-button"
      >
        <SwapVert />
      </IconButton>
      <Popper
        open={openSort}
        anchorEl={anchorRef.current}
        placement="bottom-end"
      >
        <Paper sx={{ width: 320, maxWidth: "100%" }}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={openSort}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              <MenuItem
                onClick={() => {
                  handleSetSort("terbaru");
                  setOpenSort(false);
                }}
                data-cy="sort-selection"
              >
                <ListItemIcon>
                  <ArrowDownward fontSize="small" />
                </ListItemIcon>
                <ListItemText>Terbaru</ListItemText>
                {sort === "terbaru" && <DoneOutlined />}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetSort("terlama");
                  setOpenSort(false);
                }}
                data-cy="sort-selection"
              >
                <ListItemIcon>
                  <ArrowUpward fontSize="small" />
                </ListItemIcon>
                <ListItemText>Terlama</ListItemText>
                {sort === "terlama" && <DoneOutlined />}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetSort("nama-a-z");
                  setOpenSort(false);
                }}
                data-cy="sort-selection"
              >
                <ListItemIcon>
                  <TextRotationDown fontSize="small" />
                </ListItemIcon>
                <ListItemText>A-Z</ListItemText>
                {sort === "nama-a-z" && <DoneOutlined />}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetSort("nama-z-a");
                  setOpenSort(false);
                }}
                data-cy="sort-selection"
              >
                <ListItemIcon>
                  <TextRotateUp fontSize="small" />
                </ListItemIcon>
                <ListItemText>Z-A</ListItemText>
                {sort === "nama-z-a" && <DoneOutlined />}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleSetSort("belum-selesai");
                  setOpenSort(false);
                }}
                data-cy="sort-selection"
              >
                <ListItemIcon>
                  <ImportExport fontSize="small" />
                </ListItemIcon>
                <ListItemText>Belum Selesai</ListItemText>
                {sort === "belum-selesai" && <DoneOutlined />}
              </MenuItem>
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </>
  );
}
