require('dotenv').config();

/* eslint-disable camelcase */
const data = {
  space_id: process.env.SPACE_ID,
  name: 'horea-resource12-oct9',
  deployment: {
    id: process.env.DEPLOYMENT_ID,
  },
  decision_optimization: {
    input_data: [
      {
        id: 'customerDemand.csv',
        fields: ['Product', 'Demand'],
        values: [
          ['handSanitizer', 100],
          ['mask', 120],
        ],
      },
      {
        id: 'plants.csv',
        fields: ['Plants', 'Cost', 'Capacity', 'Product'],
        values: [
          [1, 3, 40, 'mask'],
          [2, 2, 30, 'mask'],
          [3, 1, 30, 'handSanitizer'],
          [4, 3, 100, 'handSanitizer'],
          [5, 2, 60, 'mask'],
          [6, 1, 45, 'mask'],
        ],
      },
    ],
    output_data: [
      {
        id: '.*\\.csv',
      },
    ],
  },
};

const reqBody = {};
reqBody.space_id = process.env.SPACE_ID;
reqBody.name = process.env.NAME || 'any-name';
reqBody.deployment = {};
reqBody.deployment.id = process.env.DEPLOYMENT_ID;
reqBody.decision_optimization = {};
reqBody.decision_optimization.input_data = [];
reqBody.decision_optimization.output_data = [];
reqBody.decision_optimization.output_data[0] = {
  id: '.*\\.csv',
};

module.exports.data = data;
module.exports.requestBody = reqBody;
