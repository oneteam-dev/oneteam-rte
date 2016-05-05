import isFunction from 'lodash/isFunction';
import React, { Component, PropTypes } from 'react';
import { EditorState } from 'draft-js';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import classnames from 'classnames';
import {
  BaseButton, Bold, Italic, Strikethrough, Heading, Blockquote, CheckableList,
  UnorderedList, OrderedList, Divider, AddLink, RemoveLink
} from './ui';
import { hasCurrentInlineStyle, getCurrentBlockType, checkCurrentBlockType } from './utils';
import { BLOCK_TYPES, INLINE_STYLES, HEADER_BLOCK_TYPES } from './constants';
import DEFAULT_ITEM_OPTONS, * as ITEM_NAMES from './constants/toolbar';

export default class Toolbar extends Component {
  static get propTypes() {
    return {
      editorState: PropTypes.instanceOf(EditorState),
      checkedState: PropTypes.objectOf(PropTypes.bool),
      changeEditorState: PropTypes.func,

      children: PropTypes.node,
      onClickInsertImage: PropTypes.func,
      onClickUploadFile: PropTypes.func,
      onMouseDownEmbedIFrame: PropTypes.func,
      onSubmitAddLink: PropTypes.func,
      onMouseDownRemoveLink: PropTypes.func,
      onToggleHeadingAfter: PropTypes.func,
      itemOptions: PropTypes.objectOf(
        PropTypes.shape({
          description: PropTypes.string,
          name: PropTypes.string,
          iconNode: PropTypes.node,
          activeIconNode: PropTypes.node
        })
      )
    };
  }
  static get defaultProps() {
    return {
      itemOptions: DEFAULT_ITEM_OPTONS
    };
  }
  constructor(props) {
    super(props);

    this.handleClickInsertImage = ev => this._handleClickInsertImage(ev);
    this.handleClickUploadFile = ev => this._handleClickUploadFile(ev);
    this.handleMouseDownEmbedIFrame = ev => this._handleMouseDownEmbedIFrame(ev);
    this.handleInsertLink = editorState => this._changeEditorState(editorState);
    this.handleRemoveLink = editorState => this._changeEditorState(editorState);
    this.handleToggleBlockType = editorState => this._changeEditorState(editorState);
    this.handleToggleInlineStyle = editorState => this._changeEditorState(editorState);
    this.handleToggleHeading = editorState => {
      this._changeEditorState(editorState);
      this._toggleHeadingAfter();
    };
  }
  render() {
    const { editorState, children, itemOptions } = this.props;

    return (
      <div className='rich-text-editor-toolbar'>{children ? children : [
        <BaseButton
          key={ITEM_NAMES.INSERT_IMAGE}
          className='rich-text-editor-button rich-text-editor-button--insert-image'
          onClick={this.handleClickInsertImage}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.INSERT_IMAGE}>{itemOptions[ITEM_NAMES.INSERT_IMAGE].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.INSERT_IMAGE].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

        <BaseButton
          key={ITEM_NAMES.UPLOAD_FILE}
          className='rich-text-editor-button rich-text-editor-button--upload-file'
          onClick={this.handleClickUploadFile}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.UPLOAD_FILE}>{itemOptions[ITEM_NAMES.UPLOAD_FILE].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.UPLOAD_FILE].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

        <BaseButton
          key={ITEM_NAMES.EMBED_IFRAME}
          className='rich-text-editor-button rich-text-editor-button--embed-code'
          onMouseDown={this.handleMouseDownEmbedIFrame}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.EMBED_IFRAME}>{itemOptions[ITEM_NAMES.EMBED_IFRAME].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.EMBED_IFRAME].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

        <AddLink
          key={ITEM_NAMES.ADD_LINK}
          ref={c => this._addLink = c}
          editorState={editorState}
          onInsertLink={this.handleInsertLink}
          validationErrorMessage={itemOptions[ITEM_NAMES.ADD_LINK].validationErrorMessage}
          placeholder={itemOptions[ITEM_NAMES.ADD_LINK].placeholder}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.ADD_LINK}>{itemOptions[ITEM_NAMES.ADD_LINK].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.ADD_LINK].iconNode}</span>
          </OverlayTrigger>
        </AddLink>,

        <RemoveLink
          key={ITEM_NAMES.REMOVE_LINK}
          editorState={editorState}
          onRemoveLink={this.handleRemoveLink}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.REMOVE_LINK}>{itemOptions[ITEM_NAMES.REMOVE_LINK].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.REMOVE_LINK].iconNode}</span>
          </OverlayTrigger>
        </RemoveLink>,

        <Divider key={ITEM_NAMES.DIVIDER} />,

        <Heading
          className={classnames('rte-toolbar-button-heading', {
            active: HEADER_BLOCK_TYPES.some(t => t === getCurrentBlockType(editorState))
          })}
          key={ITEM_NAMES.HEADING}
          name={itemOptions[ITEM_NAMES.HEADING].name}
          closeButtonNode={itemOptions[ITEM_NAMES.HEADING].closeButtonNode}
          editorState={editorState}
          onToggleBlockType={this.handleToggleHeading}
        />,

        <Bold
          className={classnames({
            active: hasCurrentInlineStyle(editorState, INLINE_STYLES.BOLD)
          })}
          key={ITEM_NAMES.BOLD}
          editorState={editorState}
          onToggleInlineStyle={this.handleToggleInlineStyle}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.BOLD}>{itemOptions[ITEM_NAMES.BOLD].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.BOLD) &&
              itemOptions[ITEM_NAMES.BOLD].activeIconNode) || itemOptions[ITEM_NAMES.BOLD].iconNode}</span>
          </OverlayTrigger>
        </Bold>,

        <Italic
          className={classnames({
            active: hasCurrentInlineStyle(editorState, INLINE_STYLES.ITALIC)
          })}
          key={ITEM_NAMES.ITALIC}
          editorState={editorState}
          onToggleInlineStyle={this.handleToggleInlineStyle}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.ITALIC}>{itemOptions[ITEM_NAMES.ITALIC].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.ITALIC) &&
              itemOptions[ITEM_NAMES.ITALIC].activeIconNode) || itemOptions[ITEM_NAMES.ITALIC].iconNode}</span>
          </OverlayTrigger>
        </Italic>,

        <Strikethrough
          className={classnames({
            active: hasCurrentInlineStyle(editorState, INLINE_STYLES.STRIKETHROUGH)
          })}
          key={ITEM_NAMES.STRIKETHROUGH}
          editorState={editorState}
          onToggleInlineStyle={this.handleToggleInlineStyle}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.STRIKETHROUGH}>{itemOptions[ITEM_NAMES.STRIKETHROUGH].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.STRIKETHROUGH) &&
              itemOptions[ITEM_NAMES.STRIKETHROUGH].activeIconNode) || itemOptions[ITEM_NAMES.STRIKETHROUGH].iconNode}</span>
          </OverlayTrigger>
        </Strikethrough>,

        <Blockquote
          className={classnames({
            active: checkCurrentBlockType(editorState, BLOCK_TYPES.BLOCKQUOTE)
          })}
          key={ITEM_NAMES.BLOCKQUOTE}
          editorState={editorState}
          onToggleBlockType={this.handleToggleBlockType}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.BLOCKQUOTE}>{itemOptions[ITEM_NAMES.BLOCKQUOTE].description}</Tooltip>}>
            <span>{(checkCurrentBlockType(editorState, BLOCK_TYPES.BLOCKQUOTE) &&
              itemOptions[ITEM_NAMES.BLOCKQUOTE].activeIconNode) ||
              itemOptions[ITEM_NAMES.BLOCKQUOTE].iconNode}</span>
          </OverlayTrigger>
        </Blockquote>,

        <CheckableList
          className={classnames({
            active: checkCurrentBlockType(editorState, BLOCK_TYPES.CHECKABLE_LIST_ITEM)
          })}
          key={ITEM_NAMES.CHECKABLE_LIST}
          editorState={editorState}
          onToggleBlockType={this.handleToggleBlockType}>
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip
                id={ITEM_NAMES.CHECKABLE_LIST}>
                {itemOptions[ITEM_NAMES.CHECKABLE_LIST].description}
              </Tooltip>
            }>
            <span>{(checkCurrentBlockType(editorState, BLOCK_TYPES.CHECKABLE_LIST_ITEM) &&
              itemOptions[ITEM_NAMES.CHECKABLE_LIST].activeIconNode) || itemOptions[ITEM_NAMES.CHECKABLE_LIST].iconNode}</span>
          </OverlayTrigger>
        </CheckableList>,

        <UnorderedList
          className={classnames({
            active: checkCurrentBlockType(editorState, BLOCK_TYPES.UNORDERED_LIST_ITEM)
          })}
          key={ITEM_NAMES.UNOERDERD_LIST}
          editorState={editorState}
          onToggleBlockType={this.handleToggleBlockType}>
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip
                id={ITEM_NAMES.UNOERDERD_LIST}>
                {itemOptions[ITEM_NAMES.UNOERDERD_LIST].description}
              </Tooltip>
            }>
            <span>{(checkCurrentBlockType(editorState, BLOCK_TYPES.UNORDERED_LIST_ITEM) &&
              itemOptions[ITEM_NAMES.UNOERDERD_LIST].activeIconNode) || itemOptions[ITEM_NAMES.UNOERDERD_LIST].iconNode}</span>
          </OverlayTrigger>
        </UnorderedList>,

        <OrderedList
          className={classnames({
            active: checkCurrentBlockType(editorState, BLOCK_TYPES.ORDERED_LIST_ITEM)
          })}
          key={ITEM_NAMES.OERDERD_LIST}
          editorState={editorState}
          onToggleBlockType={this.handleToggleBlockType}>
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip
                id={ITEM_NAMES.OERDERD_LIST}>
                {itemOptions[ITEM_NAMES.OERDERD_LIST].description}
              </Tooltip>
            }>
            <span>{(checkCurrentBlockType(editorState, BLOCK_TYPES.ORDERED_LIST_ITEM) &&
              itemOptions[ITEM_NAMES.OERDERD_LIST].activeIconNode) ||
              itemOptions[ITEM_NAMES.OERDERD_LIST].iconNode}</span>
          </OverlayTrigger>
        </OrderedList>
      ]}</div>
    );
  }
  _handleClickInsertImage(ev) {
    if (isFunction(this.props.onClickInsertImage)) {
      this.props.onClickInsertImage(ev);
    }
  }
  _handleClickUploadFile(ev) {
    if (isFunction(this.props.onClickUploadFile)) {
      this.props.onClickUploadFile(ev);
    }
  }
  _handleMouseDownEmbedIFrame(ev) {
    if (isFunction(this.props.onMouseDownEmbedIFrame)) {
      this.props.onMouseDownEmbedIFrame(ev);
    }
  }
  _changeEditorState(editorState) {
    if (isFunction(this.props.changeEditorState)) {
      this.props.changeEditorState(editorState);
    }
  }
  _toggleHeadingAfter() {
    if (isFunction(this.props.onToggleHeadingAfter)) {
      this.props.onToggleHeadingAfter();
    }
  }
}
