import toMarkdown from 'to-markdown';
import marked from 'marked';

const toMarkdownOptions = {
  converters: [
    {
      filter: 'div',
      replacement: content => `\n\n${content.trim()}\n\n`
    },
    {
      filter: 'pre',
      replacement: content => `\`\`\`\n${content}\n\`\`\`\n\n`
    },
    {
      filter: node => {
        const firstSiblingNode = node.parentNode.firstChild;
        return firstSiblingNode.nodeName === 'INPUT' &&
          firstSiblingNode.type === 'checkbox' &&
          node.nodeName === 'SPAN';
      },
      replacement: content => content
    }
  ],
  gfm: true
};

const renderer = new marked.Renderer();
renderer.listitem = text => {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text
      .replace(/^\s*\[ \]\s*/, '<input type="checkbox" /> ')
      .replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked /> ');
    return `<li class="task-list-item">${text}</li>`;
  } else {
    return `<li>${text}<li>`;
  }
};
renderer.code = code => {
  return `<pre>${code}</pre>`;
};

marked.setOptions({
  gfm: true,
  renderer
});

export const htmlToMarkdown = html => {
  return toMarkdown(
    html,
    toMarkdownOptions
  );
};

export const markdownToHTML = markdown => {
  return marked(markdown);
};
