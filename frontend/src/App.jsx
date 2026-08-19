import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000/api/activities";

function App() {
  const [distanceKm, setDistanceKm] = useState("");
  const [totalTimeMinutes, setTotalTimeMinutes] = useState("");
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadActivities = async () => {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to load activities");
      }

      const data = await response.json();
      setActivities(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(API_URL, {
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

      setActivities((currentActivities) => [
        data,
        ...currentActivities,
      ]);

      setDistanceKm("");
      setTotalTimeMinutes("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="app">
      <header className="header">
        <h1>Activity Logger</h1>
        <p>Track your marathon training activities.</p>
      </header>

      <section className="card">
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
        </form>

        {error && <p className="error">{error}</p>}
      </section>

      <section className="card">
        <h2>Activity History</h2>

        {activities.length === 0 ? (
          <p className="empty">No activities logged yet.</p>
        ) : (
          <div className="activity-list">
            {activities.map((activity) => (
              <article className="activity" key={activity.id}>
                <div>
                  <strong>{activity.distanceKm} km</strong>
                  <span>{activity.totalTimeMinutes} min</span>
                </div>

                <div>
                  <strong>{activity.averagePace} min/km</strong>
                  <span>{activity.category}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default App;