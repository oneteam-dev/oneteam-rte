import React, { Component } from 'react';
import RichTextEditor, { Toolbar, Body } from '../src';
import itemOptions from './itemOptions';
import '../node_modules/draft-js/dist/Draft.css';
import './index.styl';

export default class App extends Component {
  render() {
    return (
      <div>
        <RichTextEditor
          initialHtml='<h1>oneteam-rte</h1><div><br /></div><div>Oneteam rich text editor</div>'
          onChange={(...args) => { console.info(...args); }}
          ref={c => window.rte = this.rte = c}>
          <Toolbar itemOptions={itemOptions} />
          <Body />
        </RichTextEditor>
        <button onClick={() => console.log(this.rte.serializedHTML)}>Log</button>
      </div>
    );
  }
}
