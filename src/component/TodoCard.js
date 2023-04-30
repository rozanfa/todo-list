import { Edit } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import priorityColor from "../utils/Todo";
import ColorIndicator from "./ColorIndicator";
import DeleteTodoDialog from "./DeleteTodoDialog";

const TodoCard = ({ todo, notify, refetch }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);

  const handleCheck = async () => {
    console.log(todo);
    const data = {
      is_active: !todo.is_active ? "true" : "false",
    };
    await fetch(`${backendUrl}/todo-items/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    refetch();
  };

  const handleRename = async () => {
    if (isEditing) {
      const data = {
        title: title,
      };
      await fetch(`${backendUrl}/todo-items/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      refetch();
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <Card
      sx={{
        width: "816px",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "8px",
        borderRadius: "12px",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          sx={{
            marginRight: "4px",
          }}
          checked={!todo.is_active}
          onClick={handleCheck}
          data-cy="todo-item-checkbox"
        />
        <ColorIndicator
          color={priorityColor(todo.priority)}
          data-cy="todo-item-priority-indicator"
        />
        {isEditing ? (
          <TextField
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <Typography
            variant="p"
            component="div"
            textAlign={"left"}
            sx={{
              textDecorationLine: !todo.is_active ? "line-through" : "none",
            }}
            data-cy="todo-item-title"
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
        >
          <Edit />
        </IconButton>
      </CardContent>
      <CardActions
        sx={{
          dixplay: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 12 }}
          variant="p"
          component="div"
          color="text.secondary"
        ></Typography>
        <DeleteTodoDialog todo={todo} notify={notify} refetch={refetch} />
      </CardActions>
    </Card>
  );
};

export default TodoCard;
