import findKey from 'lodash/findKey';
import React, { Component, PropTypes } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { EditorState } from 'draft-js';
import BaseButton from './BaseButton';
import toggleBlockType from '../functions/toggleBlockType';
import getCurrentBlockType from '../utils/getCurrentBlockType';
import { BLOCK_TYPES, HEADER_BLOCK_TYPES } from '../constants';

export default class Heading extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState).isRequired,
      onToggleBlockType: PropTypes.func.isRequired,
      className: PropTypes.string,
      name: PropTypes.string,
      closeButtonNode: PropTypes.node
    };
  }
  static get defaultProps() {
    return { className: '', name: 'Heading' };
  }
  constructor(props) {
    super(props);
    this.handleSelect = eventKey => this._handleSelect(eventKey);
  }
  render() {
    const blockType = getCurrentBlockType(this.props.editorState);

    return (
      <BaseButton className={this.props.className}>
        <DropdownButton
          id='rte-toolbar-heading'
          bsSize='small'
          title={this._createName(blockType)}
          className='rte-toolbar-heading'
          onSelect={this.handleSelect}>
          {HEADER_BLOCK_TYPES.map(type => (
            <MenuItem
              className='rte-toolbar-heading-menu'
              key={type}
              eventKey={type}
              active={blockType === type}>
              {this._createName(type)}
              {blockType === type ? this.props.closeButtonNode : null}
            </MenuItem>
          ))}
        </DropdownButton>
      </BaseButton>
    );
  }
  _handleSelect(type) {
    // this.props.onToggleBlockType(type);
    setTimeout(() => this.props.onToggleBlockType(toggleBlockType(this.props.editorState, type)), 0);
  }
  _createName(type) {
    const { name } = this.props;
    return HEADER_BLOCK_TYPES.some(t => t === type) ?
      `${name} ${findKey(BLOCK_TYPES, t => t === type).slice(1)}` : `${name} 1`;
  }
}
