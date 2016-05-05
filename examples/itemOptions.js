import React from 'react';
import Icon from 'react-fa';
import * as ITEM_NAMES from '../lib/constants/toolbar';

export default {
  [ITEM_NAMES.INSERT_IMAGE]: {
    description: 'Insert image',
    iconNode: <Icon name='image' />
  },
  [ITEM_NAMES.UPLOAD_FILE]: {
    description: 'Upload file',
    iconNode: <Icon name='paperclip' />
  },
  [ITEM_NAMES.EMBED_IFRAME]: {
    description: 'Embed iframe',
    iconNode: <Icon name='code' />
  },
  [ITEM_NAMES.INSERT_LINK]: {
    description: 'Insert link',
    iconNode: <Icon name='link' />
  },
  [ITEM_NAMES.REMOVE_LINK]: {
    description: 'Remove link',
    iconNode: <Icon name='unlink' />
  },
  [ITEM_NAMES.HEADING]: {
    name: 'Heading'
  },
  [ITEM_NAMES.BOLD]: {
    description: 'Bold',
    iconNode: <Icon name='bold' />
  },
  [ITEM_NAMES.ITALIC]: {
    description: 'Italic',
    iconNode: <Icon name='italic' />
  },
  [ITEM_NAMES.STRIKETHROUGH]: {
    description: 'Strikethrough',
    iconNode: <Icon name='strikethrough' />
  },
  [ITEM_NAMES.BLOCKQUOTE]: {
    description: 'Blockquote',
    iconNode: <Icon name='quote-left' />
  },
  [ITEM_NAMES.CHECKABLE_LIST]: {
    description: 'Check box',
    iconNode: <Icon name='check-circle-o' />
  },
  [ITEM_NAMES.UNOERDERD_LIST]: {
    description: 'Unoerderd list',
    iconNode: <Icon name='list-ul' />
  },
  [ITEM_NAMES.OERDERD_LIST]: {
    description: 'Oerderd list',
    iconNode: <Icon name='list-ol' />
  }
};
