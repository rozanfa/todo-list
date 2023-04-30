import "./App.css";
import Home from "./view/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
              <Route path="/" element={<Home />} />
              <Route path="/activity" element={<ActivityList />} />
              <Route
                path="/activity/:id"
                element={<TodoList />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
