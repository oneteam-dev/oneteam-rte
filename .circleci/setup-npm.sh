#!/bin/bash

cat > ~/.npmrc << EOF
//registry.npmjs.org/:_authToken=$NPM_AUTH_TOKEN
EOF

[[ $(npm whoami) == "kazsakai" ]] || sh -c "echo not\\ authenticated; exit 1"
