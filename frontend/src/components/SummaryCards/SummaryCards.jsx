import "./SummaryCards.css";

function SummaryCards({ activities }) {
  const totalActivities = activities.length;

  const totalDistance = activities.reduce(
    (total, activity) => total + Number(activity.distanceKm),
    0
  );

  const averagePace =
    activities.length > 0
      ? activities.reduce(
          (total, activity) => total + Number(activity.averagePace),
          0
        ) / activities.length
      : 0;

  const latestCategory =
    activities.length > 0 ? activities[0].category : "—";

  return (
    <section className="summary-cards">
      <article className="summary-card">
        <span className="summary-card__label">Activities</span>
        <strong className="summary-card__value">
          {totalActivities}
        </strong>
      </article>

      <article className="summary-card">
        <span className="summary-card__label">Total Distance</span>
        <strong className="summary-card__value">
          {totalDistance.toFixed(2)} km
        </strong>
      </article>

      <article className="summary-card">
        <span className="summary-card__label">Average Pace</span>
        <strong className="summary-card__value">
          {averagePace > 0 ? `${averagePace.toFixed(2)} min/km` : "—"}
        </strong>
      </article>

      <article className="summary-card">
        <span className="summary-card__label">Latest Category</span>
        <strong className="summary-card__value">
          {latestCategory}
        </strong>
      </article>
    </section>
  );
}

export default SummaryCards;