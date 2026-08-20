import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import SummaryCards from "./components/SummaryCards/SummaryCards";
import ActivityForm from "./components/ActivityForm/ActivityForm";
import ActivityHistory from "./components/ActivityHistory/ActivityHistory";
import ConfirmModal from "./components/ConfirmModal/ConfirmModal";

const API_URL = "http://localhost:3000/api/activities";

function App() {
  const [activities, setActivities] = useState([]);
  const [showClearModal, setShowClearModal] = useState(false);

  const loadActivities = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to load activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleClearAll = async () => {
    try {
      const response = await fetch(API_URL, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to clear activities");
      setActivities([]);
    } catch (error) {
      console.error(error);
    } finally {
      setShowClearModal(false);
    }
  };

  return (
    <>
      <Header
        onClearClick={() => setShowClearModal(true)}
        activityCount={activities.length}
      />
      <main className="app">
        <Dashboard>
          <SummaryCards activities={activities} />
          <div className="dashboard__main">
            <ActivityForm
              onActivityCreated={(activity) => {
                setActivities((currentActivities) => [
                  activity,
                  ...currentActivities,
                ]);
              }}
            />
            <ActivityHistory activities={activities} />
          </div>
        </Dashboard>
      </main>

      <ConfirmModal
        open={showClearModal}
        title="Clear all activities?"
        message="Do you want to clear all the existing activities here? This can't be undone."
        onConfirm={handleClearAll}
        onCancel={() => setShowClearModal(false)}
      />
    </>
  );
}

export default App;