import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'lodash/assign';
import { RichTextEditor } from '../lib';
import { BLOCK_TYPES, INLINE_STYLES } from '../lib/constants';
import 'draft-js/dist/Draft.css';
import './index.css';

let richTextEditor;

ReactDOM.render((
  <div>
    <RichTextEditor
      placeholder='placeholder'
      readOnly={false}
      ref={c => richTextEditor = c}
      onEnterKeyDown={() => console.log('onEnterKeyDown')}
      onPaste={() => console.log('onPaste')}
      onClickAddImage={() => console.log('onClickAddImage')}
      onClickFileAttach={() => console.log('onClickFileAttach')}
      initialHtml={'<h1>RichTextEditor</h1>'}
      headingLabel='Heading'
      toolbarButtonNodes={assign({}, BLOCK_TYPES, INLINE_STYLES)} />
    <buttton onClick={() => console.log(richTextEditor.getSerializedBody())}>Log</buttton>
  </div>
), document.querySelector('#app-root'));
