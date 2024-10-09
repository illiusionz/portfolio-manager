import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TextField,
  MenuItem,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  InputLabel,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { formatCurrency } from '../../utils/format';
import './InvestmentCalculator.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const InvestmentCalculator = () => {
  const [startingAmount, setStartingAmount] = useState(5000);
  const [additionalContribution, setAdditionalContribution] = useState(100);
  const [contributionFrequency, setContributionFrequency] = useState('Weekly');
  const [rateOfReturn, setRateOfReturn] = useState(10);
  const [yearsToGrow, setYearsToGrow] = useState(10);
  const [investmentData, setInvestmentData] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

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

    // Start from the current year and iterate over the number of years to grow
    for (let year = 0; year < yearsToGrow; year++) {
      const interestEarned = currentAmount * rate;
      totalInterest += interestEarned;
      currentAmount += annualContribution + interestEarned;

      data.push({
        year: new Date().getFullYear() + year, // Starts from the current year (e.g., 2024)
        startingAmount: startingAmount,
        annualContribution: annualContribution,
        totalContributions: annualContribution * (year + 1),
        interestEarned: interestEarned.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        endBalance: currentAmount.toFixed(2),
      });
    }

    setInvestmentData(data);
    setTotalValue(currentAmount.toFixed(2));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  // Adjust the barData to include startingAmount as a stackable field
  const barData = investmentData.map((item) => ({
    year: item.year,
    startingAmount: startingAmount,
    totalContributions: item.totalContributions,
    interestEarned: item.totalInterest,
    endBalance: item.endBalance, // Add endBalance here
  }));

  // Pie chart data includes startingAmount as well
  const pieData = [
    { name: 'Starting Amount', value: startingAmount },
    {
      name: 'Total Contributions',
      value:
        additionalContribution *
        contributionFrequencyMap[contributionFrequency] *
        yearsToGrow,
    },
    {
      name: 'Total Interest Earned',
      value: parseFloat(
        (
          totalValue -
          startingAmount -
          additionalContribution *
            contributionFrequencyMap[contributionFrequency] *
            yearsToGrow
        ).toFixed(2)
      ), // Ensure we round it to two decimal places
    },
  ];

  // Custom Tooltip component for the BarChart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: '#fff',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            fontSize: '14px',
            minWidth: '250px', // Ensure enough space for alignment
          }}>
          <p
            className='label'
            style={{ marginBottom: '5px' }}>{`In the year ${label},`}</p>

          {/* Interest Earned */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0',
            }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#FFBB28',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              />
              Total Interest Earned
            </span>
            <span>{formatCurrency(data.interestEarned)}</span>
          </div>

          {/* Total Contributions */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0',
            }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#00C49F',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              />
              Total Contributions
            </span>
            <span>{formatCurrency(data.totalContributions)}</span>
          </div>

          {/* Starting Amount */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0',
            }}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#0088FE',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              />
              Starting Amount
            </span>
            <span>{formatCurrency(data.startingAmount)}</span>
          </div>

          {/* End Balance */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '3px 0',
              fontWeight: 'bold',
            }}>
            <span>End Balance</span>
            <span>{formatCurrency(data.endBalance)}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  // Custom Tooltip component for the PieChart
  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];

      return (
        <div
          className='custom-tooltip'
          style={{
            backgroundColor: '#fff',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}>
          <p
            className='label'
            style={{ fontWeight: 'bold' }}>{`${data.name}`}</p>
          <p style={{ color: data.fill }}>{`${formatCurrency(data.value)}`}</p>
        </div>
      );
    }

    return null;
  };

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
                onChange={(e) => setContributionFrequency(e.target.value)}>
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
      <Card>
        <CardContent>
          {/* Displaying the Investment Result */}
          <Typography variant='h5' align='center' gutterBottom>
            This investment will be worth:{' '}
            <span style={{ color: '#1976D2' }}>
              {formatCurrency(totalValue)}
            </span>
          </Typography>

          {/* Charts Section */}
          <Grid container spacing={4}>
            {/* Investment Growth Over Time (Bar Chart) */}
            <Grid item xs={12} md={7}>
              <Typography variant='h5' align='' gutterBottom>
                Investment Growth Over Time
              </Typography>
              <ResponsiveContainer width='100%' height={450}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='year' />
                  <YAxis />
                  <RechartsTooltip content={<CustomTooltip />} />
                  <Bar dataKey='startingAmount' stackId='a' fill='#0088FE' />
                  <Bar
                    dataKey='totalContributions'
                    stackId='a'
                    fill='#00C49F'
                  />
                  <Bar dataKey='interestEarned' stackId='a' fill='#FFBB28' />
                </BarChart>
              </ResponsiveContainer>
            </Grid>

            {/* Investment Balance at Final Year (Pie Chart) */}
            <Grid
              item
              xs={12}
              md={5}
              container
              direction='column'
              alignItems='center'
              justifyContent='center'>
              <Typography variant='h5' align='center' gutterBottom>
                Investment Balance at Year
              </Typography>
              <Typography variant='h5' align='center' gutterBottom>
                {investmentData.length
                  ? investmentData[investmentData.length - 1].year
                  : ''}
              </Typography>
              <ResponsiveContainer width='100%' height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey='value'
                    nameKey='name'
                    cx='50%'
                    cy='50%'
                    outerRadius={120}
                    fill='#82ca9d'>
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomPieTooltip />} />
                  <Legend
                    layout='vertical'
                    align='center'
                    verticalAlign='bottom'
                    formatter={(value, entry) => {
                      return (
                        <span>
                          <span style={{ paddingLeft: 10 }}>{value}</span>
                          <span style={{ float: 'right', paddingLeft: 20 }}>
                            {formatCurrency(entry.payload.value)}
                          </span>
                        </span>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Grid>
          </Grid>

          <TableContainer style={{ marginTop: '5rem' }}>
            <Table
              sx={{ minWidth: 650 }}
              size='small'
              aria-label='a dense table'>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Year</StyledTableCell>
                  <StyledTableCell>Starting Amount</StyledTableCell>
                  <StyledTableCell>Annual Contribution</StyledTableCell>
                  <StyledTableCell>Total Contributions</StyledTableCell>
                  <StyledTableCell>Interest Earned</StyledTableCell>
                  <StyledTableCell>Total Interest Earned</StyledTableCell>
                  <StyledTableCell>End Balance</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {investmentData.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell>{row.year}</StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.startingAmount)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.annualContribution)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.totalContributions)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.interestEarned)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.totalInterest)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatCurrency(row.endBalance)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentCalculator;
