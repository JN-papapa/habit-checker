import React from 'react';

const Reflection = ({ reflection, onReflectionChange }) => {
  const questions = [
    'できたこと、達成したことは何？',
    '気づいたこと、学んだことは何？',
    'どんな新しいチャレンジを決めたか？',
    'もう一度やり直すとしたらどうする？',
    '目標達成のために、どんな新しいチャレンジをしますか？',
  ];

  const handleChange = (index, value) => {
    const newReflection = [...reflection];
    newReflection[index] = value;
    onReflectionChange(newReflection);
  };

  return (
    <div className="reflection-container">
      <h3>今月の振り返り</h3>
      {questions.map((question, index) => (
        <div key={index} className="reflection-item">
          <label>{question}</label>
          <textarea
            value={reflection[index] || ''}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Reflection;
