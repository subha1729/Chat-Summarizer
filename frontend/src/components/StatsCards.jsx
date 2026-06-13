import "../styles/stats.css";

function StatsCards({ stats }) {
  return (
    <div className="stats-grid">

      <div className="stat-card">
        <h2>{stats.messages}</h2>
        <p>Messages</p>
      </div>

      <div className="stat-card">
        <h2>{stats.channels}</h2>
        <p>Channels</p>
      </div>

      <div className="stat-card">
        <h2>{stats.summaries}</h2>
        <p>Summaries</p>
      </div>

    </div>
  );
}

export default StatsCards;