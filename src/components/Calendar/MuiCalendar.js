import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CalendarPicker } from '@mui/x-date-pickers';
import { Box, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './_muiCalendar.scss';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
});

const MuiCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          {/*<Typography variant='h6' sx={{ mt: 2 }}>
            Selected Date: {selectedDate ? selectedDate.toDateString() : 'None'}
          </Typography>*/}
          <CalendarPicker
            date={selectedDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            sx={{
              '& .MuiPickersDay-root': {
                color: 'white',
              },
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: 'primary.main',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              },
              '& .MuiCalendarPicker-root': {
                backgroundColor: 'background.paper',
                color: 'text.primary',
              },
            }}
          />
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default MuiCalendar;
