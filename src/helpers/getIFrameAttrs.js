export default function getIFrameAttrs(htmlString) {
  const iframe = parseIFrameTag(htmlString);
  return [].reduce.call(iframe.attributes, (result, { nodeName, nodeValue }) => {
    result[nodeName] = nodeValue;
    return result;
  }, {});
}

function parseIFrameTag(string) {
  const el = document.createElement('div');
  el.innerHTML = string;
  debugger;
  return el.getElementsByTagName('iframe')[0];
}
