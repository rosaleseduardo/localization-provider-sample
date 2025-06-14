#!/usr/bin/env bash

# Script to build and publish the CONNEX Forms React SDK to Artifactory, including npm auth setup and Storybook build.

# Exit on error
set -e

# Define bold formatting
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

# Display NPM version
echo ""
echo "🧪 ${BOLD}NPM VERSION:${NORMAL}"
npm --version

# Handle build failures
build_failed() {
  echo ""
  echo "❌ ${BOLD}Build Failed${NORMAL}"
}
trap "build_failed" ERR

# Retrieve NPM token from AWS Secrets Manager
echo ""
echo "🔐 ${BOLD}RETRIEVING NPM AUTH TOKEN FROM AWS SECRETS MANAGER${NORMAL}"
NPM_TOKEN=$(aws secretsmanager get-secret-value --secret-id npm-token --output text --query 'SecretString' | cut -d: -f2 | tr -d '\"}')

##############################################################################################################
echo ""
echo "🚀 ${BOLD}STARTING CONNEX FORMS - REACT SDK BUILD${NORMAL}"
echo ""

# STEP 1: Create .npmrc for Artifactory Auth
echo ""
echo "🔐 ${BOLD}STEP 1: CREATING ARTIFACTORY AUTH CONFIGURATION${NORMAL}"
cat <<EOF > .npmrc
registry = https://artifactory.commandalkonapis.com/artifactory/api/npm/cai-npm
_auth = ${NPM_TOKEN}
email = connexcode
always-auth = true
EOF

# STEP 2: Install Dependencies
echo ""
echo "📦 ${BOLD}STEP 2: INSTALLING DEPENDENCIES${NORMAL}"
npm install --legacy-peer-deps

# STEP 3: Clean up old build/dist
echo ""
echo "🧹 ${BOLD}STEP 3: CLEANING UP OLD BUILD AND DIST DIRECTORIES${NORMAL}"
[[ -e build ]] && echo "→ Removing old build directory" && rm -rf build
mkdir build
[[ -e dist ]] && echo "→ Removing old dist directory" && rm -rf dist
mkdir dist

# STEP 4: Run Webpack production build
echo ""
echo "🛠️ ${BOLD}STEP 4: RUNNING PRODUCTION BUILD${NORMAL}"
npm run build

# STEP 5: Prepare build artifacts
echo ""
echo "📁 ${BOLD}STEP 5: COPYING FILES TO BUILD DIRECTORY${NORMAL}"
cd ./build
cp -R ../dist/*.js ../dist/*.map ../package.json ../README.md .

# STEP 6: Publish to Artifactory
echo ""
echo "📤 ${BOLD}STEP 6: PUBLISHING SDK TO ARTIFACTORY${NORMAL}"
cat <<EOF > .npmrc
registry = https://artifactory.commandalkonapis.com/artifactory/api/npm/cai-npm-local/
_auth = ${NPM_TOKEN}
email = connexcode
always-auth = true
EOF

echo "→ .npmrc contents:"
cat .npmrc

npm publish

# STEP 7: Build Storybook
echo ""
echo "📚 ${BOLD}STEP 7: BUILDING STORYBOOK${NORMAL}"
cd ..
npm run build-storybook

echo ""
echo "✅ ${BOLD}SDK BUILD AND PUBLISH COMPLETE!${NORMAL}"
