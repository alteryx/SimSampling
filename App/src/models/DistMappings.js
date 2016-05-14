/* 
  These mappings are required to translate R distribution names into ones
  that are used by jStat. 
  Reference: http://jstat.github.io/distributions.html
*/
const distMappings = {
  norm: "normal",
  lnorm: "lognormal",
  pareto: "pareto",
  unif: "uniform",
  gamma: "gamma",
  binom: "binomial"
}

export default distMappings;