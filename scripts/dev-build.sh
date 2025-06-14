#!/usr/bin/env bash

################################################################################
# Script to build and distribute the localization-provider-sample - React SDK
#
# This script:
# - Cleans old build artifacts
# - Builds the SDK
# - Copies output to dependent projects' node_modules
# - Ensures the latest local version of localization-provider-sample is used without publishing
################################################################################

# Exit on error
set -e

# Define bold formatting
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

# Handle build failures
build_failed() {
  echo "❌ ${BOLD}Build Failed${NORMAL}"
}
trap "build_failed" ERR

##############################################################################################################
echo ""
echo "🚀 ${BOLD}STARTING localization-provider-sample - REACT SDK BUILD${NORMAL}"
echo ""

# STEP 1: Clean up previous build and dist directories
echo ""
echo "🧹 ${BOLD}STEP 1: CLEANING OLD BUILD ARTIFACTS${NORMAL}"
[[ -d dist ]] && echo "→ Removing old dist directory" && rm -rf dist
[[ -d build ]] && echo "→ Removing old build directory" && rm -rf build

# STEP 2: Clear localization-provider-sample module from various projects
echo ""
echo "🧼 ${BOLD}STEP 2: CLEANING localization-provider-sample MODULES FROM DEPENDENT PROJECTS${NORMAL}"
DEPENDENTS=(
  "../../mui-design-system"
)

for path in "${DEPENDENTS[@]}"; do
  echo "→ Removing $path/node_modules/localization-provider-sample"
  rm -rf "$path/node_modules/localization-provider-sample" || true
done

# STEP 3: Recreate dist and build directories
echo ""
echo "📁 ${BOLD}STEP 3: CREATING dist AND build DIRECTORIES${NORMAL}"
mkdir -p dist build

# STEP 4: Build the project
echo ""
echo "🛠️ ${BOLD}STEP 4: RUNNING PRODUCTION BUILD${NORMAL}"
npm run build

# STEP 5: Move into build directory and copy artifacts
echo ""
echo "📦 ${BOLD}STEP 5: COPYING BUILD ARTIFACTS${NORMAL}"
cd build
mkdir dist
cp -R ../dist/*.js ./dist
cp ../package.json ../README.md .

# STEP 6: Short pause
echo ""
echo "⏳ ${BOLD}STEP 6: WAITING FOR FILE SYSTEM TO SETTLE${NORMAL}"
sleep 3

# STEP 7: Distribute build to dependent projects
echo ""
echo "🔄 ${BOLD}STEP 7: DISTRIBUTING BUILD TO DEPENDENT PROJECTS${NORMAL}"
for path in "${DEPENDENTS[@]}"; do
  target="$path/node_modules/localization-provider-sample"
  echo "→ Copying files to $target"
  mkdir -p "$target"
  cp -r * "$target"
done

echo ""
echo "✅ ${BOLD}BUILD AND DISTRIBUTION COMPLETE!${NORMAL}"
