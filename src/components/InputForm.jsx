import React, { useState } from "react";
import TimePicker from 'react-time-picker';


const InputForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    numberOfPlots: "",
    motorsInParallel: "",
    startTime: "",
    runTime: "",
    cycleInterval: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Fields which should accept only positive numbers
    const numericFields = ["numberOfPlots", "motorsInParallel", "runTime", "cycleInterval"];
  
    if (numericFields.includes(name)) {
      // For numeric fields: allow only 0-99
      if (/^\d{0,2}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (value.trim() !== "") {
          setErrors((prev) => ({ ...prev, [name]: "" }));
        }
      }
    } else {
      // For other fields like 'startTime'
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (value.trim() !== "") {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };
  

  const validateForm = () => {
    const formErrors = {};
    if (!formData.numberOfPlots) formErrors.numberOfPlots = "Number of Plots is required";
    if (!formData.motorsInParallel) formErrors.motorsInParallel = "Motors in Parallel is required";
    if (!formData.startTime) formErrors.startTime = "Start Time is required";
    if (!formData.runTime) formErrors.runTime = "Run Time is required";
    if (!formData.cycleInterval) formErrors.cycleInterval = "Cycle Interval is required";

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      onSubmit(formData);
      setFormData({
        numberOfPlots: "",
        motorsInParallel: "",
        startTime: "",
        runTime: "",
        cycleInterval: "",
      });
    }
  };

  return (
    <div className="input-container">
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <div className="input-row" style={{ marginBottom: "20px" }}>
          <div className="input-wrap">
            <label>Number of Plots</label>
            <input
              type="text"
              name="numberOfPlots"
              value={formData.numberOfPlots}
              onChange={handleChange}
              // maxLength={2} 
            />
            {errors.numberOfPlots && <span className="error">{errors.numberOfPlots}</span>}
          </div>

          <div className="input-wrap">
            <label>Motors in Parallel</label>
            <input
              type="text"
              name="motorsInParallel"
              value={formData.motorsInParallel}
              onChange={handleChange}
              // maxLength={2} 
            />
            {errors.motorsInParallel && <span className="error">{errors.motorsInParallel}</span>}
          </div>

          <div className="input-wrap">
            <label>Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            {errors.startTime && <span className="error">{errors.startTime}</span>}
          </div>
        </div>

        <div className="input-row">
          <div className="input-wrap">
            <label>Run Time (Minutes)</label>
            <input
              type="text"
              name="runTime"
              value={formData.runTime}
              onChange={handleChange}
              // maxLength={2} 
            />
            {errors.runTime && <span className="error">{errors.runTime}</span>}
          </div>

          <div className="input-wrap">
            <label>Cycle Interval (Minutes)</label>
            <input
              type="text"
              name="cycleInterval"
              value={formData.cycleInterval}
              onChange={handleChange}
              // maxLength={2} 
            />
            {errors.cycleInterval && <span className="error">{errors.cycleInterval}</span>}
          </div>

          <div className="input-wrap">
            <button type="submit">Add Record</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
