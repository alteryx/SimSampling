## DO NOT MODIFY: Auto Inserted by AlteryxRhelper ----
library(AlteryxRhelper)
config <- list(
  binnedDataName = textInput('%Question.binnedDataName%'),
  binnedIdField = dropdownInput('%Question.binnedIdField%'),
  binnedValueField = dropdownInput('%Question.binnedValueField%'),
  chunkSize = numericInput('%Question.chunkSize%' , 256000),
  dataKind = dropdownInput('%Question.dataKind%' , 'raw'),
  distribution = dropdownInput('%Question.distribution%' , 'norm'),
  distToFit = listInput('%Question.distToFit%'),
  fields = listInput('%Question.fields%'),
  jsonBounds = textInput('%Question.jsonBounds%' , '[-4, 4]'),
  jsonParameters = textInput('%Question.jsonParameters%' , '{"mean": 0, "sd": 1}'),
  jsonRouletteData = textInput('%Question.jsonRouletteData%' , '{"100": 1, "110": 2, "120": 4}'),
  numIterations = numericInput('%Question.numIterations%' , 10),
  samplingMechanism = dropdownInput('%Question.samplingMechanism%' , 'mc'),
  samplingMode = dropdownInput('%Question.samplingMode%' , 'parametric'),
  samplingStrategy = dropdownInput('%Question.samplingStrategy%' , 'rows'),
  seed = numericInput('%Question.seed%' , 1),
  stageName = textInput('%Question.stageName%')
)
options(alteryx.wd = '%Engine.WorkflowDirectory%')
options(alteryx.debug = config$debug)
##----

config$bounds = jsonlite::fromJSON(config$jsonBounds)
config$parameters = jsonlite::fromJSON(config$jsonParameters)
config$rouletteData = jsonlite::fromJSON(config$jsonRouletteData)

print(config)


# Read Data
d <- read.Alteryx2("#1", default = data.frame(x = 1:10))

# Write Data to Output 1
write.Alteryx2(d, 1)  
