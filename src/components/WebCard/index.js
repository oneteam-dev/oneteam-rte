import React, { PropTypes as T } from 'react';
import CloseIcon from '../utils/CloseIcon';
import './index.styl';

export default function WebCard({ title, url, description, image, onRender, onRemoveImage, target, ...rest }) {
  return (
    <rest.tagName className='webcard' href={url} target={target} ref={onRender}>
      { image ? <div className='image' style={{ backgroundImage: `url(${image})` }}>
        {typeof onRemoveImage === 'function' ? [
          <div key='overlay' className='overlay' />,
          <span key='remove' className='remove' onClick={onRemoveImage}>
            <CloseIcon className='icon' />
          </span>
        ] : null}
      </div> : null}
      <div className='text'>
        { title ? <p className='title'>{title}</p> : null }
        { description ? <p className='description'>{description}</p> : null }
        <p className='url'>{url}</p>
      </div>
    </rest.tagName>
  );
}

WebCard.defaultProps = { tagName: 'a', target: '_blank' };
WebCard.propTypes = {
  url: T.string,
  title: T.string,
  description: T.string,
  image: T.string,
  onRender: T.func,
  onRemoveImage: T.func,
  tagName: T.string,
  target: T.oneOf(['_self', '_blank'])
};
