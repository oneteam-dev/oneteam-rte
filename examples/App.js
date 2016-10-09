import React, { Component } from 'react';
import { ENTITY_TYPES } from 'oneteam-rte-utils';
import RichTextEditor, { Toolbar, Body } from '../src';
import WebCard from './HOCWebCard';
import itemOptions from './itemOptions';
import '../node_modules/draft-js/dist/Draft.css';
import './index.styl';

export default class App extends Component {
  handleClickInsertImage = () => {
    const url = window.prompt('Enter a image URL.');
    if (url) {
      this.rte.insertImage({ name: 'ex', original_url: url, preview_url: url });
    }
  }
  handleClickUploadFile = () => {
    const url = window.prompt('Enter a file URL.');
    if (url) {
      this.rte.insertDownloadLink({ name: 'Donwload link', download_url: url, size: 0 });
    }
  }
  handleClickEmbedIFrame = () => {
    const tag = window.prompt('Enter a iframe tag.');
    if (tag) {
      this.rte.insertIFrame(tag);
    }
  }
  render() {
    return (
      <div>
        <RichTextEditor
          initialHtml='<h1>oneteam-rte</h1><div><br /></div><div><a href="https://one-team.com/" target="_blank">https://one-team.com/</a></div><web-card url="https://one-team.com/"></web-card><div><br /></div><div>Oneteam rich text editor</div>'
          onChange={(...args) => { console.info(...args); }}
          ref={c => window.rte = this.rte = c}
        >
          <Toolbar
            itemOptions={itemOptions}
            onClickInsertImage={this.handleClickInsertImage}
            onClickUploadFile={this.handleClickUploadFile}
            onMouseDownEmbedIFrame={this.handleClickEmbedIFrame}
          />
          <Body
            customAtomicBlockRendererFn={(entityType, data) => {
              if (entityType === ENTITY_TYPES.WEB_CARD) {
                return {
                  component: WebCard,
                  props: {
                    url: data.url,
                    onDelete: block => this.rte.removeBlock(block)
                  },
                  editable: false,
                };
              }
              return null;
            }}
          />
        </RichTextEditor>
        <button onClick={() => console.log(this.rte.serializedHTML)}>Log</button>
      </div>
    );
  }
}
