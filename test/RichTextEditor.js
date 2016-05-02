// WIP
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';
import RichTextEditor from '../src/RichTextEditor';
import { createEditorState, createCheckedState } from '../src/utils';
import { jsdom } from 'jsdom';

const renderer = TestUtils.createRenderer();

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.HTMLElement = global.window.HTMLElement;

describe('RichTextEditor', () => {
  it('mounted', () => {
    const editorState = createEditorState('');
    const checkedState = createCheckedState(editorState.getCurrentContent().getBlocksAsArray());
    renderer.render(
      <RichTextEditor
        editorState={editorState}
        checkedState={checkedState}
        onChangeCheckedState={() => {}}
        onChange={() => {}} />
    );
    const output = renderer.getRenderOutput();
    assert(output);
  });
});
