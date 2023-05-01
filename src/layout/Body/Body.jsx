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
import { Opening } from '../Stages/Opening/Opening';
import { UsersList } from '../UsersList/UsersList';
import { UserDetail } from '../UserDetail/UserDetail';
import { Profile } from '../Profile/Profile';
import { Stage0205 } from '../Stages/Stage02/Stage0205';
import { Stage0301 } from '../Stages/Stage03/Stage0301';
import { Stage0302 } from '../Stages/Stage03/Stage0302';
import { Stage0303 } from '../Stages/Stage03/Stage0303';
import { GameOver } from '../GameOver/GameOver';
import { Stage0401 } from '../Stages/Stage04/Stage0401';
import { Stage0402 } from '../Stages/Stage04/Stage0402';
import { Stage0403 } from '../Stages/Stage04/Stage0403';
import { Stage0501 } from '../Stages/Stage05/Stage0501';
import { Stage0502 } from '../Stages/Stage05/Stage0502';
import { Stage0503 } from '../Stages/Stage05/Stage0503';
import { Stage0601 } from '../Stages/Stage06/Stage0601';
import { Stage0602 } from '../Stages/Stage06/Stage0602';
import { Stage0603 } from '../Stages/Stage06/Stage0603';
import { Stage0701 } from '../Stages/Stage07/Stage0701';
import { Stage0702 } from '../Stages/Stage07/Stage0702';
import { Stage0703 } from '../Stages/Stage07/Stage0703';
import { GameOver1 } from '../GameOver/GameOver1';
import { GameOver2 } from '../GameOver/GameOver2';
import { GameOver3 } from '../GameOver/GameOver3';


export const Body = () => {
    return (
      <>
        <Routes>
            <Route path='*' element={<Navigate to='/'/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/usersList' element={<UsersList/>}/>
            <Route path='/userDetail' element={<UserDetail/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/loadGame' element={<LoadGame/>}/>
            <Route path='/selectGame' element={<SelectGame/>}/>
            <Route path='/newCharacter' element={<NewCharacter/>}/>
            <Route path='/gameOver' element={<GameOver/>}/>
            <Route path='/gameOver1' element={<GameOver1/>}/>
            <Route path='/gameOver2' element={<GameOver2/>}/>
            <Route path='/gameOver3' element={<GameOver3/>}/>
            <Route path='/opening' element={<Opening/>}/>
            <Route path='/stage01' element={<Stage01/>}/>
            <Route path='/stage02' element={<Stage02/>}/>
            <Route path='/stage0205' element={<Stage0205/>}/>
            <Route path='/stage0301' element={<Stage0301/>}/>
            <Route path='/stage0302' element={<Stage0302/>}/>
            <Route path='/stage0303' element={<Stage0303/>}/>
            <Route path='/stage0401' element={<Stage0401/>}/>
            <Route path='/stage0402' element={<Stage0402/>}/>
            <Route path='/stage0403' element={<Stage0403/>}/>
            <Route path='/stage0501' element={<Stage0501/>}/>
            <Route path='/stage0502' element={<Stage0502/>}/>
            <Route path='/stage0503' element={<Stage0503/>}/>
            <Route path='/stage0601' element={<Stage0601/>}/>
            <Route path='/stage0602' element={<Stage0602/>}/>
            <Route path='/stage0603' element={<Stage0603/>}/>
            <Route path='/stage0701' element={<Stage0701/>}/>
            <Route path='/stage0702' element={<Stage0702/>}/>
            <Route path='/stage0703' element={<Stage0703/>}/>
        </Routes>
      </>
    );
  };