import React, { useState, useEffect } from 'react';
import fire from '../../config/fire';
import TaxForm from './Tax/TaxForm';
import TaxTable from './Tax/TaxTable';

const Home = props => {
  const [Tax, setTax] = useState([]);

  function updateTax(tax) {
    setTax([...Tax, tax]);
  }

  const handelLogout = event => {
    fire.auth().signOut();
  };

  const filterUserTax = taxes => {
    const filteredTaxes = [];
    for (let [id, details] of Object.entries(taxes)) {
      console.log(
        'in for>>> ',
        details,
        details.email === localStorage.getItem('email')
      );
      if (details.email === localStorage.getItem('email')) {
        filteredTaxes.push({ id, ...details });
      }
    }
    console.log('in if>>>', filteredTaxes);
    setTax([...filteredTaxes]);
  };
  useEffect(() => {
    const dbRef = fire.database().ref();

    dbRef.child('tax').on('value', snapShot => {
      console.log('in useEffect >>>', snapShot.val());
      filterUserTax(snapShot.val());
    });
  }, []);
  return (
    <div>
      <header>
        <h1>Income Tax Calcuate</h1>
        <label>
          Email: <span>{localStorage.getItem('email')}</span>
        </label>
        <button onClick={handelLogout}>Logout</button>
      </header>
      <div>
        <TaxForm customerTax={Tax} updateTax={updateTax} />
        <TaxTable customerTax={Tax} />
      </div>
    </div>
  );
};

export default Home;
