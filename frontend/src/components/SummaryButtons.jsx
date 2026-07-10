import "../styles/summaryButtons.css";

function SummaryButtons({
  loading,
  activeAction,
  generateSummary,
  generateTopicSummary,
  generateUserSummary
}) {
  return (
    <div className="button-group">
      <button
        className="generate-btn"
        onClick={generateSummary}
        disabled={loading}
      >
        {activeAction === "summary"
          ? "Generating..."
          : "Generate Summary"}
      </button>

      <button
        className="generate-btn"
        onClick={generateTopicSummary}
        disabled={loading}
      >
        {activeAction === "topic"
          ? "Generating..."
          : "Topic Summary"}
      </button>

      <button
        className="generate-btn"
        onClick={generateUserSummary}
        disabled={loading}
      >
        {activeAction === "user"
          ? "Generating..."
          : "User Summary"}
      </button>
    </div>
  );
}

export default SummaryButtons;