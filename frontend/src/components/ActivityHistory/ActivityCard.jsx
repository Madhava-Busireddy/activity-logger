// import "./ActivityCard.css";

// function ActivityCard({ activity }) {
//   const categoryClass = activity.category
//     .toLowerCase()
//     .replace(" ", "-");

//   return (
//     <article className="activity">
//       <div className="activity__main">
//         <strong className="activity__distance">
//           {activity.distanceKm} km
//         </strong>

//         <span className="activity__time">
//           {activity.totalTimeMinutes} min
//         </span>
//       </div>

//       <div className="activity__pace">
//         <span className="activity__pace-label">
//           Average Pace
//         </span>

//         <strong className="activity__pace-value">
//           {Number(activity.averagePace).toFixed(2)} min/km
//         </strong>
//       </div>

//       <span
//         className={`activity__category activity__category--${categoryClass}`}
//       >
//         {activity.category}
//       </span>
//     </article>
//   );
// }

// export default ActivityCard;

import "./ActivityCard.css";

function formatDateTime(isoString) {
  const date = new Date(isoString);

  const datePart = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const timePart = date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });

  return `${datePart} · ${timePart}`;
}

function ActivityCard({ activity }) {
  const categoryClass = activity.category
    .toLowerCase()
    .replace(" ", "-");

  return (
    <article className="activity">
      <div className="activity__main">
        <strong className="activity__distance">
          {activity.distanceKm} km
        </strong>

        <span className="activity__time">
          {activity.totalTimeMinutes} min
        </span>

        <span className="activity__date">
          {formatDateTime(activity.createdAt)}
        </span>
      </div>

      <div className="activity__pace">
        <span className="activity__pace-label">
          Average Pace
        </span>

        <strong className="activity__pace-value">
          {Number(activity.averagePace).toFixed(2)} min/km
        </strong>
      </div>

      <span
        className={`activity__category activity__category--${categoryClass}`}
      >
        {activity.category}
      </span>
    </article>
  );
}

export default ActivityCard;