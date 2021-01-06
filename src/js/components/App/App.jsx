import React, { Component, useState } from 'react';
import TaxForm from '../Tax/TaxForm';
import TaxTable from '../Tax/TaxTable';
import './App.css';

export const App = () => {
  const [Tax, setTax] = useState([]);

  function updateTax(tax) {
    setTax([...Tax, tax]);
  }

  return (
    <div>
      <h1>Income Tax Calcuate</h1>
      <TaxForm updateTax={updateTax} />
      <TaxTable customerTax={Tax} />
    </div>
  );
};
