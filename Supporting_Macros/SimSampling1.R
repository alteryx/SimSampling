## DO NOT MODIFY: Auto Inserted by AlteryxRhelper ----
library(AlteryxRhelper)
config <- list(
  chunkSize = numericInput('%Question.chunkSize%' , 256000),
  distribution = dropdownInput('%Question.distribution%' , 'norm'),
  distToFit = listInput('%Question.distToFit%'),
  fields = listInput('%Question.fields%'),
  jsonBounds = textInput(
    '%Question.jsonBounds%', 
    jsonlite::toJSON(list(mean = 0, sd = 1), auto_unbox = TRUE)
  ),
  jsonParameters = textInput(
    '%Question.jsonParameters%',
    jsonlite::toJSON(c(-Inf, Inf), auto_unbox = TRUE)
  ),
  numIterations = numericInput('%Question.numIterations%' , 10),
  samplingMechanism = dropdownInput('%Question.samplingMechanism%' , 'mc'),
  samplingMode = dropdownInput('%Question.samplingMode%' , 'parametric'),
  samplingStrategy = dropdownInput('%Question.samplingStrategy%'),
  seed = numericInput('%Question.seed%' , 1),
  stageName = textInput('%Question.stageName%')
)
options(alteryx.wd = '%Engine.WorkflowDirectory%')
options(alteryx.debug = config$debug)
##----

config$bounds = jsonlite::fromJSON(config$jsonBounds)
config$parameters = jsonlite::fromJSON(config$jsonParameters)

print(config)


# Read Data
d <- read.Alteryx2("#1", default = data.frame(x = 1:10))

# Write Data to Output 1
write.Alteryx2(d, 1)
