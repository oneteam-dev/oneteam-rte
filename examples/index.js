import React from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from '../lib';
import '../lib/base.css';
import './index.styl';

let richTextEditor;

ReactDOM.render((
  <div>
    <RichTextEditor
      ref={c => richTextEditor = c}
      onEnterKeyDownWithCommand={() => console.log('onEnterKeyDownWithCommand')}
      onPaste={() => console.log('onPaste')}
      onClickAddImage={() => console.log('onClickAddImage')}
      onClickFileAttach={() => console.log('onClickFileAttach')} />
    <button onClick={() => console.log(richTextEditor.getHTML())}>Log</button>
  </div>
), document.querySelector('#app-root'));
