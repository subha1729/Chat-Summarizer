import ReactMarkdown from "react-markdown";
import "../styles/summary.css";

function SummaryCard({
  summaries,
  topicSummary,
  userSummary
}) {

  return (
    <>

      {summaries.length > 0 && (
        <div
          className="summary-card"
          key={summaries[0]._id}
        >
          <h3>Main Summary</h3>

          <div className="date">
            {new Date(
              summaries[0].createdAt
            ).toLocaleString()}
          </div>

          <div className="summary-content">
            <ReactMarkdown>
              {summaries[0].content}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {topicSummary && (
        <div className="summary-card">
          <h3>Topic Summary</h3>

          <div className="summary-content">
            <ReactMarkdown>
              {topicSummary}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {userSummary && (
        <div className="summary-card">
          <h3>
            User Contributions
          </h3>

          <div className="summary-content">
            <ReactMarkdown>
              {userSummary}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {summaries.length === 0 &&
        !topicSummary &&
        !userSummary && (
          <div className="empty">

        <h3>
          No Summary Yet
        </h3>

        <p>
          Generate your first
          summary using the
          controls above.
        </p>

      </div>
        )}

    </>
  );
}

export default SummaryCard;