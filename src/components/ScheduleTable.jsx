import React from "react";

const ScheduleTable = ({ data }) => {

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "done":
        return { backgroundColor: "#4CAF50", color: "white" }; // Green for "Done"
      case "pending":
        return { backgroundColor: "#F44336", color: "white" }; // Red for "Pending"
      case "in progress":
        return { backgroundColor: "#FF9800", color: "white" }; // Orange for "In Progress"
      default:
        return { backgroundColor: "#e0e0e0", color: "black" }; // Grey for unknown status
    }
  };
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <div className="table-header">
          <div className="table-tr">
            <div className="table-tr-wrap">S No.</div>
            <div className="table-tr-wrap">Plot</div>
            <div className="table-tr-wrap">Motor</div>
            <div className="table-tr-wrap">Start Time</div>
            <div className="table-tr-wrap">End Time</div>
            <div className="table-tr-wrap">Run Time</div>
            <div className="table-tr-wrap">Interval Time</div>
            <div className="table-tr-wrap">Status</div>
          </div>
        </div>

        <div className="table-body">
          {data.map((row, index) => (
            <div key={row.id} className="table-row">
              <div className="table-tr-wrap">{index + 1}</div>
              <div className="table-tr-wrap">{row.plot}</div>
              <div className="table-tr-wrap">{row.motor}</div>
              <div className="table-tr-wrap">{row.startTime}</div>
              <div className="table-tr-wrap">{row.endTime}</div>
              <div className="table-tr-wrap">{row.runTime}</div>
              <div className="table-tr-wrap">{row.intervalTime}</div>
              <div
                className="table-tr-wrap"
                style={getStatusStyle(row.status)} 
              >
                {row.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleTable;
