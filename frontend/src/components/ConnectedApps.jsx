import "../styles/connectedApps.css";
import { FaRobot, FaDiscord } from "react-icons/fa";

function ConnectedApps({ accounts }) {
  const isDiscordConnected = accounts.some(
    (account) => account.platform === "discord"
  );

  return (
    <section className="apps-section">
      <header className="apps-header">
        <div>
          <p className="apps-eyebrow">Integrations</p>
          <h2>Connected Apps</h2>
          <p className="apps-subtitle">
            Keep your Discord server connected and invite the bot in one place.
          </p>
        </div>
        <span className={`status-pill ${isDiscordConnected ? "online" : "offline"}`}>
          {isDiscordConnected ? "Discord Ready" : "Discord Pending"}
        </span>
      </header>

      <div className="apps-grid">
        {/* Invite Bot */}
        <button
          className="app-card app-card--primary"
          onClick={() =>
            window.open(
              "https://discord.com/oauth2/authorize?client_id=1510706710858432692&permissions=274877990912&scope=bot%20applications.commands",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <span className="app-icon"><FaRobot size={22} /></span>
          <strong>Invite Bot</strong>
          <small>Add the summarizer bot to your Discord server.</small>
        </button>

        {/* Connect Discord */}
        <button
          className={`app-card ${isDiscordConnected ? "connected" : ""}`}
          onClick={() =>
            (window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/discord`)
          }
        >
          <span className="app-icon"><FaDiscord size={22} /></span>
          <strong>
            {isDiscordConnected ? "Discord Connected " : "Connect Discord"}
          </strong>
          <small>
            {isDiscordConnected
              ? "Your Discord account is linked."
              : "Connect your Discord account to enable summaries."}
          </small>
        </button>
      </div>

      {accounts.length > 0 && (
        <article className="connected-accounts-card">
          <h3>Linked Accounts</h3>
          <div className="connected-accounts-list">
            {accounts.map((account) => (
              <div key={account._id} className="connected-account-pill">
                <span className="platform-chip">{account.platform}</span>
                <span>{account.username}</span>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

export default ConnectedApps;
