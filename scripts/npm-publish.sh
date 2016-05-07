PKG='oneteam-rte'
TAG=$(git describe --exact-match --tags 2>/dev/null)
VERSION=${TAG:1}
if [[ $VERSION && $(npm info "${PKG}@${VERSION}") == 'undefined' ]]; then
  echo $VERSION
fi
