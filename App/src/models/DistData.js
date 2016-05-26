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
      {label: "Shape", paramName: "shape", value: 1, min: 0, max: 5, step: zeroNum, minSpinner: zeroNum},
      {label: "Scale", paramName: "scale", value: 1, min: 0.1, max: 5, step: zeroNum, minSpinner: zeroNum}
      ],
    lognormal: [
      {label: "Mean", paramName: "meanlog", value: 0, min: -5, max: 5, step: zeroNum},
      {label: "Stdev", paramName: "sdlog", value: 1, min: 0, max: 2, step: zeroNum}
      ],
    pareto: [
      {label: "Shape", paramName: "shape", value: 2, min: zeroNum, max: 5, step: zeroNum, minSpinner: zeroNum},
      {label: "Scale", paramName: "scale", value: 2, min: zeroNum, max: 5, step: zeroNum, minSpinner: zeroNum}
      ],  
    uniform: [
      {label: "Minimum", paramName: "min", value: -1, min: -10, max: 10, step: 1e-2},
      {label: "Maximum", paramName: "max", value: 1, min: -10, max: 10, step: 1e-2}
    ],
    triangular: [
      {label: "Minimum", paramName: "a", value: -1, min: -10, max: 10, step: 1e-2},
      {label: "Maximum", paramName: "b", value: 1, min: -10, max: 10, step: 1e-2},
      {label: "Most Likely", paramName: "c", value: 0, min: -10, max: 10, step: 1e-2}
    ],
    poisson: [
      {label: "Mean", paramName: "lambda", value: 5, min: 0.1, max: 5, step: 1e-2, minSpinner: zeroNum}
    ],
    binomial: [
      {label: "Trials", paramName: "size", value: 10, min: 1, max: 20, step: 1},
      {label: "Probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: 1e-5, minSpinner: 0, maxSpinner: 1}
    ],
    geometric: [
      {label: "Probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: zeroNum, minSpinner: 0, maxSpinner: 1}
    ]
  },
  distribution: 'normal',
};

export default DistData;


