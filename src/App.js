import React, { useState, useEffect } from 'react';
import WeekNavigator from './components/WeekNavigator';
import HabitTracker from './components/HabitTracker';
import Reflection from './components/Reflection';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const [records, setRecords] = useState({});
  const [reflections, setReflections] = useState({});

  const getWeekKey = (date) => {
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
    return `${startDate.getFullYear()}-${startDate.getMonth()}-${startDate.getDate()}`;
  };

  useEffect(() => {
    const storedHabits = localStorage.getItem('habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
    const storedRecords = localStorage.getItem('records');
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
    const storedReflections = localStorage.getItem('reflections');
    if (storedReflections) {
      setReflections(JSON.parse(storedReflections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem('records', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('reflections', JSON.stringify(reflections));
  }, [reflections]);

  const handleWeekChange = (newWeek) => {
    setCurrentWeek(newWeek);
  };

  const handleHabitChange = (newHabits) => {
    setHabits(newHabits);
  };

  const handleRecordChange = (habitIndex, day, status) => {
    const weekKey = getWeekKey(currentWeek);
    const newRecords = { ...records };
    if (!newRecords[weekKey]) {
      newRecords[weekKey] = {};
    }
    if (!newRecords[weekKey][habitIndex]) {
      newRecords[weekKey][habitIndex] = {};
    }
    newRecords[weekKey][habitIndex][day] = status;
    setRecords(newRecords);
  };

  const handleReflectionChange = (newReflection) => {
    const weekKey = getWeekKey(currentWeek);
    setReflections({ ...reflections, [weekKey]: newReflection });
  };

  const weekKey = getWeekKey(currentWeek);
  const currentRecords = records[weekKey] || {};
  const currentReflection = reflections[weekKey] || [];

  return (
    <div className="App">
      <header>
        <h1>習慣チェッカー</h1>
        <WeekNavigator
          currentWeek={currentWeek}
          onWeekChange={handleWeekChange}
        />
      </header>
      <main>
        <HabitTracker
          currentWeek={currentWeek}
          habits={habits}
          records={currentRecords}
          onHabitChange={handleHabitChange}
          onRecordChange={handleRecordChange}
        />
        <Reflection
          reflection={currentReflection}
          onReflectionChange={handleReflectionChange}
        />
      </main>
    </div>
  );
}

export default App;
