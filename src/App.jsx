// App.js
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Schedule from "./components/Schedule";
import StorageManager from "./components/StorageManager";
import "./App.css"; // Include your styles
import moment from "moment";
const App = () => {
  const currentWeek = moment().week();
  const startDate = moment().startOf("week").format("DD/MM/YYYY");
  const endDate = moment().endOf("week").format("DD/MM/YYYY");

  const time = {
    currentWeek,
    startDate,
    endDate,
  };
  const getDefaultSchedule = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Generate time intervals from 9am to 10pm with default one-hour intervals
    const intervals = [];
    let hour = 9;
    let minute = "00";

    while (!(hour === 22 && minute === "00")) {
      intervals.push(`${hour.toString().padStart(2, "0")}:${minute}`);
      minute = minute === "00" ? "30" : "00";
      if (minute === "00") hour++;
    }

    // Generate default schedule structure with intervals for each day
    const defaultSchedule = {};
    daysOfWeek.forEach((day) => {
      defaultSchedule[day] = intervals.map((interval, index) => ({
        id: index + 1,
        time: interval,
        tasks: [],
      }));
    });

    return defaultSchedule;
  };
  const [scheduleData, setScheduleData] = useState(
    StorageManager.loadData() || getDefaultSchedule()
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    StorageManager.saveData(scheduleData);
  }, [scheduleData]);

  const updateScheduleData = (newData) => {
    setScheduleData(newData);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Header time={time} />
      <Schedule
        scheduleData={scheduleData}
        updateScheduleData={updateScheduleData}
        time={time}
      />
      {/* Render other components like Task if needed */}
    </div>
  );
};

export default App;
