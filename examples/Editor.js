import 'draft-js/dist/Draft.css';
import 'prism-github/prism-github.css';
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
        initialHtml=''
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
