import React, { useState } from 'react';
import './Style/DatePicker.css';


const DatePicker = () => {
  // set initial dates to be shown in scroll bar
  const [dates, setDates] = useState([
    'Mar 1',
    'Mar 2',
    'Mar 3',
    'Mar 4',
    'Mar 5',
  ]);

  // function to handle click on arrow buttons
  const handleArrowClick = (direction) => {
    // calculate new index of first date to be shown in scroll bar based on direction
    const firstIndex =
      direction === 'left' ? Math.max(0, dates[0] - 1) : dates[0] + 1;
    // generate new array of dates to be shown in scroll bar
    const newDates = [
      `March ${firstIndex}`,
      `March ${firstIndex + 1}`,
      `March ${firstIndex + 2}`,
      `March ${firstIndex + 3}`,
      `March ${firstIndex + 4}`,
    ];
    setDates(newDates);
  };

  return (
    <div className="datePickerContainer">
      {/* left arrow button */}
      <button
        className="arrowButton leftArrowButton"
        onClick={() => handleArrowClick('left')}
      >
        {'<'}
      </button>
      {/* scroll bar */}
      <div className="datePickerScrollBar">
        {dates.map((date, index) => (
          <div key={index} className="datePickerItem">
            {date}
          </div>
        ))}
      </div>
      {/* right arrow button */}
      <button
        className="arrowButton rightArrowButton"
        onClick={() => handleArrowClick('right')}
      >
        {'>'}
      </button>
    </div>
  );
};

export default DatePicker;
