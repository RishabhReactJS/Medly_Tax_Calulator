import React from 'react';
import { numberFormat } from '../../utils';
import './TaxTable.css';

const currencyDet = {
  style: 'currency',
  currency: 'INR'
};

const TaxTable = ({ customerTax }) => {
  return (
    <table className="TableContainer">
      <thead>
        <tr>
          <th>Year</th>
          <th>Income</th>
          <th>Investment</th>
          <th>Total Tax</th>
        </tr>
      </thead>
      <tbody>
        {customerTax.map(tax => (
          <tr key={tax.id}>
            <td>{tax.year}</td>
            <td>{numberFormat(tax.income, currencyDet)}</td>
            <td>{numberFormat(tax.investment, currencyDet)}</td>
            <td>{numberFormat(tax.totalTax, currencyDet)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaxTable;
<table></table>;
