#!/bin/bash -eu

git fetch origin --tags --prune
PKG='oneteam-rte'
TAG=$(git describe --abbrev=0 --tags 2>/dev/null)
VERSION=${TAG:1}
if [[ $VERSION && -z "$(npm info "${PKG}@${VERSION}" --json)" ]]; then
  echo $VERSION
  NODE_ENV=production npm run build
  npm publish
else
  echo "${VERSION} exists. It was skip publishing."
fi
