import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import MapView from "./components/MapView";

const FEEDS = {
  all_day:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson",
  all_week:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson",
  all_month:
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson",
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default function App() {
  // state
  const [presetDays, setPresetDays] = useState(7); // default = 7 days
  const [customRange, setCustomRange] = useState([null, null]);
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);

  // calculate start & end timestamps
  const { startTs, endTs } = useMemo(() => {
    const now = Date.now();
    if (customRange[0] && customRange[1]) {
      return {
        startTs: customRange[0].getTime(),
        endTs: customRange[1].getTime() + (MS_PER_DAY - 1),
      };
    }
    return { startTs: now - presetDays * MS_PER_DAY, endTs: now };
  }, [customRange, presetDays]);

  // select feed URL (to avoid downloading unnecessary data)
  const selectFeedUrl = () => {
    const days = Math.max(1, Math.ceil((endTs - startTs) / MS_PER_DAY));
    if (days <= 1) return FEEDS.all_day;
    if (days <= 7) return FEEDS.all_week;
    return FEEDS.all_month;
  };

  // fetch earthquake data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = selectFeedUrl();
        const res = await fetch(url);
        const data = await res.json();
        const filtered = (data.features || []).filter((f) => {
          const t = f.properties?.time;
          return t >= startTs && t <= endTs;
        });
        setEarthquakes(filtered);
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [startTs, endTs, presetDays, customRange]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        presetDays={presetDays}
        setPresetDays={setPresetDays}
        customRange={customRange}
        setCustomRange={setCustomRange}
      />
      <MapView earthquakes={earthquakes} loading={loading} />
    </div>
  );
}
