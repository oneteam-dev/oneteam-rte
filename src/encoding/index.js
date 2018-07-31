import emojione from 'emojione';
import convertHTMLToContentState from 'draft-js-oneteam-rte-plugin/lib/encoding/convertHTMLToContentState';
import convertContentStateToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/convertContentStateToHTML';
import convertHTMLToMarkdown from 'draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown';
import convertMarkdownToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML';
import createToContentOptions from './helpers/createToContentOptions';
import normalizeContentState from './helpers/normalizeContentState';
import { entityType as mentionEntityType } from '../plugins/mention';

const htmlToMarkdown = html => convertHTMLToMarkdown(html);

const markdownToHTML = md => convertMarkdownToHTML(md);

const defaultToHTMLOptions = {
  entityRenderers: {
    [mentionEntityType](entity) {
      const { mention } = entity.getData();
      const name = mention.userName || mention.groupName;
      return `@${name}`;
    }
  }
};

const contentToHTML = (content, options) => {
  return emojione.toShort(
    convertContentStateToHTML(content, { ...defaultToHTMLOptions, ...options })
  );
};

const htmlToContent = (html, DOMBuilder, options) => {
  const content = convertHTMLToContentState(
    emojione.shortnameToUnicode(html),
    DOMBuilder,
    createToContentOptions(options)
  );
  return normalizeContentState(content);
};

export { htmlToMarkdown, markdownToHTML, contentToHTML, htmlToContent };
