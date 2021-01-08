import React, { Component, useState, useEffect } from 'react';
import './App.scss';
import fire from '../../../config/fire';
import Home from '../Home';
import Login from '../Login';

export const App = () => {
  const [Tax, setTax] = useState([]);
  const [user, setUser] = useState(null);

  function updateTax(tax) {
    setTax([...Tax, tax]);
  }

  useEffect(() => {
    console.log('in sjbdksad  >. >');
    aurhlistner();
  }, []);

  function aurhlistner() {
    fire.auth().onAuthStateChanged(user => {
      console.log('in authListner>>', user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }

  return <div>{user ? <Home /> : <Login />}</div>;
};
