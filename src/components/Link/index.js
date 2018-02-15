import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Link = ({ className, ...props }) => <span {...props} className={classNames('link', className)} />;
Link.propTypes = { className: PropTypes.string };
export default Link;
