import "../styles/summaryButtons.css";

function SummaryButtons({
  loading,
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
        {loading
          ? "Generating..."
          : "Generate Summary"}
      </button>

      <button
        className="generate-btn"
        onClick={
          generateTopicSummary
        }
        disabled={loading}
      >
        Topic Summary
      </button>

      <button
        className="generate-btn"
        onClick={
          generateUserSummary
        }
        disabled={loading}
      >
        User Summary
      </button>
    </div>
  );
}

export default SummaryButtons;