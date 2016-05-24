## DO NOT MODIFY: Auto Inserted by AlteryxRhelper ----
library(AlteryxSim)
config <- list(
  binnedDataName = textInput('%Question.binnedDataName%', "BinData"),
  binnedIdField = dropdownInput('%Question.binnedIdField%'),
  binnedValueField = dropdownInput('%Question.binnedValueField%'),
  chunkSize = numericInput('%Question.chunkSize%' , 256000),
  dataKind = dropdownInput('%Question.dataKind%' , 'raw'),
  displaySeed = checkboxInput('%Question.displaySeed%' , FALSE),
  distribution = dropdownInput('%Question.distribution%' , 'norm'),
  distToFit = listInput('%Question.distToFit%'),
  fields = listInput('%Question.fields%'),
  intermediate = checkboxInput('%Question.intermediate%' , FALSE),
  jsonBounds = textInput('%Question.jsonBounds%' , '[-4, 4]'),
  jsonParameters = textInput('%Question.jsonParameters%' , '{"mean": 0, "sd": 1}'),
  jsonRouletteData = textInput(
    '%Question.jsonRouletteData%' , 
    '{"100": 1, "110": 2, "120": 4}'
  ),
  numIterations = numericInput('%Question.numIterations%' , 10),
  replace = checkboxInput('%Question.replace%' , FALSE),
  samplingMechanism = dropdownInput('%Question.samplingMechanism%' , 'MC'),
  samplingMode = dropdownInput('%Question.samplingMode%' , 'parametric'),
  samplingStrategy = dropdownInput('%Question.samplingStrategy%' , 'entire'),
  seed = numericInput('%Question.seed%' , 1),
  stageName = textInput('%Question.stageName%')
)
options(alteryx.wd = '%Engine.WorkflowDirectory%')
options(alteryx.debug = config$debug)
##----

config$Distributions <- jsonlite::fromJSON(textInput(
  "%Question._distributions%",
  '{"normal":[{"label":"Mean", "paramName": "mean", "value":0,"min":-5,"max":5,"step":1},{"label":"Stdev", "paramName": "sd", "value":1,"min":0,"max":1,"step":0.1}],"lognormal":[{"label":"Mean","value":0,"min":-5,"max":5,"step":1},{"label":"Stdev","value":0.25,"min":0,"max":1,"step":0.1}],"exponential":[{"label":"Rate","value":1,"min":0,"max":5,"step":1}],"uniform":[{"label":"a", "paramName": "min", "value":0,"min":-5,"max":5,"step":1},{"label":"b", "paramName": "max", "value":1,"min":-5,"max":5,"step":1}],"gamma":[{"label":"a","value":1,"min":0,"max":5,"step":1},{"label":"b","value":1,"min":0,"max":5,"step":1}],"beta":[{"label":"alpha","value":2,"min":0,"max":5,"step":0.2},{"label":"beta","value":5,"min":0,"max":5,"step":0.2}],"pareto":[{"label":"scale", "paramName": "scale", "value":2,"min":0,"max":5,"step":0.1},{"label":"shape", "paramName": "shape", "value":2,"min":0,"max":5,"step":0.1}],"binomial":[{"label":"n","value":10,"min":1,"max":20,"step":1},{"label":"p","value":0.5,"min":0,"max":1,"step":0.1}]}'
))

distMappings = c(
  norm = "normal",
  gamma = "gamma",
  lnorm = "lognormal",
  pareto = "pareto",
  unif = "uniform",
  triangle = "triangular",
  geom = "geometric",
  pois = "poisson",
  binom = "binomial"
)


getParameters <- function(config){
  dist <- distMappings[[config$distribution]]
  distParams <- config$Distributions[[dist]] 
  setNames(as.list(distParams$value), distParams$paramName)
}

# Deserialize JSON values into R objects
config$bounds = jsonlite::fromJSON(config$jsonBounds)
#config$parameters = jsonlite::fromJSON(config$jsonParameters)
config$parameters = getParameters(config)
config$rouletteData = jsonlite::fromJSON(config$jsonRouletteData)

if(config$samplingMode == "parametric") {
  dists <- jsonlite::fromJSON('%Question._distributions%')
  dist <- '%Question._distribution%'
  print(dists[dist])
}
readRecordCount <- read.Alteryx("totalSize")
readRecordCount <- as.numeric(readRecordCount$Count[[1]])
config$seed <- ifelse(config$displaySeed, config$seed, read.Alteryx("seed")$seed[[1]])
dfSeed <- data.frame(seed = 1+config$seed)
write.Alteryx(dfSeed, 2)
config$totalSize <- ifelse(readRecordCount==0, config$numIterations, readRecordCount)

config$name <- ifelse(config$samplingMode=="parametric", config$stageName, config$binnedDataName)

tool_process(
  method = toupper(config$samplingMechanism),
  chunkSize = config$chunkSize,
  seed = config$seed,
  count = config$totalSize,
  distribution = config$distribution,
  params = config$parameters,
  bounds = config$bounds,
  process = config$samplingStrategy,
  possible = config$distToFit,
  type = config$dataKind,
  id = config$binnedIdField,
  value = config$binnedValueField,
  name = config$name,
  roulette = config$rouletteData,
  dataName = "#1",
  sampleSource = config$samplingMode,
  replace = config$replace,
  totalSize = config$totalSize
)
