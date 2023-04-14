import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import './Body.css'


export const Body = () => {
    return (
      <>
        <Routes>
            <Route path='*' element={<Navigate to='/'/>}/>
            <Route path='/' element={<Home/>}/>
            {/* <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/> */}
        </Routes>
      </>
    );
  };