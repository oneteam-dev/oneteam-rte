import React from 'react';
import ReactDOM from 'react-dom';
import RichTextEditor from '../lib';
import '../lib/base.css';
import './index.styl';

let richTextEditor;

ReactDOM.render((
  <div>
    <RichTextEditor
      tooltipTexts={{
        addPhoto: '画像を追加',
        attachFile: 'ファイルを添付',
        embedIFrame: 'iframeを埋め込む',
        heading: '見出し',
        BOLD: '太字',
        ITALIC: '斜体',
        STRIKETHROUGH: '打ち消し線',
        blockquote: '引用文',
        'checkable-list-item': 'チェックリスト',
        'unordered-list-item': '箇条書き',
        'ordered-list-item': '番号付きリスト',
        addLink: 'リンクを挿入',
        removeLink: 'リンクを削除'
      }}
      ref={c => richTextEditor = c}
      onEnterKeyDownWithCommand={() => console.log('onEnterKeyDownWithCommand')}
      onPaste={() => console.log('onPaste')}
      onClickAddImage={() => console.log('onClickAddImage')}
      addLinkValueErrorMessage='有効なURLを入力してください'
      onClickFileAttach={() => console.log('onClickFileAttach')} />
    <button onClick={() => console.log(richTextEditor.getHTML())}>Log</button>
  </div>
), document.querySelector('#app-root'));
