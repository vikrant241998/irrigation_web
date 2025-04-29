import "../styles/Style.css";
import React, { useState, useEffect } from "react";
import InputForm from "./InputForm";
import ScheduleTable from "./ScheduleTable";
import Filters from "./Filters";

const Dashboard = () => {
  const [tableData, setTableData] = useState([]);
  // Filter state manage karo
  const [filter, setFilter] = useState("all");

  // Handle form submission
  const handleFormSubmit = (formData) => {
    const plots = parseInt(formData.numberOfPlots);
    const motors = parseInt(formData.motorsInParallel);
    const runTime = parseInt(formData.runTime);
    const interval = parseInt(formData.cycleInterval);

    const newTableData = [];

    let [hours, minutes] = formData.startTime.split(":").map(Number);
    // Convert start time to total minutes
    let totalMinutes = hours * 60 + minutes;

    for (let i = 0; i < plots; i++) {
      const startTimeFormatted = formatTime(totalMinutes);
      const endMinutes = totalMinutes + runTime;
      const endTimeFormatted = formatTime(endMinutes);

      newTableData.push({
        id: tableData.length + i + 1,
        plot: `D${i + 1}`,
        motor: `M${(i % motors) + 1}`,
        startTime: startTimeFormatted,
        endTime: endTimeFormatted,
        runTime: `${runTime} mins`,
        intervalTime: `${interval} mins`,
        // Set status immediately based on start time
        status: getStatus(totalMinutes, endMinutes),
        // Store start time in minutes
        startTimeInMinutes: totalMinutes,
        // Store end time in minutes
        endTimeInMinutes: totalMinutes + runTime,
      });
      // Update total minutes for the next cycle
      totalMinutes = endMinutes + interval;
    }

    // Add new tasks to the table data
    setTableData((prev) => [...prev, ...newTableData]);
  };

  // Function to determine status based on current time and task start/end times
  const getStatus = (startMinutes, endMinutes) => {
    const currentTime = new Date();
    const currentMinutes =
    // Get current time in minutes
      currentTime.getHours() * 60 + currentTime.getMinutes(); 

    // Check status immediately
    if (currentMinutes < startMinutes) {
      return "Pending"; 
    } else if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
      return "In Progress"; 
    } else {
      return "Done";
    }
  };

 

  const formatTime = (totalMinutes) => {
    let hrs = Math.floor(totalMinutes / 60) % 24;
    let mins = totalMinutes % 60;
    let seconds = 0; 
    return `${hrs.toString().padStart(2, "0")}${mins
      .toString()
      .padStart(2, "0")}${seconds.toString().padStart(2, "0")}`;
  };

  // Handle status change (manually, if needed)
  const handleStatusChange = (id, newStatus) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  // Table ko filter karne ka logic
  const filteredData = tableData.filter((item) => {
    if (filter === "all") return true; 
    return item.status.toLowerCase() === filter; 
  });
  return (
    <div className="dash-container">
      <div className="dash-heading">
        <h1>Irrigation Management System</h1>
        <Filters setFilter={setFilter} />
      </div>

      <div className="dash-wrapper">
        <InputForm onSubmit={handleFormSubmit} />
        <ScheduleTable
          data={filteredData}
          onStatusChange={handleStatusChange} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
