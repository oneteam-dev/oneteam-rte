// WIP
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import assert from 'assert';
import RichTextEditor from '../src/RichTextEditor';
import { jsdom } from 'jsdom';

const renderer = TestUtils.createRenderer();

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.HTMLElement = global.window.HTMLElement;

describe('RichTextEditor', () => {
  it('is mounted', () => {
    renderer.render(
      <RichTextEditor
        placeholder='placeholder'
        readOnly={false}
        onEnterKeyDownWithCommand={() => console.log('onEnterKeyDownWithCommand')}
        onPaste={() => console.log('onPaste')}
        onClickAddImage={() => console.log('onClickAddImage')}
        onClickFileAttach={() => console.log('onClickFileAttach')}
        initialHtml={'<h1>RichTextEditor</h1>'}
        headingLabel='Heading'
        useDefaultButtons />
    );
    const output = renderer.getRenderOutput();
    assert(output);
  });
});
