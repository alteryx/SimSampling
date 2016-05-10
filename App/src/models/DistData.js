/* Reference: http://jstat.github.io/distributions.html */
/* To add more distributions, consult jstat documentation */
const DistData = {
  distributions: {
    normal: [
      { label: 'Mean', value: 0, min: -5, max: 5, step: 1 },
      { label: 'Stdev', value: 1, min: 0, max: 1, step: 0.1 },
    ],
    exponential: [
      { label: 'Rate', value: 1, min: 0, max: 5, step: 1 },
    ],
    uniform: [
      { label: 'a', value: 0, min: -5, max: 5, step: 1 },
      { label: 'b', value: 1, min: -5, max: 5, step: 1 },
    ],
    gamma: [
      { label: 'a', value: 1, min: 0, max: 5, step: 1 },
      { label: 'b', value: 1, min: 0, max: 5, step: 1 },
    ],
  },
  distribution: 'normal',
};

export default DistData;
