import React from 'react';
import { render } from 'react-dom';
import RichTextEditor, { Toolbar, Body } from '../src';
import itemOptions from './itemOptions';
import '../node_modules/draft-js/dist/Draft.css';
import './index.styl';

let rte;

render((
  <div>
    <RichTextEditor initialHtml='<h1>oneteam-rte</h1><div><br /></div><div>Oneteam rich text editor</div>' ref={c => window.rte = rte = c}>
      <Toolbar itemOptions={itemOptions} />
      <Body />
    </RichTextEditor>
    <button onClick={() => console.log(rte.serializedHTML)}>Log</button>
  </div>
), document.querySelector('#app-root'));
