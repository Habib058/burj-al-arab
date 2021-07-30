import React from 'react';
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userInfo } from '../../App';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(userInfo);
    console.log(loggedInUser);
    const [selectedDate, setSelectedDate] = useState({
        checkInDate:new Date(),
        checkOutDate:new Date(),
    });

    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkInDate =date;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date)=>{
        const newDate = {...selectedDate};
        newDate.checkOutDate =date;
        setSelectedDate(newDate);
    };
    const handleBooking =()=>{
        const newBooking ={...loggedInUser,...selectedDate};
        fetch('http://localhost:5000/addBookings',{
            method:'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newBooking)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome {loggedInUser.name}  Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkInDate}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOutDate}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings/>
        </div>
    );
};

export default Book;