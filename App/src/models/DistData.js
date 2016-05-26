/* Reference: http://jstat.github.io/distributions.html */
/* To add more distributions, consult jstat documentation */
const zeroNum = 1e-3
const DistData = {
  distributions: {
    /* Defaults:
        minSpinner: -Infinity
        maxSpinner: Infinity
        discrete: false
    */
    normal: [
      {label: "Mean", paramName: "mean", value: 0, min: -5, max: 5, step: zeroNum},
      {label: "Stdev", paramName: "sd", value: 1, min: 1e-3, max: 2, step: zeroNum, minSpinner: zeroNum}
      ],
    gamma: [
      {label: "shape", paramName: "shape", value: 1, min: 0, max: 5, step: zeroNum, minSpinner: zeroNum},
      {label: "scale", paramName: "scale", value: 1, min: 0.1, max: 5, step: zeroNum, minSpinner: zeroNum}
      ],
    lognormal: [
      {label: "Mean", paramName: "meanlog", value: 0, min: -5, max: 5, step: zeroNum},
      {label: "Stdev", paramName: "sdlog", value: 1, min: 0, max: 2, step: zeroNum}
      ],
    pareto: [
      {label: "scale", paramName: "scale", value: 2, min: zeroNum, max: 5, step: zeroNum, minSpinner: zeroNum},
      {label: "shape", paramName: "shape", value: 2, min: zeroNum, max: 5, step: zeroNum, minSpinner: zeroNum}
      ],  
    uniform: [
      {label: "min", paramName: "min", value: -1, min: -10, max: 10, step: 1e-2},
      {label: "max", paramName: "max", value: 1, min: -10, max: 10, step: 1e-2}
    ],
    triangular: [
      {label: "min", paramName: "a", value: -1, min: -10, max: 10, step: 1e-2},
      {label: "max", paramName: "b", value: 1, min: -10, max: 10, step: 1e-2},
      {label: "most likely", paramName: "c", value: 0, min: -10, max: 10, step: 1e-2}
    ],
    poisson: [
      {label: "mean", paramName: "lambda", value: 5, min: 0.1, max: 5, step: 1e-2, minSpinner: zeroNum}
    ],
    binomial: [
      {label: "trials", paramName: "size", value: 10, min: 1, max: 20, step: 1},
      {label: "probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: 1e-5, minSpinner: 0, maxSpinner: 1}
    ]
  },
  distribution: 'poisson',
};

export default DistData;


