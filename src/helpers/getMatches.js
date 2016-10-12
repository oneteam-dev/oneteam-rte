/**
 * @param {String} str
 * @param {RegExp} regex
 * @returns {Array|null} [ { value, index }, ]
 */
export default function getMatches(str, regex) {
  let match;
  const matches = [];
  while (match = regex.exec(str)) { // eslint-disable-line no-cond-assign
    matches.push(match);
  }
  return matches.length > 0 ? matches.reduce((ret, m) => [...ret, { value: m[0], index: m.index }], []) : null;
}
