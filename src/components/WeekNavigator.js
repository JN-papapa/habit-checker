import React from 'react';

const WeekNavigator = ({ currentWeek, onWeekChange }) => {
  const getWeekStartDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDay();
    const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(newDate.setDate(diff));
  };

  const startDate = getWeekStartDate(currentWeek);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const goToPreviousWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() - 7);
    onWeekChange(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentWeek);
    newDate.setDate(newDate.getDate() + 7);
    onWeekChange(newDate);
  };

  return (
    <div className="week-navigator">
      <button onClick={goToPreviousWeek}>&lt; 前の週</button>
      <h2>{`${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getFullYear()}年${endDate.getMonth() + 1}月${endDate.getDate()}日`}</h2>
      <button onClick={goToNextWeek}>次の週 &gt;</button>
    </div>
  );
};

export default WeekNavigator;
