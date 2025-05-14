# Setup
To run locally first install k6. The browser module is now included in the default installation as of k6 version 0.52.0.
`brew install k6`

To run the tests head/headless you will need chromium installed - to install chromium run
`brew install --force chromium --no-quarantine ` 

# Configure the tests
The tests are configured so the browser and api tests can be run independently or in parallel with one selected API scenario (like "load","soak", etc), to monitor the UI whilst the API is being subjected to various loads. The logic is as follows:
* The SCENARIO env var controls the scenarios
 
The available runtime scenarios are:
 
 - BROWSER TEST
 - API TESTS
 * load
 * soak
 * smoke
 * stress

# Running the tests
To run the tests locally these can be executed from the command line in a terminal. 
From the route of the project, you can run the following commands, or navigate to the directory of the run_test.sh file and run that (you can configure which scenario to run in there too).

- Browser test only
`SCENARIO=browser k6 run performance/tests/browserAndApi.js`

- API tests
Before running those, you need to capture the one-time handover link as  extracted url. The extract scenario must be run first to get that value, which is run as part of the execution of the bash script.

Technical description:

The run_test.sh script is a Bash automation wrapper designed to run a two-phase performance testing workflow using k6. It first executes a browser-based extraction step to retrieve a dynamic URL, then passes that URL as an environment variable to run following API-based performance tests.

To use the run_test.sh file to run the api tests, navigate to the `utils` directory and run:
`chmod +x run_test.sh
./run_test.sh`

To run the browser tests in head mode and see the browser (HEADLESS:FALSE)
`SCENARIO=browser K6_BROWSER_HEADLESS=false k6 run performance/tests/browserAndApi.js`

NOTE: you may want to adjust the `duration` value in the Browser test to match which API scneario you're running, but not necessarily.


# The report

At the end of the test a report is generated with an array of different metrics that have been captured during the tests. 
There have been thresholds set on a selection of metrics that have been specified in the load model 
* Server response time is lower than 2000 milliseconds in 90% of requests and lower than
5000 milliseconds in 100% of requests
This is captured in `browser_http_req_duration` && `browser_http_req_failed`
* The API test metrics are also monitored 
This is captured in `http_req_duration` && `http_req_failed`

Should any of these exceed the selected threshold metric an error will be displayed in the test results.