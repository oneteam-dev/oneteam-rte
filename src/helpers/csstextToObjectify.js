import camelCase from 'lodash/camelCase';

export default function csstextToObjectify(csstext) {
  const rules = csstext.split(';').filter(str => str !== '').map(str => str.trim());
  return rules.reduce((result, rule) => {
    const [prop, val] = rule.split(':').map(str => str.trim());
    result[camelCase(prop)] = val;
    return result;
  }, {});
}
