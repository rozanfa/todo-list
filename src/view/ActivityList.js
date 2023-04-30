import { Add } from "@mui/icons-material";
import { Box, Button, Container, Snackbar, Typography } from "@mui/material";
import React from "react";
import ActivityCard from "../component/ActivityCard";
import ActivityEmpty from "../asset/getting-started.png";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ActivityList = () => {
  const [activities, setActivities] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_BASE_URL;

  const getActivities = async () => {
    await fetch(`${backendUrl}/activity-groups`)
      .then((response) => response.json())
      .then((data) => setActivities(data.data));
    setIsLoaded(true);
  };

  React.useEffect(() => {
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Typography variant="h2" data-cy="activity-title">
            Activity
          </Typography>
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
            data-cy="activity-add-button"
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
        {isLoaded && activities.length === 0 ? (
          <img src={ActivityEmpty} alt="Buat activity pertamamu" />
        ) : (
          activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              notify={notify}
              refetch={getActivities}
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
    </Container>
  );
};

export default ActivityList;
