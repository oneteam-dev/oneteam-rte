import findKey from 'lodash/findKey';
import React, { Component, PropTypes } from 'react';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import { EditorState } from 'draft-js';
import classNames from 'classnames';
import ToolbarButton from './ToolbarButton';
import {
  BLOCK_TYPES, ORDERED_BLOCK_TYPES, ORDERED_INLINE_STYLES, HEADER_BLOCK_TYPES
} from './constants';

export default class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.handleSelectHeading = eventKey => this._handleSelectHeading(eventKey);
    this.handleClickEmbed = () => this._handleClickEmbed();
  }
  render() {
    const {
      editorState, onClickAddImage, onClickFileAttach, useDefaultButtons,
      onClickInlineStyle, onClickBlockType, tooltipTexts
    } = this.props;
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
          active={false}
          tooltipText={tooltipTexts.addPhoto}
          onClickButton={onClickAddImage}>{useDefaultButtons ? 'file-photo' : null}</ToolbarButton>
        <ToolbarButton
          type='file-attach'
          active={false}
          tooltipText={tooltipTexts.attachFile}
          onClickButton={onClickFileAttach}>{useDefaultButtons ? 'file-attach' : null}</ToolbarButton>
        <ToolbarButton
          type='embed-iframe'
          active={false}
          tooltipText={tooltipTexts.embedIFrame}
          onClickButton={this.handleClickEmbed}>{useDefaultButtons ? 'embed-iframe' : null}</ToolbarButton>

        <span className='rich-editor-toolbar-separate'></span>

        <OverlayTrigger placement='bottom' overlay={<Tooltip id='heading'>{tooltipTexts.heading}</Tooltip>}>
          <span className={classNames('rich-editor-toolbar-button', {
            active: HEADER_BLOCK_TYPES.some(t => t === blockType)
          })}>
            <span className={classNames([
              'rich-editor-toolbar-button-inner',
              'rich-editor-toolbar-headings',
              'width-auto'
            ])}>
              <DropdownButton
                id='rich-editor-toolbar-headings'
                bsSize='small'
                title={this._createHeadingLabel(blockType)}
                className='rich-editor-toolbar-headings'
                onSelect={this.handleSelectHeading}>
                {HEADER_BLOCK_TYPES.map(type => (
                  <MenuItem
                    className='rich-editor-toolbar-headings-menu'
                    key={type}
                    eventKey={type}
                    active={blockType === type}>
                    {this._createHeadingLabel(type)}
                    {blockType === type ? <span className='rich-editor-toolbar-headings-remove'>x</span> : null}
                  </MenuItem>
                ))}
              </DropdownButton>
            </span>
          </span>
        </OverlayTrigger>

        {ORDERED_INLINE_STYLES.map(type => (
          <ToolbarButton
            key={type}
            type={type}
            tooltipText={tooltipTexts[type]}
            active={currentInlineStyle.has(type)}
            onClickButton={onClickInlineStyle}>{useDefaultButtons ? type : null}</ToolbarButton>
        ))}

        {ORDERED_BLOCK_TYPES.filter(type => !/^header\-/.test(type)).map(type => (
          <ToolbarButton
            key={type}
            type={type}
            active={type === blockType}
            tooltipText={tooltipTexts[type]}
            onClickButton={onClickBlockType}>{useDefaultButtons ? type : null}</ToolbarButton>
        ))}
      </div>
    );
  }
  _handleSelectHeading(eventKey) {
    // this.props.onSelectHeading(eventKey);
    setTimeout(() => this.props.onSelectHeading(eventKey), 0);
  }
  _handleClickEmbed() {
    this.props.onClickEmbed();
  }
  _createHeadingLabel(type) {
    const { headingLabel } = this.props;
    return HEADER_BLOCK_TYPES.some(t => t === type) ?
      `${headingLabel} ${findKey(BLOCK_TYPES, t => t === type).slice(1)}` : `${headingLabel} 1`;
  }
}

Toolbar.displayName = 'Toolbar';
Toolbar.propTypes = {
  headingLabel: PropTypes.string.isRequired,
  editorState: PropTypes.instanceOf(EditorState).isRequired,
  onClickAddImage: PropTypes.func.isRequired,
  onClickFileAttach: PropTypes.func.isRequired,
  onClickEmbed: PropTypes.func.isRequired,
  onSelectHeading: PropTypes.func.isRequired,
  onClickInlineStyle: PropTypes.func.isRequired,
  onClickBlockType: PropTypes.func.isRequired,
  useDefaultButtons: PropTypes.bool.isRequired,
  tooltipTexts: PropTypes.objectOf(PropTypes.string).isRequired
};
