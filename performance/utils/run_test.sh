#!/bin/bash

SCRIPT_PATH="../tests/browserAndApi.js"

# Run the extract step
echo "🔍 Running extract step..."
extracted_output=$(k6 run "$SCRIPT_PATH" --env SCENARIO=extract 2>&1)

# Debug the raw k6 output
echo "----- k6 raw output -----"
echo "$extracted_output"
echo "--------------------------"

# Extract the URL from the raw k6 output
EXTRACTED_URL=$(echo "$extracted_output" \
  | grep -Eo 'https://[^ "]+' \
  | head -n1 \
  | tr -d '\r')

# Check if the URL was extracted successfully
if [ -z "$EXTRACTED_URL" ]; then
  echo "❌ ERROR: Could not extract URL."
  exit 1
fi

echo "✅ Extracted URL: $EXTRACTED_URL"

echo "🚀 Running API test..."
## Pass the scenarios you want to run in the command below
## The test setup supports one or more than one. Example: browser, or browser,load or load on its own, etc.
k6 run "$SCRIPT_PATH" --env SCENARIO=browser,load --env EXTRACTED_URL="$EXTRACTED_URL"