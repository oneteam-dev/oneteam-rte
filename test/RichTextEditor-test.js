import React from 'react';
import renderer from 'react-test-renderer';
import RichTextEditor from '../src/RichTextEditor';

// https://github.com/facebook/jest/issues/1353
jest.mock('react-dom');

describe('RichTextEditor', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <RichTextEditor />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders correctly with Toolbar', () => {
    const tree = renderer.create(
      <RichTextEditor><RichTextEditor.Toolbar /></RichTextEditor>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
