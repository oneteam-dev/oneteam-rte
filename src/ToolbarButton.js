import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
// import SvgIcon from 'components/utils/SvgIcon';

export default class ToolbarButton extends Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = ev => this._handleMouseDown(ev);
  }
  render() {
    const { active, iconName } = this.props;
    return (
      <span
        className={classNames('rich-editor-toolbar-button', { active })}
        onMouseDown={this.handleMouseDown}>
        <span className='rich-editor-toolbar-button-inner'>
          {this.props.buttonNode}
          {/*<img className={'svg-icon icon ' + this.props.name} src={this._svg} onClick={this.props.onClick}/>
          <SvgIcon name={`${iconName}${active ? '-blue' : ''}`} />*/}
        </span>
      </span>
    );
  }
  _handleMouseDown(ev) {
    ev.preventDefault();
    this.props.onClickButton(this.props.type);
  }
}

ToolbarButton.displayName = 'ToolbarButton';
ToolbarButton.propTypes = {
  type: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onClickButton: PropTypes.func.isRequired,
  buttonNode: PropTypes.node
};
