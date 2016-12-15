import React, { Component } from 'react';
import htmlToMarkdown from 'draft-js-oneteam-rte-plugin/lib/encoding/htmlToMarkdown';
import markdownToHTML from 'draft-js-oneteam-rte-plugin/lib/encoding/markdownToHTML';
import Editor from './Editor';

export default class App extends Component {
  render() {
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
  }
}
