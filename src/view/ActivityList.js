import { Add } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import ActivityCard from "../component/ActivityCard";

const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  React.useEffect(() => {
    fetch(`${backendUrl}/activity-groups`)
      .then((response) => response.json())
      .then((data) => setActivities(data.data));
  }, []);

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
          <Typography variant="h2">Activity</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Button variant="contained" startIcon={<Add />}>
            Tambah
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          marginTop: "8px",
          "> *": {
            marginRight: "20px",
            marginBottom: "20px",
          },
        }}
      >
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </Box>
    </Container>
  );
};

export default ActivityList;
