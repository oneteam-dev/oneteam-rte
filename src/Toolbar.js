import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BLOCK_TYPES, INLINE_STYLES, HEADER_BLOCK_TYPES } from 'draft-js-oneteam-rte-plugin/lib/constants';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import classnames from 'classnames';
import {
  BaseButton, Bold, Italic, Strikethrough, Heading, Blockquote, CheckableList,
  UnorderedList, OrderedList, Divider, InsertLink, RemoveLink, BlockTypeButton, InlineStyleButton
} from './ui';
import { hasCurrentInlineStyle, getCurrentBlockType, checkCurrentBlockType } from './utils';
import DEFAULT_ITEM_OPTIONS, * as ITEM_NAMES from './constants/toolbar';

export default class Toolbar extends Component {
  static propTypes = {
    editorState: PropTypes.instanceOf(EditorState), // Required, but inherited from parent (RichTextEditor) component
    onChange: PropTypes.func, // Required, but inherited from parent (RichTextEditor) component
    toggleInsertLinkInput: PropTypes.func, // Required, but inherited from parent (RichTextEditor) component
    isOpenInsertLinkInput: PropTypes.bool.isRequired,

    children: PropTypes.node,
    onClickInsertImage: PropTypes.func.isRequired,
    onClickUploadFile: PropTypes.func.isRequired,
    onMouseDownEmbedIFrame: PropTypes.func.isRequired,
    onHeadingToggled: PropTypes.func.isRequired,
    itemOptions: PropTypes.objectOf(
      PropTypes.shape({
        description: PropTypes.string,
        name: PropTypes.string,
        iconNode: PropTypes.node,
        activeIconNode: PropTypes.node
      })
    )
  }
  static defaultProps = {
    itemOptions: DEFAULT_ITEM_OPTIONS,
    isOpenInsertLinkInput: false
  }

  handleToggleHeading = editorState => {
    this.props.onChange(editorState);
    this.props.onHeadingToggled();
  }

  render() {
    const {
      editorState, children, itemOptions, isOpenInsertLinkInput, onChange, onClickInsertImage, onClickUploadFile, toggleInsertLinkInput,
      onMouseDownEmbedIFrame
    } = this.props;

    return (
      <div className='rich-text-editor-toolbar'>{children ? children : [
        <BaseButton
          key={ITEM_NAMES.INSERT_IMAGE}
          className='rich-text-editor-button rich-text-editor-button--insert-image'
          onClick={onClickInsertImage}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.INSERT_IMAGE}>{itemOptions[ITEM_NAMES.INSERT_IMAGE].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.INSERT_IMAGE].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

        <BaseButton
          key={ITEM_NAMES.UPLOAD_FILE}
          className='rich-text-editor-button rich-text-editor-button--upload-file'
          onClick={onClickUploadFile}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.UPLOAD_FILE}>{itemOptions[ITEM_NAMES.UPLOAD_FILE].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.UPLOAD_FILE].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

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
          key={ITEM_NAMES.BOLD}
          editorState={editorState}
          onToggleInlineStyle={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.BOLD}>{itemOptions[ITEM_NAMES.BOLD].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.BOLD) &&
              itemOptions[ITEM_NAMES.BOLD].activeIconNode) || itemOptions[ITEM_NAMES.BOLD].iconNode}</span>
          </OverlayTrigger>
        </Bold>,

        <Italic
          key={ITEM_NAMES.ITALIC}
          editorState={editorState}
          onToggleInlineStyle={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.ITALIC}>{itemOptions[ITEM_NAMES.ITALIC].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.ITALIC) &&
              itemOptions[ITEM_NAMES.ITALIC].activeIconNode) || itemOptions[ITEM_NAMES.ITALIC].iconNode}</span>
          </OverlayTrigger>
        </Italic>,

        <InlineStyleButton
          key={INLINE_STYLES.CODE}
          type={INLINE_STYLES.CODE}
          editorState={editorState}
          onToggle={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.CODE}>{itemOptions[ITEM_NAMES.CODE].description}</Tooltip>}>
            <span>
              {(hasCurrentInlineStyle(editorState, INLINE_STYLES.CODE) &&
                itemOptions[ITEM_NAMES.CODE].activeIconNode) ||
                itemOptions[ITEM_NAMES.CODE].iconNode}
            </span>
          </OverlayTrigger>
        </InlineStyleButton>,

        <Blockquote
          key={ITEM_NAMES.BLOCKQUOTE}
          editorState={editorState}
          onToggleBlockType={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.BLOCKQUOTE}>{itemOptions[ITEM_NAMES.BLOCKQUOTE].description}</Tooltip>}>
            <span>{(checkCurrentBlockType(editorState, BLOCK_TYPES.BLOCKQUOTE) &&
              itemOptions[ITEM_NAMES.BLOCKQUOTE].activeIconNode) ||
              itemOptions[ITEM_NAMES.BLOCKQUOTE].iconNode}</span>
          </OverlayTrigger>
        </Blockquote>,

        <Strikethrough
          key={ITEM_NAMES.STRIKETHROUGH}
          editorState={editorState}
          onToggleInlineStyle={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.STRIKETHROUGH}>{itemOptions[ITEM_NAMES.STRIKETHROUGH].description}</Tooltip>}>
            <span>{(hasCurrentInlineStyle(editorState, INLINE_STYLES.STRIKETHROUGH) &&
              itemOptions[ITEM_NAMES.STRIKETHROUGH].activeIconNode) || itemOptions[ITEM_NAMES.STRIKETHROUGH].iconNode}</span>
          </OverlayTrigger>
        </Strikethrough>,

        <CheckableList
          key={ITEM_NAMES.CHECKABLE_LIST}
          editorState={editorState}
          onToggleBlockType={onChange}>
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
          key={ITEM_NAMES.UNOERDERD_LIST}
          editorState={editorState}
          onToggleBlockType={onChange}>
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
          key={ITEM_NAMES.OERDERD_LIST}
          editorState={editorState}
          onToggleBlockType={onChange}>
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
        </OrderedList>,

        <InsertLink
          key={ITEM_NAMES.INSERT_LINK}
          editorState={editorState}
          onInsertLink={onChange}
          isOpen={isOpenInsertLinkInput}
          onMouseDownToggle={toggleInsertLinkInput}
          validationErrorMessage={itemOptions[ITEM_NAMES.INSERT_LINK].validationErrorMessage}
          placeholder={itemOptions[ITEM_NAMES.INSERT_LINK].placeholder}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.INSERT_LINK}>{itemOptions[ITEM_NAMES.INSERT_LINK].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.INSERT_LINK].iconNode}</span>
          </OverlayTrigger>
        </InsertLink>,

        <RemoveLink
          key={ITEM_NAMES.REMOVE_LINK}
          editorState={editorState}
          onRemoveLink={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.REMOVE_LINK}>{itemOptions[ITEM_NAMES.REMOVE_LINK].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.REMOVE_LINK].iconNode}</span>
          </OverlayTrigger>
        </RemoveLink>,

        <BaseButton
          key={ITEM_NAMES.EMBED_IFRAME}
          className='rich-text-editor-button rich-text-editor-button--embed-code'
          onMouseDown={onMouseDownEmbedIFrame}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.EMBED_IFRAME}>{itemOptions[ITEM_NAMES.EMBED_IFRAME].description}</Tooltip>}>
            <span>{itemOptions[ITEM_NAMES.EMBED_IFRAME].iconNode}</span>
          </OverlayTrigger>
        </BaseButton>,

        <BlockTypeButton
          key={BLOCK_TYPES.CODE_BLOCK}
          type={BLOCK_TYPES.CODE_BLOCK}
          editorState={editorState}
          onToggle={onChange}>
          <OverlayTrigger
            placement='bottom'
            overlay={<Tooltip id={ITEM_NAMES.CODE_BLOCK}>{itemOptions[ITEM_NAMES.CODE_BLOCK].description}</Tooltip>}>
            <span>
              {(checkCurrentBlockType(editorState, BLOCK_TYPES.CODE_BLOCK) &&
                itemOptions[ITEM_NAMES.CODE_BLOCK].activeIconNode) ||
                itemOptions[ITEM_NAMES.CODE_BLOCK].iconNode}
            </span>
          </OverlayTrigger>
        </BlockTypeButton>,
      ]}</div>
    );
  }
}
