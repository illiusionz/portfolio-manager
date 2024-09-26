import React, { useState } from 'react';
import { Card, Form, Col, Row } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const sectorColors = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#AA00FF',
  '#FF5733',
];

const AssetManagementCard = () => {
  // Initial state with different sectors
  const [sectors, setSectors] = useState({
    Technology: 0,
    Healthcare: 0,
    Finance: 0,
    Energy: 0,
    Consumer: 0,
    Utilities: 0,
  });

  // Calculate total allocation
  const totalAllocation = Object.values(sectors).reduce(
    (acc, value) => acc + parseFloat(value || 0),
    0
  );

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSectors((prevSectors) => ({
      ...prevSectors,
      [name]: value,
    }));
  };

  // Prepare data for Recharts
  const chartData = Object.keys(sectors).map((sector) => ({
    name: sector,
    value: parseFloat(sectors[sector] || 0),
  }));

  return (
    <Card>
      <Card.Header>Asset Management</Card.Header>
      <Card.Body>
        <Row>
          {/* Left Column for Inputs */}
          <Col md={6}>
            <Form>
              {Object.keys(sectors).map((sector, index) => (
                <Form.Group key={index} as={Row} className='mb-3'>
                  <Form.Label column sm={4}>
                    {sector}:
                  </Form.Label>
                  <Col sm={8}>
                    <Form.Control
                      type='number'
                      name={sector}
                      value={sectors[sector]}
                      onChange={handleInputChange}
                      min='0'
                      placeholder={`Enter amount for ${sector}`}
                    />
                  </Col>
                </Form.Group>
              ))}
            </Form>
          </Col>

          {/* Right Column for Donut Chart */}
          <Col md={6}>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={80}
                  fill='#8884d8'
                  label>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={sectorColors[index % sectorColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {totalAllocation > 0 && (
              <div className='text-center mt-3'>
                <strong>Total Allocation: ${totalAllocation.toFixed(2)}</strong>
              </div>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AssetManagementCard;
