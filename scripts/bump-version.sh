#!/usr/bin/env bash

# Script to safely bump the version of a Node.js package (patch, minor, or major) without creating a Git tag.

# Exit on error
set -e

# Define bold formatting
BOLD=$(tput bold)
NORMAL=$(tput sgr0)

# Handle version bump failures
version_failed() {
  echo ""
  echo "❌ ${BOLD}Version Bump Failed${NORMAL}"
}
trap "version_failed" ERR

##############################################################################################################
echo ""
echo "🔖 ${BOLD}STARTING VERSION BUMP PROCESS${NORMAL}"
echo ""

# Ensure version type argument is provided
if [ -z "$1" ]; then
  echo "⚠️  ${BOLD}Error:${NORMAL} Version type required. Usage:"
  echo "   ./bump-version.sh patch | minor | major"
  exit 1
fi

VERSION_TYPE="$1"
VALID_TYPES=("patch" "minor" "major")

if [[ ! " ${VALID_TYPES[*]} " =~ " ${VERSION_TYPE} " ]]; then
  echo "❌ ${BOLD}Invalid version type:${NORMAL} '$VERSION_TYPE'"
  echo "   Must be one of: patch | minor | major"
  exit 1
fi

# STEP 1: Show working directory
echo ""
echo "📁 ${BOLD}STEP 1: CURRENT WORKING DIRECTORY${NORMAL}"
pwd

# STEP 2: Bump version
echo ""
echo "📈 ${BOLD}STEP 2: BUMPING PACKAGE VERSION → ${VERSION_TYPE}${NORMAL}"
npm --no-git-tag-version version "$VERSION_TYPE"

# STEP 3: Reminder to push
echo ""
echo "📤 ${BOLD}STEP 3: REMINDER TO PUSH CHANGES${NORMAL}"
echo "→ Don't forget to commit and push your updated package.json and package-lock.json"

# Done
echo ""
echo "✅ ${BOLD}VERSION BUMP COMPLETE${NORMAL}"
