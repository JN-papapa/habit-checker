import React, { useState } from 'react';

const HabitTracker = ({ currentWeek, habits, records, onHabitChange, onRecordChange }) => {
  const [newHabit, setNewHabit] = useState('');

  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays(currentWeek);

  const statuses = ['-', '○', '×', '△'];

  const handleRecordClick = (habitIndex, day) => {
    const currentStatus = records[habitIndex]?.[day] || '-';
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    onRecordChange(habitIndex, day, nextStatus);
  };

  const handleAddHabit = () => {
    if (newHabit.trim() !== '') {
      onHabitChange([...habits, newHabit]);
      setNewHabit('');
    }
  };

  const handleDeleteHabit = (index) => {
    const newHabits = habits.filter((_, i) => i !== index);
    onHabitChange(newHabits);
  };

  return (
    <div className="habit-tracker-container">
      <div className="add-habit-form">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="新しい習慣を入力"
        />
        <button onClick={handleAddHabit}>追加</button>
      </div>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>習慣</th>
              {weekDays.map(day => <th key={day.getDate()}>{day.getDate()}</th>)}
              <th>月間達成数</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, habitIndex) => {
              const weeklyCount = weekDays.reduce((count, day) => {
                return records[habitIndex]?.[day.getDate()] === '○' ? count + 1 : count;
              }, 0);

              return (
                <tr key={habitIndex}>
                  <td className="habit-name">
                    {habit}
                    <button className="delete-habit" onClick={() => handleDeleteHabit(habitIndex)}>×</button>
                  </td>
                  {weekDays.map(day => (
                    <td
                    key={day.getDate()}
                    className={`record-cell status-${(records[habitIndex]?.[day.getDate()] || '-').replace('○', 'ok').replace('×', 'x').replace('△', 'triangle').replace('-', 'dash')}`}
                    onClick={() => handleRecordClick(habitIndex, day.getDate())}
                  >
                    {records[habitIndex]?.[day.getDate()] || '-'}
                  </td>
                  ))}
                  <td className="weekly-count">{weeklyCount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HabitTracker;