import { ArrowBackIos, Edit } from "@mui/icons-material";
import {
  Alert,
  Box,
  ClickAwayListener,
  Container,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddTodoDialog from "../component/AddTodoDialog";
import SortMenu from "../component/SortMenu";
import TodoCard from "../component/TodoCard";
import { useNavigate, useParams } from "react-router-dom";
import TodosEmpty from "../asset/create-new-list.png";

const TodoList = () => {
  const params = useParams();
  const [todos, setTodos] = React.useState([]);
  const [activity, setActivity] = React.useState({});
  const [sort, setSort] = React.useState("terbaru");
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleSetSort = (value) => {
    setSort(value);
    const newTodo = todos.sort((a, b) => {
      if (value === "terbaru") {
        return b.id - a.id;
      } else if (value === "terlama") {
        return a.id - b.id;
      } else if (value === "nama-a-z") {
        return a.title.localeCompare(b.title);
      } else if (value === "nama-z-a") {
        return b.title.localeCompare(a.title);
      } else if (value === "belum-selesai") {
        return b.is_active - a.is_active;
      }
      return true;
    });
    setTodos(newTodo);
  };

  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;
  let navigate = useNavigate();

  const getActivityAndTodos = async () => {
    await fetch(`${backendUrl}/activity-groups/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setActivity(data);
        setTodos(data.todo_items);
        setTitle(data.title);
      });
    setIsLoaded(true);
  };

  React.useEffect(() => {
    getActivityAndTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRename = async () => {
    if (isEditing) {
      const data = {
        title: title,
      };
      await fetch(`${backendUrl}/activity-groups/${activity.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      getActivityAndTodos();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const notify = () => {
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          padding: "4px",
          marginRight: "16px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginY: "16px",
          }}
        >
          <IconButton size="small">
            <ArrowBackIos
              onClick={() => {
                navigate("/activity");
              }}
              data-cy="todo-back-button"
            />
          </IconButton>
          {isEditing ? (
            <ClickAwayListener onClickAway={handleRename}>
              <TextField
                variant="standard"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </ClickAwayListener>
          ) : (
            <Typography
              variant="h2"
              margin="auto"
              onClick={handleRename}
              data-cy="todo-title"
            >
              {title}
            </Typography>
          )}
          <IconButton
            size="small"
            sx={{
              marginLeft: "16px",
            }}
            onClick={handleRename}
            data-cy="todo-title-edit-button"
          >
            <Edit />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SortMenu sort={sort} handleSetSort={handleSetSort} />
          <AddTodoDialog
            activityId={activity.id}
            refetch={getActivityAndTodos}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "8px",
          "> *": {
            marginBottom: "12px",
          },
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {isLoaded && todos.length === 0 ? (
          <img
            src={TodosEmpty}
            alt="Buat item list kamu"
            data-cy="todo-empty-state"
          />
        ) : (
          todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              notify={notify}
              refetch={getActivityAndTodos}
            />
          ))
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ position: "fixed", bottom: "16px", left: "16px" }}
          data-cy="modal-information"
        >
          Berhasil menghapus activity
        </Alert>
      </Snackbar>
      <div data-cy="modal-delete"></div>
    </Container>
  );
};

export default TodoList;
