import ActivityCard from "./ActivityCard";
import "./ActivityHistory.css";

function ActivityHistory({ activities }) {
  return (
    <section className="activity-history">
      <div className="activity-history__header">
        <h2>Activity History</h2>

        <span className="activity-history__count">
          {activities.length} {activities.length === 1 ? "activity" : "activities"}
        </span>
      </div>

      {activities.length === 0 ? (
        <p className="empty">No activities logged yet.</p>
      ) : (
        <div className="activity-list">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ActivityHistory;