import "./Header.css";

function Header({ onClearClick, activityCount }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__text">
          <h1>Activity Logger</h1>
          <p>Track your marathon training activities.</p>
        </div>
        <button
          className="header__clear-btn"
          onClick={onClearClick}
          disabled={activityCount === 0}
        >
          Clean up
        </button>
      </div>
    </header>
  );
}

export default Header;