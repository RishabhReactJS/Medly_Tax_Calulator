import React, { Component } from 'react';
import { taxBand } from '../../utils';
import './TaxForm.css';
import { TaxCalculator } from './TaxCalculator';
import fire from '../../../config/fire';

class TaxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 2018,
      income: 0,
      investment: 0,
      isSenior: false,
      totalTax: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveCalculatedTax = this.saveCalculatedTax.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    if (event.target.type === 'checkbox') {
      this.setState({
        [name]: event.target.checked
      });
      return;
    }
    if (value >= 0) {
      this.setState({
        [name]: +value
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.income <= 0) {
      alert('please update the income');
      return;
    }
    const calTax = TaxCalculator(
      this.state.year,
      this.state.isSenior,
      this.state.income,
      this.state.investment
    );

    this.setState({
      totalTax: calTax
    });
  }

  saveCalculatedTax() {
    if (this.state.income <= 0) {
      alert('please update the income');
      return;
    }
    const dbRef = fire.database().ref();
    if (this.props.customerTax.some(tax => tax.year === this.state.year)) {
      const isUpdate = confirm('Would You like to update the existing data');

      if (isUpdate) {
        const updateId = this.props.customerTax.find(
          tax => tax.year === this.state.year
        ).id;

        dbRef
          .child(`tax/${updateId}`)
          .set({ ...this.state, email: localStorage.getItem('email') }, err => {
            if (err) console.log('in err >>> ', err);
          });
      }
      return;
    }
    dbRef
      .child('tax')
      .push({ ...this.state, email: localStorage.getItem('email') }, err => {
        if (err) console.log('in err >>> ', err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
        <label className="formLabel">
          Select Year for Tax calculation
          <select className="margin-top-left" name="year">
            {Object.keys(taxBand).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <label className="formLabel">
          {' '}
          Senior Citizen
          <input
            className="margin-top-left"
            checked={this.state.isSenior}
            type="checkbox"
            name="isSenior"
          />
        </label>
        <label className="formLabel">
          {' '}
          Please enter Income in INR
          <input
            className="margin-top-left"
            value={this.state.income}
            type="number"
            name="income"
          />
        </label>
        <label className="formLabel">
          Please enter Investment in INR
          <input
            className="margin-top-left"
            value={this.state.investment}
            type="number"
            name="investment"
          />
        </label>
        <label className="formLabel">
          Total Tax in INR
          <input
            className="margin-top-left"
            value={this.state.totalTax}
            type="number"
            name="investment"
            disabled
          />
        </label>
        <button className="margin-top-left button-style" type="submit">
          Calculate
        </button>
        <button
          className="margin-top-left button-style"
          type="button"
          onClick={this.saveCalculatedTax}
        >
          Save
        </button>
      </form>
    );
  }
}

export default TaxForm;
