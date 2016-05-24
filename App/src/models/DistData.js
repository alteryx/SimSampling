/* Reference: http://jstat.github.io/distributions.html */
/* To add more distributions, consult jstat documentation */
const DistData = {
  distributions: {
    /* Defaults:
        minSpinner: -Infinity
        maxSpinner: Infinity
        discrete: false
    */
    normal: [
      {label: "Mean", paramName: "mean", value: 0, min: -5, max: 5, step: 1},
      {label: "Stdev", paramName: "sd", value: 1, min: 0, max: 2, step: 0.1, minSpinner: 0}
      ],
    gamma: [
      {label: "shape", paramName: "shape", value: 1, min: 0.1, max: 5, step: 0.1, minSpinner: 0.0000001},
      {label: "scale", paramName: "scale", value: 1, min: 0.1, max: 5, step: 0.1, minSpinner: 0.0000001}
      ],
    lognormal: [
      {label: "Mean", paramName: "meanlog", value: 0, min: -5, max: 5, step: 1},
      {label: "Stdev", paramName: "sdlog", value: 1, min: 0, max: 2, step: 0.1, minSpinner: 0}
      ],
    pareto: [
      {label: "scale", paramName: "scale", value: 2, min: 0.1, max: 5, step: 0.1, minSpinner: 0.0000001},
      {label: "shape", paramName: "shape", value: 2, min: 0.1, max: 5, step: 0.1, minSpinner: 0.0000001}
      ],  
    uniform: [
      {label: "min", paramName: "min", value: -1, min: -10, max: 10, step: 1},
      {label: "max", paramName: "max", value: 1, min: -10, max: 10, step: 1}
    ],
    triangular: [
      {label: "min", paramName: "a", value: -1, min: -10, max: 10, step: 1},
      {label: "max", paramName: "b", value: 1, min: -10, max: 10, step: 1},
      {label: "most likely", paramName: "c", value: 0, min: -10, max: 10, step: 1}
    ],
    poisson: [
      {label: "mean", paramName: "lambda", value: 5, min: 0.1, max: 5, step: 0.1, minSpinner: 0.0000001}
    ],
    binomial: [
      {label: "trials", paramName: "size", value: 10, min: 1, max: 20, step: 1, minSpinner: 0, discrete: true},
      {label: "probability", paramName: "prob", value: 0.5, min: 0, max: 1, step: 0.1, minSpinner: 0, maxSpinner: 1}
    ]
  },
  distribution: 'normal',
};

export default DistData;


