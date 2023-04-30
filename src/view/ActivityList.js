import { Add } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import ActivityCard from "../component/ActivityCard";

const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const getActivities = async () => {
    fetch(`${backendUrl}/activity-groups`)
      .then((response) => response.json())
      .then((data) => setActivities(data.data));
  };

  React.useEffect(() => {
    getActivities();
  }, []);

  const handleAddButton = async () => {
    const data = {
      title: "New Activity",
    };
    await fetch(`${backendUrl}/activity-groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    getActivities();
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
          <Typography variant="h2">Activity</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddButton}
          >
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            refetch={getActivities}
          />
        ))}
      </Box>
    </Container>
  );
};

export default ActivityList;
