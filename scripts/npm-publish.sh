#!/bin/bash -eu

git fetch origin --tags --prune
PKG='oneteam-rte'
TAG=$(git describe --exact-match --tags 2>/dev/null)
VERSION=${TAG:1}
if [[ $VERSION && -z "$(npm info "${PKG}@${VERSION}" --json)" ]]; then
  echo $VERSION
  npm publish
else
  echo "${VERSION} exists. It was skip publishing."
fi
