import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import FrontContainer from './components/FrontContainer';
import Form from './components/Form';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <FrontContainer></FrontContainer>
      <Form></Form>
    </>
  );
}

export default App;
