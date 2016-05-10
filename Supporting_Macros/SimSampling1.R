## DO NOT MODIFY: Auto Inserted by AlteryxRhelper ----
library(AlteryxRhelper)
library(AlteryxSim)
config <- list(
  binnedDataName = textInput('%Question.binnedDataName%'),
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
  jsonRouletteData = textInput('%Question.jsonRouletteData%' , '{"100": 1, "110": 2, "120": 4}'),
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

# Deserialize JSON values into R objects
config$bounds = jsonlite::fromJSON(config$jsonBounds)
config$parameters = jsonlite::fromJSON(config$jsonParameters)
config$rouletteData = jsonlite::fromJSON(config$jsonRouletteData)

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
  count = config$numIterations,
  distribution = config$distribution,
  params = config$parameters,
  bounds = config$bounds,
  process = config$samplingStrategy,
  possible = config$distToFit,
  type = config$dataKind,
  id = config$binnedIdField,
  value = config$binnedValueField,
  name = config$stageName,
  roulette = config$rouletteData,
  dataName = "#1",
  sampleSource = config$samplingMode,
  replace = config$replace,
  totalSize = config$totalSize
)