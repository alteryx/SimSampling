/* Reference: http://jstat.github.io/distributions.html */
/* To add more distributions, consult jstat documentation */
const DistData = {
  distributions: {
    normal: [
      {label: "Mean", value: 0, min: -5, max: 5, step: 1},
      {label: "Stdev", value: 1, min: 0, max: 1, step: 0.1}
      ],
    lognormal: [
      {label: "Mean", value: 0, min: -5, max: 5, step: 1},
      {label: "Stdev", value: 0.25, min: 0, max: 1, step: 0.1}
      ],
    exponential: [
      {label: "Rate", value: 1, min: 0, max: 5, step: 1},
      ],
    uniform: [
      {label: "a", value: 0, min: -5, max: 5, step: 1},
      {label: "b", value: 1, min: -5, max: 5, step: 1}
      ],
    gamma: [
      {label: "a", value: 1, min: 0, max: 5, step: 1},
      {label: "b", value: 1, min: 0, max: 5, step: 1}
      ],
    beta: [
      {label: "alpha", value: 2, min: 0, max: 5, step: 0.2},
      {label: "beta", value: 5, min: 0, max: 5, step: 0.2}
      ],
    pareto: [
      {label: "scale", value: 2, min: 0, max: 5, step: 0.1},
      {label: "shape", value: 2, min: 0, max: 5, step: 0.1}
      ],
    binomial: [
      {label: "n", value: 10, min: 1, max: 20, step: 1},
      {label: "p", value: 0.5, min: 0, max: 1, step: 0.1}
    ]
  },
  distribution: 'normal',
};

export default DistData;


