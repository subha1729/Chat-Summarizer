import ReactMarkdown
  from "react-markdown";

function SummaryDetailsCard({
  summary
}) {

  return (

    <div className="details-card">

      <h1 className="details-title">
        # {summary.channelName
          ? `#${summary.channelName}`
          : "Summary"}
      </h1>

      <p className="details-meta">
        {summary.messageCount}
        {" "}Messages •{" "}
        {
          new Date(
            summary.createdAt
          ).toLocaleDateString()
        }
      </p>

      <div className="details-content">

        <ReactMarkdown>
          {summary.content}
        </ReactMarkdown>

      </div>

    </div>

  );

}

export default SummaryDetailsCard;