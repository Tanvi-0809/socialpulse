import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import Overview from "./pages/Overview";
import Analytics from "./pages/Analytics";
import Audience from "./pages/Audience";
import Posts from "./pages/Posts";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

import "./App.css";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Header />

        <Routes>
          <Route path="/" element={<Overview />} />

          <Route path="/analytics" element={<Analytics />} />

          <Route path="/audience" element={<Audience />} />

          <Route path="/posts" element={<Posts />} />

          <Route path="/calendar" element={<Calendar />} />

          <Route path="/settings" element={<Settings />} />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;