import convertHTMLToContentState from 'draft-js-oneteam-rte-plugin/lib/encoding/convertHTMLToContentState';
import convertContentStateToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/convertContentStateToHTML';
import convertHTMLToMarkdown from 'draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown';
import convertMarkdownToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML';
import emojione from 'emojione';

const htmlToMarkdown = html => convertHTMLToMarkdown(html);

const markdownToHTML = md => convertMarkdownToHTML(md);

const contentToHTML = (content, options) => {
  return emojione.toShort(
    convertContentStateToHTML(content, options)
  );
};

const htmlToContent = (html, DOMBuilder) => {
  return convertHTMLToContentState(
    emojione.shortnameToUnicode(html),
    DOMBuilder
  );
};

export { htmlToMarkdown, markdownToHTML, contentToHTML, htmlToContent };
