import React, { useState } from 'react';
import { formatNumberWithCommas } from '../../utils/format';
import './AssetManagementCalculator.css';

const AssetManagementCalculator = () => {
  const [capital, setCapital] = useState('');
  const [sectors, setSectors] = useState([
    { name: '', allocation: '', investments: '', returnRate: '' },
  ]);
  const [results, setResults] = useState(null);

  const handleSectorChange = (index, event) => {
    const values = [...sectors];
    values[index][event.target.name] = event.target.value;
    setSectors(values);
  };

  const handleAddSector = () => {
    setSectors([
      ...sectors,
      { name: '', allocation: '', investments: '', returnRate: '' },
    ]);
  };

  const handleRemoveSector = (index) => {
    const values = [...sectors];
    values.splice(index, 1);
    setSectors(values);
  };

  const handleCalculate = () => {
    const totalCapital = parseFloat(capital.replace(/,/g, ''));
    if (isNaN(totalCapital)) {
      setResults('Please enter a valid capital amount');
      return;
    }

    const sectorSummaries = sectors.map((sector) => {
      const allocation = parseFloat(sector.allocation.replace(/,/g, ''));
      const investments = parseFloat(sector.investments.replace(/,/g, ''));
      const returnRate = parseFloat(sector.returnRate.replace(/,/g, ''));
      const sectorCapital = (allocation / 100) * totalCapital;
      const totalReturn = sectorCapital * (returnRate / 100);

      return {
        ...sector,
        sectorCapital: formatNumberWithCommas(sectorCapital.toFixed(2)),
        totalReturn: formatNumberWithCommas(totalReturn.toFixed(2)),
      };
    });

    setResults(sectorSummaries);
  };

  return (
    <div className='card'>
      <div className='card-header'>
        <h5 className='card-title mb-0'>Asset Management Calculator</h5>
      </div>
      <div className='card-body'>
        <div className='form-group'>
          <label>Total Capital:</label>
          <input
            type='text'
            className='form-control'
            value={capital}
            onChange={(e) =>
              setCapital(
                formatNumberWithCommas(e.target.value.replace(/,/g, ''))
              )
            }
          />
        </div>
        {sectors.map((sector, index) => (
          <div key={index} className='sector'>
            <div className='form-group'>
              <label>Sector Name:</label>
              <input
                type='text'
                className='form-control'
                name='name'
                value={sector.name}
                onChange={(e) => handleSectorChange(index, e)}
              />
            </div>
            <div className='form-group'>
              <label>Allocation (%):</label>
              <input
                type='text'
                className='form-control'
                name='allocation'
                value={sector.allocation}
                onChange={(e) => handleSectorChange(index, e)}
              />
            </div>
            <div className='form-group'>
              <label>Investments ($):</label>
              <input
                type='text'
                className='form-control'
                name='investments'
                value={sector.investments}
                onChange={(e) => handleSectorChange(index, e)}
              />
            </div>
            <div className='form-group'>
              <label>Expected Return Rate (%):</label>
              <input
                type='text'
                className='form-control'
                name='returnRate'
                value={sector.returnRate}
                onChange={(e) => handleSectorChange(index, e)}
              />
            </div>
            <button
              className='btn btn-danger'
              onClick={() => handleRemoveSector(index)}>
              Remove Sector
            </button>
          </div>
        ))}
        <button className='btn btn-secondary' onClick={handleAddSector}>
          Add Sector
        </button>
        <button className='btn btn-primary' onClick={handleCalculate}>
          Calculate
        </button>
        {results && (
          <div className='results'>
            {results.map((result, index) => (
              <div key={index} className='result'>
                <h5>{result.name}</h5>
                <p>Sector Capital: ${result.sectorCapital}</p>
                <p>Total Return: ${result.totalReturn}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetManagementCalculator;
