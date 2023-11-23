// Schedule.js

import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const Schedule = ({ scheduleData, updateScheduleData, time }) => {
  const { currentWeek, startDate, endDate } = time;

  const daysOfWeek = Object.keys(scheduleData);

  const handleCheckboxChange = (day, intervalId) => {
    const newData = { ...scheduleData };
    newData[day][intervalId].done = !newData[day][intervalId].done;
    updateScheduleData(newData);
  };

  const rowsToShow = 7; // Maximum rows to display

  const exportAsPDF = () => {
    const input = document.getElementById("schedule-table");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save(`schedule-${startDate}-${endDate}` + ".pdf");
    });
  };

  const getTasksDoneCount = (day) => {
    const tasks = scheduleData[day];
    const doneCount = tasks.filter((task) => task.done).length;
    const totalTasks = tasks.filter((task) => task.task && !task.done).length;

    return `${doneCount}/${totalTasks + doneCount}`;
  };
  return (
    <div
      style={{
        padding: "5vh",
        display: "flex",
        flexDirection: "column",
      }}
      className="schedule-container"
    >
      <button className="pdf-btn" onClick={exportAsPDF}>
        Export as PDF
      </button>

      <table className="schedule" id="schedule-table">
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day}>
                {day}
                <br />
                <span id="tasks-done">
                  Task done:{" "}
                  <span id="tasks-done-nmb">{getTasksDoneCount(day)}</span>
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="schedule-body">
          {Array.from({ length: rowsToShow }).map((_, index) => (
            <tr key={`interval-${index}`}>
              {daysOfWeek.map((day) => (
                <td key={`${day}-${index}`}>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={scheduleData[day][index]?.done || false}
                      onChange={() => handleCheckboxChange(day, index)}
                    />
                    <span className="checkbox-custom"></span>
                    <input
                      className={`task-input ${
                        scheduleData[day][index]?.done ? "done" : ""
                      }`}
                      value={scheduleData[day][index]?.task || ""}
                      disabled={scheduleData[day][index]?.done}
                      onChange={(e) =>
                        updateScheduleData({
                          ...scheduleData,
                          [day]: scheduleData[day].map((item, i) =>
                            i === index
                              ? { ...item, task: e.target.value }
                              : item
                          ),
                        })
                      }
                    />
                  </label>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
