import { useState } from "react";
import "./ActivityForm.css";
import PaceLegend from "./PaceLegend";

function ActivityForm({ onActivityCreated }) {
  const [distanceKm, setDistanceKm] = useState("");
  const [totalTimeMinutes, setTotalTimeMinutes] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distanceKm: Number(distanceKm),
          totalTimeMinutes: Number(totalTimeMinutes),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create activity");
      }

      onActivityCreated(data);

      setDistanceKm("");
      setTotalTimeMinutes("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="activity-form">
      <h2>Log Activity</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="distance">Distance (km)</label>

          <input
            id="distance"
            type="number"
            min="0"
            step="0.01"
            value={distanceKm}
            onChange={(event) => setDistanceKm(event.target.value)}
            placeholder="e.g. 10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Total Time (minutes)</label>

          <input
            id="time"
            type="number"
            min="0"
            step="0.01"
            value={totalTimeMinutes}
            onChange={(event) =>
              setTotalTimeMinutes(event.target.value)
            }
            placeholder="e.g. 60"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Log Activity"}
        </button>

        <PaceLegend />
      </form>

      {error && <p className="error">{error}</p>}
    </section>
  );
}

export default ActivityForm;