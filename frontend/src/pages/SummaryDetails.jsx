import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import SummaryDetailsCard
  from "../components/SummaryDetailsCard";

import "../styles/summaryDetails.css";

function SummaryDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [summary,
    setSummary] =
    useState(null);

  useEffect(() => {

    const fetchSummary =
      async () => {

        try {

          const res =
            await API.get(
              `/summaries/${id}`
            );

          setSummary(
            res.data
          );

        } catch (error) {

          console.error(error);

        }

      };

    fetchSummary();

    

  }, [id]);

  
  const handleDelete =
  async () => {

    const confirmDelete =
      window.confirm(
        "Delete this summary?"
      );

    if (!confirmDelete)
      return;

    try {

      await API.delete(
        `/summaries/${id}`
      );

      navigate("/history");

    } catch (error) {

      console.error(error);

    }

  };

  if (!summary) {

    return <h2>Loading...</h2>;

  }

  return (
  <div className="details-container">
    <div className="details-header">
      <button
        className="back-btn"
        onClick={() => navigate("/history")}
      >
        ← Back
      </button>

      <button
        className="delete-btn"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>

    <SummaryDetailsCard
      summary={summary}
    />
  </div>

);

}

export default SummaryDetails;