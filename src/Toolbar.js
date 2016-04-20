import findKey from 'lodash/findKey';
import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
// import  from 'react-bootstrap/lib/MenuItem';
// import DropdownButton from 'react-bootstrap/lib/DropdownButton';
// import MenuItem from 'react-bootstrap/lib/MenuItem';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import ToolbarButton from './ToolbarButton';
import {
  BLOCK_TYPES, INLINE_STYLES, ORDERED_BLOCK_TYPES, ORDERED_INLINE_STYLES,
  HEADER_BLOCK_TYPES
} from './constants';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.handleClickAddImage = ev => this._handleClickAddImage(ev);
    this.handleClickFileAttach = ev => this._handleClickFileAttach(ev);
    this.handleSelectHeading = (ev, eventKey) => this._handleSelectHeading(ev, eventKey);
  }
  render() {
    const { editorState } = this.props;
    const currentInlineStyle = editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    return (
      <div className='rich-editor-toolbar'>
        <ToolbarButton
          type='file-photo'
          iconName='file-photo'
          active={false}
          onClickButton={this.handleClickAddImage}
          buttonNode='Add image' />
        <ToolbarButton
          type='file-attach'
          iconName='file-attach'
          active={false}
          onClickButton={this.handleClickFileAttach}
          buttonNode='Attach file' />

        <span className='rich-editor-toolbar-separate'></span>

        <span className={classNames('rich-editor-toolbar-button', {
          active: HEADER_BLOCK_TYPES.some(t => t === blockType)
        })}>
          <span className='rich-editor-toolbar-button-inner width-auto'>
            <DropdownButton
              id='rich-editor-toolbar-headings'
              bsSize='small'
              title={this._getHeadingLabel(blockType)}
              className='rich-editor-toolbar-headings'
              onSelect={this.handleSelectHeading}>
              {HEADER_BLOCK_TYPES.map(type => (
                <MenuItem
                  key={type}
                  eventKey={type}
                  active={blockType === type}>
                  {this._getHeadingLabel(type)}
                </MenuItem>
              ))}
            </DropdownButton>
          </span>
        </span>

        {ORDERED_INLINE_STYLES.map(type => (
          <ToolbarButton
            key={type}
            type={type}
            iconName={this._getSvgIconName(type)}
            active={currentInlineStyle.has(type)}
            onClickButton={this.props.onClickInlineStyle}
            buttonNode={this.props.buttonNodes[type]} />
        ))}

        {ORDERED_BLOCK_TYPES.filter(type => !/^header\-/.test(type)).map(type => (
          <ToolbarButton
            key={type}
            type={type}
            iconName={this._getSvgIconName(type)}
            active={type === blockType}
            onClickButton={this.props.onClickBlockType}
            buttonNode={this.props.buttonNodes[findKey(BLOCK_TYPES, t => t === type)]} />
        ))}
      </div>
    );
  }
  _handleClickAddImage() {
    this.props.onClickAddImage();
  }
  _handleClickFileAttach() {
    this.props.onClickFileAttach();
  }
  _handleSelectHeading(eventKey) {
    // ev.preventDefault();
    // this.props.onSelectHeading(eventKey);
    setTimeout(() => this.props.onSelectHeading(eventKey), 0);
  }
  _getHeadingLabel(type) {
    const { headingLabel } = this.props;
    return HEADER_BLOCK_TYPES.some(t => t === type) ?
      `${headingLabel} ${findKey(BLOCK_TYPES, t => t === type).slice(1)}` : `${headingLabel} 1`;
  }
  _getSvgIconName(type) { // eslint-disable-line complexity
    switch(type) {
    case BLOCK_TYPES.UNORDERED_LIST_ITEM: return 'list-point';
    case BLOCK_TYPES.ORDERED_LIST_ITEM: return 'list-number';
    case BLOCK_TYPES.CHECKABLE_LIST_ITEM: return 'list-checkbox';
    case BLOCK_TYPES.BLOCKQUOTE: return 'text-quote';
    case INLINE_STYLES.BOLD: return 'text-bold';
    case INLINE_STYLES.ITALIC: return 'text-italics';
    case INLINE_STYLES.STRIKETHROUGH: return 'text-string';
    default: return '';
    }
  }
}

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  headingLabel: PropTypes.string.isRequired,
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onClickAddImage: PropTypes.func.isRequired,
  onClickFileAttach: PropTypes.func.isRequired,
  onSelectHeading: PropTypes.func.isRequired,
  onClickInlineStyle: PropTypes.func.isRequired,
  onClickBlockType: PropTypes.func.isRequired,
  buttonNodes: PropTypes.objectOf(PropTypes.node)
};
