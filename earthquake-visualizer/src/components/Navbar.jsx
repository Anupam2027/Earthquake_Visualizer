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
  const [menuOpen, setMenuOpen] = useState(false);

  const [startDate, setStartDate] = useState(customRange[0]);
  const [endDate, setEndDate] = useState(customRange[1]);

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
    setMenuOpen(false); // 👈 auto close hamburger after selecting
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
      setCustomRange([value, endDate]);
    } else {
      setEndDate(value);
      setCustomRange([startDate, value]);
    }
    setMenuOpen(false); // 👈 close after picking date
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    setMenuOpen(false); // 👈 close after theme toggle
  };

  return (
    <header className="bg-slate-900 dark:bg-slate-800 text-white shadow relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg md:text-xl font-bold">🌍 Earthquakes Worldwide</h1>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Days Dropdown */}
          <div className="relative z-[2000]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-sm w-28 text-center"
            >
              {presetDays} Days ▼
            </button>
            {dropdownOpen && (
              <div className="absolute mt-1 w-32 bg-white text-black rounded-md shadow-lg z-[2000]">
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

          {/* Date Pickers */}
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange("start", date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange("end", date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black w-36 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-sm"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2 bg-slate-700 rounded-md"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 bg-slate-800">
          {/* Days Dropdown */}
          <div className="relative z-[2000]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded-md text-sm w-full text-left"
            >
              {presetDays} Days ▼
            </button>
            {dropdownOpen && (
              <div className="absolute mt-1 w-full bg-white text-black rounded-md shadow-lg z-[2000]">
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

          {/* Date Pickers */}
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDateChange("start", date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => handleDateChange("end", date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
            className="px-3 py-1 rounded-md text-sm bg-white text-black w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-sm w-full"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      )}
    </header>
  );
}
