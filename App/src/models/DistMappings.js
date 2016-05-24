/* 
  These mappings are required to translate R distribution names into ones
  that are used by jStat. 
  Reference: http://jstat.github.io/distributions.html
*/
const distMappings = {
  norm: "normal",
  gamma: "gamma",
  lnorm: "lognormal",
  pareto: "pareto",
  unif: "uniform",
  triangle: "triangular",
  geom: "geometric",
  pois: "poisson",
  binom: "binomial"
}

export default distMappings;