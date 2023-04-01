import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './App.css';

function WeeklySchedule() {
  const [startDate, setStartDate] = useState(moment());
  const [timeZone, setTimeZone] = useState('UTC+0');
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    loadWeekDays(startDate, timeZone);
  }, [startDate, timeZone]);

  const loadWeekDays = (date, timezone) => {
    const startOfWeek = moment(date).startOf('week').tz(timezone);
    const endOfWeek = moment(date).endOf('week').tz(timezone);
    const days = [];
    for (let i = 0; i <= 4; i++) {
      const day = moment(startOfWeek).add(i, 'days');
      const dayObj = {
        dayName: day.format('dddd'),
        date: day.format('YYYY-MM-DD'),
        startTime: moment.utc('08:00', 'HH:mm').tz(timezone).format('h:mm A'),
        endTime: moment.utc('23:00', 'HH:mm').tz(timezone).format('h:mm A'),
        isChecked: false,
      };
      days.push(dayObj);
    }
    setWeekDays(days);
  };

  const handlePreviousWeek = () => {
    const previousWeek = moment(startDate).subtract(7, 'days');
    setStartDate(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = moment(startDate).add(7, 'days');
    setStartDate(nextWeek);
  };

  const handleTimeZoneChange = (e) => {
    const newTimeZone = e.target.value;
    setTimeZone(newTimeZone);
  };

  const handleCheckBoxChange = (e, index) => {
    const newWeekDays = [...weekDays];
    newWeekDays[index].isChecked = e.target.checked;
    setWeekDays(newWeekDays);
  };

  return (
    <div className="App">
      <div className="header">
        <button onClick={handlePreviousWeek}>Previous</button>
        <span>{startDate.format('MMMM Do YYYY')}</span>
        <button onClick={handleNextWeek}>Next</button>
        <select value={timeZone} onChange={handleTimeZoneChange}>
          <option value="UTC+0">UTC+0</option>
          <option value="America/New_York">America/New_York</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Available?</th>
          </tr>
        </thead>
        <tbody>
          {weekDays.map((day, index) => (
            <tr key={index}>
              <td>{day.dayName}</td>
              <td>{day.date}</td>
              <td>{day.startTime}</td>
              <td>{day.endTime}</td>
              <td>
                <input
                  type="checkbox"
                  checked={day.isChecked}
                  onChange={(e) => handleCheckBoxChange(e, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeeklySchedule;