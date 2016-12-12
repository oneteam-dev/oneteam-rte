export const INSERT_IMAGE = 'INSERT_IMAGE';
export const UPLOAD_FILE = 'UPLOAD_FILE';
export const EMBED_IFRAME = 'EMBED_IFRAME';
export const INSERT_LINK = 'INSERT_LINK';
export const REMOVE_LINK = 'REMOVE_LINK';
export const DIVIDER = 'DIVIDER';
export const HEADING = 'HEADING';
export const BOLD = 'BOLD';
export const ITALIC = 'ITALIC';
export const STRIKETHROUGH = 'STRIKETHROUGH';
export const BLOCKQUOTE = 'BLOCKQUOTE';
export const CHECKABLE_LIST = 'CHECKABLE_LIST';
export const UNOERDERD_LIST = 'UNOERDERD_LIST';
export const OERDERD_LIST = 'OERDERD_LIST';
export const CODE_BLOCK = 'CODE_BLOCK';

export default {
  [INSERT_IMAGE]: {
    description: 'Insert image',
    iconNode: 'Insert image'
  },
  [UPLOAD_FILE]: {
    description: 'Upload file',
    iconNode: 'Upload file'
  },
  [EMBED_IFRAME]: {
    description: 'Embed iframe',
    iconNode: 'Embed iframe'
  },
  [INSERT_LINK]: {
    description: 'Insert link',
    iconNode: 'Insert link',
    validationErrorMessage: 'Error',
    placeholder: 'url here...'
  },
  [REMOVE_LINK]: {
    description: 'Remove link',
    iconNode: 'Remove link'
  },
  [HEADING]: {
    description: null,
    name: 'Heading',
    closeButtonNode: 'x'
  },
  [BOLD]: {
    description: 'Bold',
    iconNode: 'Bold'
  },
  [ITALIC]: {
    description: 'Italic',
    iconNode: 'Italic'
  },
  [STRIKETHROUGH]: {
    description: 'Strikethrough',
    iconNode: 'Strikethrough'
  },
  [BLOCKQUOTE]: {
    description: 'Blockquote',
    iconNode: 'Blockquote'
  },
  [CHECKABLE_LIST]: {
    description: 'Check box',
    iconNode: 'Check box'
  },
  [UNOERDERD_LIST]: {
    description: 'Unoerderd list',
    iconNode: 'Unoerderd list'
  },
  [OERDERD_LIST]: {
    description: 'Oerderd list',
    iconNode: 'Oerderd list'
  },
  [CODE_BLOCK]: {
    description: 'Code block',
    iconNode: 'Code block'
  }
};
