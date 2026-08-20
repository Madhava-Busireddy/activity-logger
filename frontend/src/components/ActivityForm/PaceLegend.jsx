import "./PaceLegend.css";

const CATEGORIES = [
  {
    key: "zone2",
    label: "Zone 2",
    range: "≥ 6.5 min/km",
    description: "Easy, conversational pace",
  },
  {
    key: "threshold",
    label: "Threshold",
    range: "5.0 – 6.5 min/km",
    description: "Comfortably hard",
  },
  {
    key: "sprint",
    label: "Sprint",
    range: "< 5.0 min/km",
    description: "Max effort",
  },
];

function PaceLegend() {
  return (
    <div className="pace-legend">
      <h3>Pace Categories</h3>
      <ul>
        {CATEGORIES.map((category) => (
          <li key={category.key}>
            <span className={`pace-legend__dot pace-legend__dot--${category.key}`} />
            <span className="pace-legend__label">{category.label}</span>
            <span className="pace-legend__range">{category.range}</span>
            <span className="pace-legend__description">{category.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaceLegend;