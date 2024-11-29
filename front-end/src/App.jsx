import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import People from "./Components/People";
import SideBar from "./Components/SideBar";
import TopBar from "./Components/TopBar";
import OverView from "./Components/OverView";
import AddMember from "./Components/AddMember";
import UpdateUser from "./Components/UpdateUser";
import Attendance from "./Components/Attendance";
import Leave from "./Components/Leave";
import Home from "./Components/Home";
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:3000/overview", {
          withCredentials: true,
        });
        if (response.data.msg !== "failed") {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen while checking auth
  }

  return (
    <>
      {isAuthenticated ? (
        <>
          <TopBar />
          <div className="flex flex-col lg:flex-row justify-evenly">
            <div className="lg:w-1/4 p-4">
              <SideBar />
            </div>
            <div className="lg:w-3/4 p-4 overflow-auto">
              <Routes>
                <Route path="/overview" element={<OverView />} />
                <Route path="/people" element={<People />} />
                <Route path="/addNewMember" element={<AddMember />} />
                <Route path="/update" element={<UpdateUser />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/leave" element={<Leave />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Home setAuth={setIsAuthenticated} />} />
        </Routes>
      )}
    </>
  );
}

export default App;
