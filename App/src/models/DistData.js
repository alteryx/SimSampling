/* Reference: http://jstat.github.io/distributions.html */
/* To add more distributions, consult jstat documentation */
const zeroNum = 1e-3
const zeroStep = 0.1
const DistData = {
  distributions: {
    /* Defaults:
        minSpinner: -Infinity
        maxSpinner: Infinity
        discrete: false
    */
    normal: [
      {label: "Mean", paramName: "mean", value: 0, min: -5, max: 5, step: zeroStep},
      {label: "Stdev", paramName: "sd", value: 1, min: 1e-3, max: 2, step: zeroStep, minSpinner: zeroNum}
      ],
    gamma: [
      {label: "Shape", paramName: "shape", value: 1, min: 0, max: 5, step: zeroStep, minSpinner: zeroNum},
      {label: "Scale", paramName: "scale", value: 1, min: 0.1, max: 5, step: zeroStep, minSpinner: zeroNum}
      ],
    lognormal: [
      {label: "Mean", paramName: "meanlog", value: 0, min: -5, max: 5, step: zeroStep},
      {label: "Stdev", paramName: "sdlog", value: 1, min: 0, max: 2, step: zeroStep}
      ],
    pareto: [
      {label: "Shape", paramName: "shape", value: 2, min: zeroNum, max: 5, step: zeroStep, minSpinner: zeroNum},
      {label: "Scale", paramName: "scale", value: 2, min: zeroNum, max: 5, step: zeroStep, minSpinner: zeroNum}
      ],  
    uniform: [
      {label: "Minimum", paramName: "min", value: -1, min: -10, max: 10, step: zeroStep},
      {label: "Maximum", paramName: "max", value: 1, min: -10, max: 10, step: zeroStep}
    ],
    triangular: [
      {label: "Minimum", paramName: "a", value: -1, min: -10, max: 10, step: zeroStep},
      {label: "Maximum", paramName: "b", value: 1, min: -10, max: 10, step: zeroStep},
      {label: "Most Likely", paramName: "c", value: 0, min: -10, max: 10, step: zeroStep}
    ],
    poisson: [
      {label: "Mean", paramName: "lambda", value: 5, min: 0.1, max: 5, step: zeroStep, minSpinner: zeroNum}
    ],
    binomial: [
      {label: "Trials", paramName: "size", value: 10, min: 1, max: 20, step: 1},
      {label: "Probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: zeroStep, minSpinner: 0, maxSpinner: 1}
    ],
    geometric: [
      {label: "Probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: zeroStep, minSpinner: 0, maxSpinner: 1}
    ]
  },
  distribution: 'normal',
};

export default DistData;


