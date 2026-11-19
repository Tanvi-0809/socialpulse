import { MapPin } from "lucide-react";
import { locationData } from "../../data/audienceData";

function TopLocations() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Top Audience Locations</h3>
          <p>Where your followers are located</p>
        </div>

        <span className="chart-badge">
          <MapPin size={14} /> India
        </span>
      </div>

      <div className="locations-list">
        {locationData.map((location, index) => (
          <div className="location-row" key={location.city}>
            <div className="location-info">
              <span className="location-name">
                {location.city}
              </span>

              <span className="location-percentage">
                {location.percentage}%
              </span>
            </div>

            <div className="location-progress">
              <div
                className="location-progress-fill"
                style={{
                  width: `${location.percentage}%`,
                  background:
                    index === 0
                      ? "#805AD5"
                      : index === 1
                      ? "#E879B9"
                      : "#B8A4ED",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopLocations;