#!/bin/bash

SCRIPT_PATH="../tests/browserAndApi.js"

# Run the extract step
echo "🔍 Running extract step..."
extracted_output=$(k6 run "$SCRIPT_PATH" --env SCENARIO=extract)

# Debug the raw k6 output
echo "----- k6 raw output -----"
echo "$extracted_output"
echo "--------------------------"

# Extract the URL from the raw k6 output
EXTRACTED_URL=$(echo "$extracted_output" | grep 'EXTRACTED_URL=' | sed 's/.*EXTRACTED_URL=//' | tr -d '\r' | xargs)

# Check if the URL was extracted successfully
if [ -z "$EXTRACTED_URL" ]; then
  echo "❌ ERROR: Could not extract URL."
  exit 1
fi

echo "✅ Extracted URL: $EXTRACTED_URL"

echo "🚀 Running API test..."
k6 run "$SCRIPT_PATH" --env SCENARIO=smoke --env EXTRACTED_URL="$EXTRACTED_URL"
