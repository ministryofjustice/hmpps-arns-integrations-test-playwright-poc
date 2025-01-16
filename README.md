# hmpps-arns-integrations-test-playwright-poc

## Introduction
This proof of concept is built using Playwright and Typescript. The idea is to start with some journeys running across SAN and SP, and use those as smoke tests as and when needed. There's a draft github actions yml here but it's commented out for now.

## Pre-requisites
Ensure you have node.js installed on your machine. This can be gotten from the self service
Make sure npm is also installed on your machine.
Install playwright with 'npx playwright install'
Once you have cloned this repository, run the following commands to install depedencies:

npm install

## Overview
Initially, the config is set to have tests run on the following browsers:
Desktop Firefox
Desktop Chrome
Desktop Safari
These can be later expanded in the playwright.config file.

## Running the tests
npx playwright test --project=chromium Runs the tests only on Desktop Chrome.
npx playwright test --project=chromium --debug tests/01.registration.spec.ts Runs only the specified test in debug mode.
npx playwright test --project=chromium --debug Runs the tests in debug mode.
For other browsers available in the config, pass the desired browser in your command.

## Generating reports
To open last HTML report run: npx playwright show-report