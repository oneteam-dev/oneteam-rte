import React from 'react';
import { hot } from 'react-hot-loader';
import { htmlToMarkdown, markdownToHTML } from '../src/encoding';
import Editor from './Editor';

const App = () => {
  return (
    <div>
      <Editor onMount={c => this.rte = c} />
      <button onClick={() => console.info(this.rte.html)}>HTML</button>
      <button onClick={() => console.info(this.rte.markdown)}>Markdown</button>
      <div style={{ marginTop: '2em' }}>
        <textarea ref={c => this.textarea = c} rows={6} cols={40}></textarea>
        <div>
          <button onClick={() => console.info(htmlToMarkdown(this.textarea.value))}>htmlToMarkdown</button>
          <button onClick={() => console.info(markdownToHTML(this.textarea.value))}>markdownToHTML</button>
        </div>
      </div>
    </div>
  );
};

export default hot(module)(App);
