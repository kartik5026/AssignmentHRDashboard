import { Link, useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate(); // Hook for navigation
  
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "GET",
        credentials: "include", // Include cookies for the request
      });
      if (response.ok) {
        // Navigate to the login page first
        navigate("/");

        // Reload the page after navigating to the login page
        window.location.reload(); // This will reload the page and show the login page
      } else {
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <div>
      <div className="my-8">
        <Link to="/overview">
          <h1>Overview</h1>
        </Link>
      </div>
      <div className="my-8">
        <Link to="/people">
          <h1>Employee</h1>
        </Link>
      </div>
      <div className="my-8">
        <Link to="/attendance">
          <h1>Attendance</h1>
        </Link>
      </div>
      <div className="my-8">
        <Link to="/leave">
          <h1>Leave</h1>
        </Link>
      </div>
      <div className="my-8">
        <button
          onClick={handleLogout}
          className="text-red-500 hover:underline cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
