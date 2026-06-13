function SummaryHistoryCard({
  summary,
  navigate
}) {

  return (

    <div
      onClick={() =>
        navigate(
          `/history/${summary._id}`
        )
      }
      className="history-card"
    >

      <h2 className="history-title">

        {
          summary.channelName
            ? `#${summary.channelName}`
            : `Summary #${summary._id.slice(-6)}`
        }

      </h2>

      <p>

        {summary.messageCount}
        {" "}Messages •{" "}
        {
          new Date(
            summary.createdAt
          ).toLocaleDateString()
        }

      </p>

      <p className="history-preview">

        {
          summary.content
            .replaceAll("#", "")
            .replaceAll("\n", " ")
            .slice(0, 120)
        }...

      </p>

    </div>

  );

}

export default SummaryHistoryCard;