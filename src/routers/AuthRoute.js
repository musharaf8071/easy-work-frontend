import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from '../components/SignUp';

function AuthRoute() {
 return (
  <Routes>
   <Route path="signup" element={<SignUp />} />
  </Routes>
 );
}

export default AuthRoute;
