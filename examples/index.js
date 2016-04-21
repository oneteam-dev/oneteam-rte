import React from 'react';
import ReactDOM from 'react-dom';
import { RichTextEditor } from '../lib';
import '../lib/base.css';
import './index.css';

let richTextEditor;

ReactDOM.render((
  <div>
    <RichTextEditor
      placeholder='placeholder'
      readOnly={false}
      ref={c => richTextEditor = c}
      onEnterKeyDownWithCommand={() => console.log('onEnterKeyDownWithCommand')}
      onPaste={() => console.log('onPaste')}
      onClickAddImage={() => console.log('onClickAddImage')}
      onClickFileAttach={() => console.log('onClickFileAttach')}
      initialHtml={'<h1>RichTextEditor</h1>'}
      headingLabel='Heading'
      useDefaultButtons />
    <buttton onClick={() => console.log(richTextEditor.getSerializedBody())}>Log</buttton>
  </div>
), document.querySelector('#app-root'));
