// WIP
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';
import RichTextEditor from '../src';
import { jsdom } from 'jsdom';

const renderer = TestUtils.createRenderer();

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
propagateToGlobal(window);

// https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal(window) {
  for (let key in window) {
    if (!window.hasOwnProperty(key)) continue;
    if (key in global) continue;
    global[key] = window[key];
  }
}

describe('RichTextEditor', () => {
  it('mounted', () => {
    renderer.render(
      <RichTextEditor initialHtml=''>
        <RichTextEditor.Toolbar />
        <RichTextEditor.Body />
      </RichTextEditor>
    );
    const output = renderer.getRenderOutput();
    assert(output);
  });
});
