import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../Home/Home';
import './Body.css'
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { LoadGame } from '../LoadGame/LoadGame';
import { SelectGame } from '../SelectGame/SelectGame';
import { NewCharacter } from '../NewCharacter/NewCharacter';
import { Stage01 } from '../Stages/Stage01/Stage01';
import { Stage02 } from '../Stages/Stage02/Stage02';


export const Body = () => {
    return (
      <>
        <Routes>
            <Route path='*' element={<Navigate to='/'/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/loadGame' element={<LoadGame/>}/>
            <Route path='/selectGame' element={<SelectGame/>}/>
            <Route path='/newCharacter' element={<NewCharacter/>}/>
            <Route path='/stage01' element={<Stage01/>}/>
            <Route path='/stage02' element={<Stage02/>}/>
        </Routes>
      </>
    );
  };