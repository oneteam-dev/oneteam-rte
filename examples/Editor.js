import React, { Component } from 'react';
import OneteamRTE, { Toolbar } from '../src';
import WebCard from './components/WebCard';
import PDFPreview from './components/PDFPreview';
import FilePlaceholder from './components/FilePlaceholder';
import { WEB_CARD, PLACEHOLDER, FILE_PLACEHOLDER } from '../src/constants';
import itemOptions from './itemOptions';
import 'prismjs/themes/prism.css';
import 'prism-github/prism-github.css';
import './index.styl';

export default class Editor extends Component {
  state = { isStripPastedStyles: window.clipboardData ? true : false }
  handleClickInsertImage = () => {
    const url = window.prompt('Enter a image URL.');
    if (url) {
      this.rte.insertImageAtomicBlock({ alt: 'ex', title: 'ex', url });
    }
  }
  handleClickUploadFile = () => {
    const url = window.prompt('Enter a file URL.');
    if (url) {
      this.rte.insertAtomicBlock('FILE_PLACEHOLDER', 'IMMUTABLE', { url });
    }
  }
  handleClickEmbedIFrame = () => {
    const html = window.prompt('Enter a iframe tag.');
    if (html) {
      this.rte.insertIFrameAtomicBlock(html);
    }
  }
  focus = () => this.rte.focus()
  renderToolbar() {
    return (
      <Toolbar
        itemOptions={itemOptions}
        onClickInsertImage={this.handleClickInsertImage}
        onClickUploadFile={this.handleClickUploadFile}
        onMouseDownEmbedIFrame={this.handleClickEmbedIFrame}
        onHeadingToggled={this.focus}
      />
    );
  }
  componentDidMount() {
    setTimeout(() => this.rte.focus(), 100);
  }
  render() {
    return (
      <OneteamRTE
        initialHtml='<h1>Oneteam Rich Text Editor</h1>'
        ref={c => window.rte = this.rte = this.props.onMount(c)}
        onError={() => alert('Error')}
        placeholder='Write something here...'
        atomicBlockRenderMap={{
          [WEB_CARD]: WebCard,
          [PLACEHOLDER]: PDFPreview,
          [FILE_PLACEHOLDER]: FilePlaceholder
        }}
        rawMentions={mentions}
        stripPastedStyles={this.state.isStripPastedStyles}
      >
        {this.renderToolbar()}
      </OneteamRTE>
    );
  }
}

const mentions = [
  {
    id: 'sugarshin',
    userName: 'sugarshin',
    name: 'Shingo Sato',
    email: 'shinsugar@gmail.com',
  },
  {
    id: 'ngs',
    userName: 'ngs',
    name: 'Atsushi Nagase',
    email: 'a@ngs.io',
  }
]
