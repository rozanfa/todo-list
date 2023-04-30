import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";

const ActivityCard = ({ activity }) => {
  let navigate = useNavigate();
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  return (
    <Card
      sx={{
        width: "177px",
        height: "170px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8px",
        borderRadius: "12px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        },
      }}
      onClick={() => {
        navigate(`/activity/${activity.id}`);
      }}
    >
      <CardContent>
        <Typography
          variant="p"
          fontWeight={"bold"}
          component="div"
          textAlign={"left"}
        >
          {activity.title}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          dixplay: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: 12, marginLeft: "8px" }}
          variant="p"
          component="div"
          color="text.secondary"
        >
          {new Date(activity.created_at).toLocaleDateString(
            "id-ID",
            dateOptions
          )}
        </Typography>
        <IconButton size="small">
          <DeleteOutline />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
