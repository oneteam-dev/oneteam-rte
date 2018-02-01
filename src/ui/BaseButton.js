import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const BaseButton = ({ className, active, children, ...rest }) => {
  return (
    <span
      {...rest}
      className={classnames('rich-text-editor-toolbar-button', className, { active })}
    >
      <span className='rich-text-editor-toolbar-button-inner'>
        {children ? children : null}
      </span>
    </span>
  );
};

BaseButton.propTypes = {
  className: PropTypes.string,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default BaseButton;
