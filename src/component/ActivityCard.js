import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteActivityDialog from "./DeleteActivityDialog";

const ActivityCard = ({ activity, refetch }) => {
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
      data-cy="activity-item"
    >
      <CardContent>
        <Typography
          variant="p"
          fontWeight={"bold"}
          component="div"
          textAlign={"left"}
          data-cy="activity-item-title"
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
          data-cy="activity-item-date"
        >
          {new Date(activity.created_at).toLocaleDateString(
            "id-ID",
            dateOptions
          )}
        </Typography>
        <DeleteActivityDialog activity={activity} refetch={refetch} />
      </CardActions>
    </Card>
  );
};

export default ActivityCard;
