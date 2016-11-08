import 'draft-js/dist/Draft.css';
import React, { Component } from 'react';
import { ENTITY_TYPES } from 'oneteam-rte-constants';
import RichTextEditor, { Toolbar, Body } from '../src';
import WebCard from './HOCWebCard';
import itemOptions from './itemOptions';
import './index.styl';

export default class Editor extends Component {
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
  customAtomicBlockRendererFn = (entity, block) => {
    const key = entity.getType();
    if (key === ENTITY_TYPES.WEB_CARD) {
      const data = entity.getData()
      return {
        component: WebCard,
        props: {
          url: data.url,
          imageRemoved: data.imageRemoved,
          onDelete: () => this.rte.removeBlock(block),
          onRemoveImage: () => this.rte.mergeEntityData(block.getEntityAt(0), { imageRemoved: true })
        },
        editable: false,
      };
    }
    return null;
  }
  render() {
    return (
      <RichTextEditor
        initialHtml='<h1>oneteam-rte</h1><div><br /></div><div><a href="https://one-team.com/" target="_blank">https://one-team.com/</a></div><web-card url="https://one-team.com/"></web-card><div><br /></div><div>Oneteam rich text editor</div>'
        onChange={(...args) => { console.info(...args); }}
        ref={c => window.rte = this.rte = this.props.onMount(c)}
      >
        <Toolbar
          itemOptions={itemOptions}
          onClickInsertImage={this.handleClickInsertImage}
          onClickUploadFile={this.handleClickUploadFile}
          onMouseDownEmbedIFrame={this.handleClickEmbedIFrame}
          onHeadingToggled={() => this.body.focus()}
        />
        <Body
          ref={c => this.body = c}
          customAtomicBlockRendererFn={this.customAtomicBlockRendererFn}
        />
      </RichTextEditor>
    );
  }
}
