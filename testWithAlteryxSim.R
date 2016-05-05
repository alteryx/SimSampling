#Build Package
devtools::install("../AlteryxSim")

AlteryxRhelper::buildPlugin()

AlteryxRhelper::runWorkflow("Supporting_Macros/tests/testParamNormalSampling.yxmd")
