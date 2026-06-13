import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import SummaryHistoryCard
  from "../components/SummaryHistoryCard";

import "../styles/summaryHistory.css";

function SummaryHistory() {

  const navigate =
    useNavigate();

  const [summaries,
    setSummaries] =
    useState([]);

 const [search, setSearch] =
  useState("");

  useEffect(() => {

    const fetchSummaries =
      async () => {

        try {

          const res =
            await API.get(
              "/summaries"
            );

          setSummaries(
            res.data
          );

        } catch (error) {

          console.error(error);

        }

      };

    fetchSummaries();

  }, []);
   

  const filteredSummaries =
  summaries.filter((summary) => {

    const text =
      (
        summary.channelName +
        " " +
        summary.content
      ).toLowerCase();

    return text.includes(
      search.toLowerCase()
    );

  });

  if (
    summaries.length === 0
  ) {

    return (

      <div>

        <h1>
          Summary History
        </h1>

        <h3>
          No summaries found.
        </h3>

      </div>

    );

  }

  return (

    <div
      className="history-page"
    >
      <input
        type="text"
        placeholder="Search summaries..."
        value={search}
        onChange={(e) =>
            setSearch(e.target.value)
        }
        className="search-input"
        />
      <h1>
        Summary History
      </h1>

      {
        filteredSummaries.map(
          (summary) => (

            <SummaryHistoryCard
              key={summary._id}
              summary={summary}
              navigate={navigate}
            />

          )
        )
      }

    </div>

  );

}

export default SummaryHistory;