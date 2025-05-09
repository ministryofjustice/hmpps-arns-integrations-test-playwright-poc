# Setup
To run locally first install k6. The browser module is now included in the default installation as of k6 version 0.52.0.
`brew install k6`

To run the tests head/headless you will need chromium installed - to install chromium run
`brew install --force chromium --no-quarantine ` 

# Configure the tests
The tests are configured so the browser and api tests can be run independently or in parallel with one selected API scenario (like "load" or "soak"), to monitor the UI whilst the API is being subjected to various loads. The logic is as follows:
* The SCENARIO env var controls the scenarios
 
The available runtime scenarios are:
 
 - BROWSER TEST
 - API TESTS
 * load
 * soak
 * smoke

# Running the tests
To run the tests locally these can be executed from the command line in a terminal. 
From the route of the project, you can run the following commands

Browser test only
`SCENARIO=browser k6 run performance/tests/browserAndApi.js`

Browser + Load test
`SCENARIO=browser,load k6 run performance/tests/browserAndApi.js`

Browser + Soak test
`SCENARIO=browser,soak k6 run performance/tests/browserAndApi.js`

To run the browser tests in head mode and see the browser (HEADLESS:FALSE)
`SCENARIO=browser K6_BROWSER_HEADLESS=false k6 run performance/tests/browserAndApi.js`

NOTE: you may want to adjust the `duration` value in the Browser test to match which API scneario you're running, but not necessarily. The default 2m value gives a reasonable snapshot on UI monitoring for the scenarios.


# The report

At the end of the test a report is generated with an array of different metrics that have been captured during the tests. 
There have been thresholds set on a selection of metrics that have been specified in the load model 
* Server response time is lower than 2000 milliseconds in 90% of requests and lower than
5000 milliseconds in 100% of requests
This is captured in `browser_http_req_duration` && `browser_http_req_failed`
* The API test metrics are also monitored 
This is captured in `http_req_duration` && `http_req_failed`

Should any of these exceed the selected threshold metric an error will be displayed in the test results.