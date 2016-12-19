import toMarkdown from 'to-markdown';
import marked from 'marked';
import htmlclean from 'htmlclean';

const toMarkdownOptions = {
  converters: [
    {
      filter: ['div', 'figure'],
      replacement: (content) => {
        return `\n\n${content}\n\n`;
      }
    },
    {
      filter: 'br',
      replacement: (content, node) => {
        // Blank line
        const { parentNode } = node;
        if (parentNode.nodeName === 'DIV' && !!parentNode.nextElementSibling && parentNode.children.length === 1) {
          return '<br />';
        }
        return '';
      }
    },
    {
      filter: 'pre',
      replacement: (content, node) => {
        const language = node.getAttribute('data-language');
        return `\`\`\`${language || ''}\n${content}\n\`\`\`\n\n`;
      }
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
    return `<li>${text}</li>`;
  }
};
renderer.code = (code, language) => {
  return `<pre${language ? ` data-language="${language}"` : ''}>${code}</pre>`;
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
  return htmlclean(
    marked(markdown)
  );
};
