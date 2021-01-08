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
    <div className="home-component">
      <header>
        <span className="home-heading">Income Tax Calcuate</span>
        <span className="left-container">
          <label className="margin-left">
            Email: <span>{localStorage.getItem('email')}</span>
          </label>
          <button className="margin-left logout-button" onClick={handelLogout}>
            Logout
          </button>
        </span>
      </header>
      <section className="home-section1">
        <TaxForm customerTax={Tax} updateTax={updateTax} />
        <TaxTable customerTax={Tax} />
      </section>
    </div>
  );
};

export default Home;
