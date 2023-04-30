import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./component/Navbar";
import ActivityList from "./view/ActivityList";
import { ThemeProvider } from "@mui/material";
import theme from "./Theme";
import TodoList from "./view/TodoList";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="Content">
            <Routes>
              <Route path="/" element={<Navigate to="/activity" />} />
              <Route path="/activity" element={<ActivityList />} />
              <Route path="/activity/:id" element={<TodoList />} />
              <Route path="*" element={<p>404 Not Found</p>} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
