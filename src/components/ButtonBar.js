// src/components/ButtonBar.js
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './ButtonBar.css';

function ButtonBar({ onRangeChange, currentRange }) {
  const [minutesOpen, setMinutesOpen] = useState(true);
  const [hoursOpen, setHoursOpen] = useState(true);
  const [daysOpen, setDaysOpen] = useState(true);

  const timeFrames = [
    { label: '1 minute', value: '1m', type: 'minutes' },
    { label: '5 minutes', value: '5m', type: 'minutes' },
    { label: '15 minutes', value: '15m', type: 'minutes' },
    { label: '30 minutes', value: '30m', type: 'minutes' },
    { label: '45 minutes', value: '45m', type: 'minutes' },
    { label: '1 hour', value: '1h', type: 'hours' },
    { label: '2 hours', value: '2h', type: 'hours' },
    { label: '3 hours', value: '3h', type: 'hours' },
    { label: '4 hours', value: '4h', type: 'hours' },
    { label: '1 day', value: '1d', type: 'days' },
    { label: '5 days', value: '5d', type: 'days' },
    { label: '1 week', value: '1w', type: 'days' },
    { label: '1 month', value: '1M', type: 'days' },
  ];

  useEffect(() => {
    const savedRange = localStorage.getItem('currentRange');
    if (savedRange && savedRange !== currentRange) {
      onRangeChange(savedRange);
    }
  }, [currentRange, onRangeChange]);

  const handleRangeChange = (value) => {
    onRangeChange(value);
    localStorage.setItem('currentRange', value);
  };

  const toggleSection = (section) => {
    if (section === 'minutes') setMinutesOpen(!minutesOpen);
    if (section === 'hours') setHoursOpen(!hoursOpen);
    if (section === 'days') setDaysOpen(!daysOpen);
  };

  return (
    <div className='button-bar'>
      <DropdownButton id='dropdown-basic-button' title={currentRange}>
        <Dropdown.Header onClick={() => toggleSection('minutes')}>
          MINUTES
        </Dropdown.Header>
        {minutesOpen &&
          timeFrames
            .filter((tf) => tf.type === 'minutes')
            .map((timeFrame) => (
              <Dropdown.Item
                key={timeFrame.value}
                onClick={() => handleRangeChange(timeFrame.value)}
                active={currentRange === timeFrame.value}>
                {timeFrame.label}
              </Dropdown.Item>
            ))}
        <Dropdown.Header onClick={() => toggleSection('hours')}>
          HOURS
        </Dropdown.Header>
        {hoursOpen &&
          timeFrames
            .filter((tf) => tf.type === 'hours')
            .map((timeFrame) => (
              <Dropdown.Item
                key={timeFrame.value}
                onClick={() => handleRangeChange(timeFrame.value)}
                active={currentRange === timeFrame.value}>
                {timeFrame.label}
              </Dropdown.Item>
            ))}
        <Dropdown.Header onClick={() => toggleSection('days')}>
          DAYS
        </Dropdown.Header>
        {daysOpen &&
          timeFrames
            .filter((tf) => tf.type === 'days')
            .map((timeFrame) => (
              <Dropdown.Item
                key={timeFrame.value}
                onClick={() => handleRangeChange(timeFrame.value)}
                active={currentRange === timeFrame.value}>
                {timeFrame.label}
              </Dropdown.Item>
            ))}
      </DropdownButton>
    </div>
  );
}

export default ButtonBar;
