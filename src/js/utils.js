export const taxBand = {
  '2018': {
    '100000': 0,
    '500000': 10,
    '1000000': 20,
    max: 30
  },
  '2019': {
    '100000': 0,
    '600000': 10,
    '1200000': 20,
    max: 30
  },
  '2020': {
    '100000': 0,
    '1000000': 15,
    max: 25
  }
};

export const deduction = {
  '2018': {
    investment: 100000,
    cess: {
      taxAbove: 500000,
      percentage: 1
    },
    SeniorCitizen: {
      concession: 0
    }
  },
  '2019': {
    investment: 150000,
    cess: {
      taxAbove: 500000,
      percentage: 2
    },
    SeniorCitizen: {
      concession: 50000
    }
  },
  '2020': {
    investment: 200000,
    cess: {
      taxAbove: 500000,
      percentage: 5
    },
    SeniorCitizen: {
      concession: 75000
    }
  }
};

export const numberFormat = (value, currencyDet = {}) =>
  new Intl.NumberFormat('en-IN', currencyDet).format(value);
