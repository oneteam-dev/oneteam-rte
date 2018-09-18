# oneteam-rte [![Circle CI](https://circleci.com/gh/oneteam-dev/oneteam-rte.svg?style=svg&circle-token=45d404aab2e1e3343e0388129acc5279057b43d4)](https://circleci.com/gh/oneteam-dev/oneteam-rte)

Oneteam Rich text editor.

```bash
yarn add oneteam-rte

# or

npm i oneteam-rte
```

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

We using [Yarn](https://yarnpkg.com/) .

```bash
yarn # install dependency modules
```

To compile a file every time that you change it:

```bash
npm run watch
```

### Start development server for example

```bash
npm start
open http://localhost:8008
```

### Update dependencies

```bash
yarn upgrade [package | package@tag | package@version | @scope/]... [--ignore-engines] [--pattern]

# or

yarn upgrade-interactive [--latest]
```

## Publish new version

```sh
git checkout master
npm run bump-patch-number
```

### License

MIT

© Oneteam Inc.
