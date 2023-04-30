import { ArrowBackIos, Edit } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import AddTodoDialog from "../component/AddTodoDialog";
import SortMenu from "../component/SortMenu";
import TodoCard from "../component/TodoCard";
import { useNavigate, useParams } from "react-router-dom";

const TodoList = () => {
  const params = useParams();
  const [todos, setTodos] = React.useState([]);
  const [activity, setActivity] = React.useState({});

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
  };

  React.useEffect(() => {
    getActivityAndTodos();
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
            />
          </IconButton>
          {isEditing ? (
            <TextField
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <Typography variant="h2" margin="auto" onClick={handleRename}>
              {title}
            </Typography>
          )}
          <IconButton
            size="small"
            sx={{
              marginLeft: "16px",
            }}
            onClick={handleRename}
          >
            <Edit />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <SortMenu />
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
      >
        {todos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} refetch={getActivityAndTodos} />
        ))}
      </Box>
    </Container>
  );
};

export default TodoList;
