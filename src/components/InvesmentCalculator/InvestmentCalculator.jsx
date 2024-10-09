import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import {
  TextField,
  MenuItem,
  InputLabel,
  Grid,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';

import Select, { SelectChangeEvent } from '@mui/material/Select';

import './InvestmentCalculator.scss'; // Use SCSS if necessary for additional customization

const InvestmentCalculator = () => {
  const [startingAmount, setStartingAmount] = useState(5000);
  const [additionalContribution, setAdditionalContribution] = useState(100);
  const [contributionFrequency, setContributionFrequency] = useState('Weekly');
  const [rateOfReturn, setRateOfReturn] = useState(10);
  const [yearsToGrow, setYearsToGrow] = useState(10);

  const [investmentData, setInvestmentData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setContributionFrequency(event.target.value);
  };

  const contributionFrequencyMap = {
    Weekly: 52,
    Monthly: 12,
    Yearly: 1,
  };

  useEffect(() => {
    calculateInvestment();
  }, [
    startingAmount,
    additionalContribution,
    rateOfReturn,
    yearsToGrow,
    contributionFrequency,
  ]);

  const calculateInvestment = () => {
    let data = [];
    let totalInterest = 0;
    let currentAmount = startingAmount;
    const frequency = contributionFrequencyMap[contributionFrequency];
    const annualContribution = additionalContribution * frequency;
    const rate = rateOfReturn / 100;

    for (let year = 1; year <= yearsToGrow; year++) {
      const interestEarned = currentAmount * rate;
      totalInterest += interestEarned;
      currentAmount += annualContribution + interestEarned;

      data.push({
        year: new Date().getFullYear() + year,
        startingAmount: startingAmount,
        annualContribution: annualContribution,
        totalContributions: annualContribution * year,
        interestEarned: interestEarned.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        endBalance: currentAmount.toFixed(2),
      });
    }

    setInvestmentData(data);
    setTotalValue(currentAmount.toFixed(2));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  const barData = investmentData.map((item) => ({
    year: item.year,
    totalContributions: item.totalContributions,
    interestEarned: item.totalInterest,
  }));

  const pieData = [
    { name: 'Starting Amount', value: startingAmount },
    {
      name: 'Total Contributions',
      value:
        additionalContribution *
        contributionFrequencyMap[contributionFrequency] *
        yearsToGrow,
    },
    { name: 'Total Interest Earned', value: totalValue - startingAmount },
  ];

  return (
    <div className='investment-calculator'>
      <Typography variant='h4' align='center' gutterBottom>
        Investment Return & Growth Calculator
      </Typography>

      {/* Inputs Section */}
      <Card style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label='Starting Amount'
              type='number'
              value={startingAmount}
              onChange={(e) => setStartingAmount(parseFloat(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <TextField
              fullWidth
              label='Additional Contribution'
              type='number'
              value={additionalContribution}
              onChange={(e) =>
                setAdditionalContribution(parseFloat(e.target.value))
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-helper-label'>
                Contribution Frequency
              </InputLabel>

              <Select
                fullWidth
                labelId='demo-simple-select-helper-label'
                label='Contribution Frequency'
                value={contributionFrequency}
                onChange={handleChange}>
                <MenuItem value='Weekly'>Weekly</MenuItem>
                <MenuItem value='Monthly'>Monthly</MenuItem>
                <MenuItem value='Yearly'>Yearly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label='Rate of Return (%)'
              type='number'
              value={rateOfReturn}
              onChange={(e) => setRateOfReturn(parseFloat(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label='Years to Grow'
              type='number'
              value={yearsToGrow}
              onChange={(e) => setYearsToGrow(parseFloat(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </Card>

      {/* Displaying the Investment Result */}
      <Typography variant='h5' align='center' gutterBottom>
        This investment will be worth:{' '}
        <span style={{ color: '#1976D2' }}>${totalValue}</span>
      </Typography>

      {/* Charts Section */}
      <Grid container spacing={4}>
        {/* Investment Growth Over Time (Bar Chart) */}
        <Grid item xs={12} md={7}>
          <BarChart width={600} height={300} data={barData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='year' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='totalContributions' fill='#00C49F' />
            <Bar dataKey='interestEarned' fill='#FFBB28' />
          </BarChart>
        </Grid>

        {/* Investment Balance at Final Year (Pie Chart) */}
        <Grid item xs={12} md={5}>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              label={({ name, value }) => `${name}: $${value}`}
              outerRadius={150}
              fill='#8884d8'
              dataKey='value'>
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Grid>
      </Grid>

      {/* Investment Table */}
      <Card style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Year</TableCell>
              <TableCell>Starting Amount</TableCell>
              <TableCell>Annual Contribution</TableCell>
              <TableCell>Total Contributions</TableCell>
              <TableCell>Interest Earned</TableCell>
              <TableCell>Total Interest Earned</TableCell>
              <TableCell>End Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {investmentData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.year}</TableCell>
                <TableCell>${row.startingAmount}</TableCell>
                <TableCell>${row.annualContribution}</TableCell>
                <TableCell>${row.totalContributions}</TableCell>
                <TableCell>${row.interestEarned}</TableCell>
                <TableCell>${row.totalInterest}</TableCell>
                <TableCell>${row.endBalance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
