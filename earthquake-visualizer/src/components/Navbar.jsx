import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar({
  presetDays,
  setPresetDays,
  customRange,
  setCustomRange,
}) {
  const [theme, setTheme] = useDarkMode();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [startDate, setStartDate] = useState(customRange[0]);
  const [endDate, setEndDate] = useState(customRange[1]);

  // Dropdown options
  const presetOptions = [
    { label: "1 Day", value: 1 },
    { label: "3 Days", value: 3 },
    { label: "7 Days", value: 7 },
    { label: "10 Days", value: 10 },
    { label: "20 Days", value: 20 },
    { label: "30 Days", value: 30 },
  ];

  const handlePreset = (days) => {
    setPresetDays(days);
    setCustomRange([null, null]);
    setStartDate(null);
    setEndDate(null);
    setDropdownOpen(false);
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
      setCustomRange([value, endDate]);
    } else {
      setEndDate(value);
      setCustomRange([startDate, value]);
    }
  };

  return (
    <header className="bg-slate-900 dark:bg-slate-800 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Title */}
        <h1 className="text-xl font-bold">Earthquakes Worldwide</h1>

        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap justify-center">
          {/* Dropdown for Days */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-sm"
            >
              {presetDays} Days ▼
            </button>
            {dropdownOpen && (
              <div className="absolute mt-1 w-32 bg-white text-black rounded-md shadow-lg z-50">
                {presetOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handlePreset(opt.value)}
                    className={`block w-full text-left px-3 py-1 text-sm hover:bg-blue-100 ${
                      presetDays === opt.value ? "bg-blue-200 font-semibold" : ""
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Start Date */}
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange("start", date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* End Date */}
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange("end", date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Right Side: Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-sm"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
