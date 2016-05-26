# About the Simulation Sampling Tool

<img src="../SimSamplingIcon.png" width=100 height=100 />



__Insert summary of the Simulation Sampling tool__

_Note: This tool uses the R tool. Install R and the necessary packages by going to Options > Download Predictive Tools._

### Inputs

There are 2 inputs.

1. __D Input__ Sample Data. This is an optional input. It is required when sampling from data (except when entering via the roulette widget) and not required when sampling parametrically.
2. __S Input__ Simulation Data. This is an optional input. If previous simulation tools have been used, the data from them can be connected to appropriately append it and get an iteration count and seed.

### Configuration Properties

1. __Select sampling mechanism:__ We support two mechanisms. (1) Monte Carlo Sampling / Simple Random Sampling and (2) Latin HyperCube Sampling/ Stratified Random Sampling. See [Wikipedia](https://en.wikipedia.org/wiki/Latin_hypercube_sampling). For stratified sampling from data, the maximum strata size is given by the choice of chunk size.
2. __Chunk size:__ Maximal size of chunk to evaluate at a time. This can be used to avoid R's in-memory processing limitation. For stratified sampling from data, this is also the maximal size of the strata.
3. __seed:__ This will be the random seed used for sampling. If a dataset containing a "seed" field is connected to the S input of this macro, this option will not be available; that seed will be incremented and used here.
4. __Number of iterations:__ Number of samples to select. This option is not available when there is a dataset connected to the S input, as the size of that dataset determines the number of iterations in that case.
5. __Enter stage name:__ Choose a field name for the output.
6. __Select distribution:__ Select from the list of supported distributions.
7. __Select fields to sample:__ Choose the fields to sample from.
8. __Select sampling strategy:__ This option is available when sampling from data. Choose how you would like to sample your data. You can sample entire records, sample independently with respect to columns, or fit data to a distribution and sample from the best-fitting distribution.
9. __Select distributions to fit:__ Choose the distributions you want to fit the data to. This option is available for sampling from data and from a best-fitting distribution.
10. __Select sampling mode:__ Sampling can be done parametrically from a distribution or to sample from a dataset. In the case of sampling from data, a data stream should be connected to the D input or sampling is done via manually specifying data. For parametric sampling, there should be no connected data stream to the D input.
11. __Specify kind of data:__ This option is available when choosing to sample from data. You can supply data in three ways. (1) Raw Data, (2) Binned Data (with an ID field and a value field with equally spaced bins) or (3) Manually entered data via the Roulette widget.
12. __Enter name for outgoing data:__ The output field name for the binned data. This option is available 
13. __Select ID Field:__ The ID field for the binned data
14. __Select Value Field:__ The value field for the binned data
15. __Roulette Data:__ This is roulette data.
16. __Sample with replacement:__ Check to sample with replacement.

### Output

1. __D Output__ Data Output. Result of the simulation.
