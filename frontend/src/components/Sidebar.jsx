import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="sidebar">

      <h2>
        ChatSummarizer
      </h2>

      <div className="sidebar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/history">
          Summary History
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/settings">
          Settings
        </Link>

      </div>

    </div>

  );

}

export default Sidebar;