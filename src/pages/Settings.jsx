import { useState, useEffect } from "react";
import {
  UserRound,
  Link2,
  Bell,
  SlidersHorizontal,
  Save,
  CheckCircle2,
  Camera,
  Users,
  BriefcaseBusiness,
  MessageSquare,
} from "lucide-react";

import "../styles/Settings.css";

const defaultSettings = {
  name: "SocialPulse User",
  email: "user@example.com",
  notifications: {
    postReminders: true,
    weeklyReports: true,
    engagementAlerts: false,
    emailNotifications: true,
  },
  preferences: {
    defaultPlatform: "Instagram",
    dateFormat: "DD/MM/YYYY",
    autoRefresh: true,
  },
};

const platforms = [
  {
    name: "Instagram",
    icon: Camera,
    color: "#E879B9",
  },
  {
    name: "Facebook",
    icon: Users,
    color: "#1877F2",
  },
  {
    name: "LinkedIn",
    icon: BriefcaseBusiness,
    color: "#0A66C2",
  },
  {
    name: "Twitter / X",
    icon: MessageSquare,
    color: "#25243A",
  },
];

function Settings() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("socialpulse-settings");

      if (saved) {
        const parsed = JSON.parse(saved);

        return {
          ...defaultSettings,
          ...parsed,
          notifications: {
            ...defaultSettings.notifications,
            ...parsed.notifications,
          },
          preferences: {
            ...defaultSettings.preferences,
            ...parsed.preferences,
          },
        };
      }
    } catch (error) {
      console.error("Unable to load settings:", error);
    }

    return defaultSettings;
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;

    const timer = setTimeout(() => setSaved(false), 3000);

    return () => clearTimeout(timer);
  }, [saved]);

  const updateProfile = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));

    setSaved(false);
  };

  const updateNotification = (field) => {
    setSettings((previous) => ({
      ...previous,
      notifications: {
        ...previous.notifications,
        [field]: !previous.notifications[field],
      },
    }));

    setSaved(false);
  };

  const updatePreference = (field, value) => {
    setSettings((previous) => ({
      ...previous,
      preferences: {
        ...previous.preferences,
        [field]: value,
      },
    }));

    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();

    try {
      localStorage.setItem(
        "socialpulse-settings",
        JSON.stringify(settings)
      );

      setSaved(true);
    } catch (error) {
      console.error("Unable to save settings:", error);
      setSaved(false);
    }
  };

  return (
    <div className="page-content settings-page">
      <div className="settings-page-heading">
        <div>
          <p className="eyebrow">ACCOUNT & PREFERENCES</p>

          <h1>Settings</h1>

          <p className="subtitle">
            Manage your profile and customize your SocialPulse experience.
          </p>
        </div>

        <div className="settings-heading-icon">
          <SlidersHorizontal size={25} />
        </div>
      </div>

      <form onSubmit={handleSave}>
        {/* PROFILE SETTINGS */}

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-section-icon">
              <UserRound size={21} />
            </div>

            <div>
              <h2>Profile Settings</h2>
              <p>Update your personal information.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label htmlFor="settings-name">Full Name</label>

              <input
                id="settings-name"
                type="text"
                value={settings.name}
                onChange={(event) =>
                  updateProfile("name", event.target.value)
                }
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="settings-field">
              <label htmlFor="settings-email">Email Address</label>

              <input
                id="settings-email"
                type="email"
                value={settings.email}
                onChange={(event) =>
                  updateProfile("email", event.target.value)
                }
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
        </section>

        {/* CONNECTED PLATFORMS */}

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-section-icon">
              <Link2 size={21} />
            </div>

            <div>
              <h2>Connected Platforms</h2>
              <p>
                View social platforms available in your dashboard.
              </p>
            </div>
          </div>

          <div className="settings-platform-list">
            {platforms.map((platform) => {
              const PlatformIcon = platform.icon;

              return (
                <div
                  className="settings-platform-row"
                  key={platform.name}
                >
                  <div className="settings-platform-info">
                    <div
                      className="settings-platform-icon"
                      style={{
                        backgroundColor: `${platform.color}15`,
                        color: platform.color,
                      }}
                    >
                      <PlatformIcon size={20} />
                    </div>

                    <div>
                      <h3>{platform.name}</h3>
                      <p>Demo platform</p>
                    </div>
                  </div>

                  <span className="settings-platform-badge">
                    Demo
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* NOTIFICATIONS */}

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-section-icon">
              <Bell size={21} />
            </div>

            <div>
              <h2>Notification Preferences</h2>
              <p>Choose which notifications you would like to receive.</p>
            </div>
          </div>

          <div className="settings-options-list">
            {[
              {
                key: "postReminders",
                title: "Post Reminders",
                description: "Reminders for upcoming scheduled posts.",
              },
              {
                key: "weeklyReports",
                title: "Weekly Reports",
                description: "Weekly social media performance summaries.",
              },
              {
                key: "engagementAlerts",
                title: "Engagement Alerts",
                description: "Updates about engagement activity.",
              },
              {
                key: "emailNotifications",
                title: "Email Notifications",
                description: "Receive notifications through email.",
              },
            ].map((option) => (
              <div className="settings-option-row" key={option.key}>
                <div>
                  <h3>{option.title}</h3>
                  <p>{option.description}</p>
                </div>

                <label className="settings-switch">
                  <input
                    type="checkbox"
                    checked={settings.notifications[option.key]}
                    onChange={() => updateNotification(option.key)}
                    aria-label={option.title}
                  />

                  <span className="settings-switch-slider" />
                </label>
              </div>
            ))}
          </div>

          <p className="settings-demo-note">
            These preferences are saved locally. Actual notifications
            require a notification service.
          </p>
        </section>

        {/* DASHBOARD PREFERENCES */}

        <section className="settings-card">
          <div className="settings-section-heading">
            <div className="settings-section-icon">
              <SlidersHorizontal size={21} />
            </div>

            <div>
              <h2>Dashboard Preferences</h2>
              <p>Customize your dashboard settings.</p>
            </div>
          </div>

          <div className="settings-form-grid">
            <div className="settings-field">
              <label htmlFor="default-platform">
                Default Platform
              </label>

              <select
                id="default-platform"
                value={settings.preferences.defaultPlatform}
                onChange={(event) =>
                  updatePreference(
                    "defaultPlatform",
                    event.target.value
                  )
                }
              >
                <option value="Instagram">Instagram</option>
                <option value="Facebook">Facebook</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Twitter">Twitter / X</option>
              </select>
            </div>

            <div className="settings-field">
              <label htmlFor="date-format">Date Format</label>

              <select
                id="date-format"
                value={settings.preferences.dateFormat}
                onChange={(event) =>
                  updatePreference("dateFormat", event.target.value)
                }
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>

          <div className="settings-option-row settings-refresh-option">
            <div>
              <h3>Auto Refresh</h3>
              <p>Enable automatic dashboard updates.</p>
            </div>

            <label className="settings-switch">
              <input
                type="checkbox"
                checked={settings.preferences.autoRefresh}
                onChange={() =>
                  updatePreference(
                    "autoRefresh",
                    !settings.preferences.autoRefresh
                  )
                }
                aria-label="Auto Refresh"
              />

              <span className="settings-switch-slider" />
            </label>
          </div>

          <p className="settings-demo-note">
            Dashboard preferences will be connected to other pages
            in a later step.
          </p>
        </section>

        {/* SAVE BUTTON */}

        <div className="settings-save-bar">
          {saved && (
            <span className="settings-save-success">
              <CheckCircle2 size={18} />
              Settings saved successfully!
            </span>
          )}

          <button type="submit" className="settings-save-button">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default Settings;