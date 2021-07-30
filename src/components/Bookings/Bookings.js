import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { userInfo } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(userInfo);
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[]);
    return (
        <div>
            <h3>you have: {bookings.length} item</h3>
            {
                bookings.map(data=><li>{data.name} from: {new Date(data.checkInDate).toDateString('dd/MM/yyyy')} To: {new Date(data.checkOutDate).toDateString('dd/MM/yyyy')}</li>)
            }

        </div>
    );
};

export default Bookings;