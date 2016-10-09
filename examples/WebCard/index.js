import React, { PropTypes as T } from 'react';
import './index.styl';

export default function WebCard({ title, url, description, image, ref }) {
  return (
    <a className='webcard' href={url} target='_blank' ref={ref}>
      { image ? <div className='image' style={{ backgroundImage: `url(${image})` }} /> : null}
      <div className='text'>
        { title ? <p className='title'>{title}</p> : null }
        { description ? <p className='description'>{description}</p> : null }
        <p className='url'>{url}</p>
      </div>
    </a>
  );
}

WebCard.propTypes = {
  title: T.string,
  url: T.string,
  description: T.string,
  image: T.string,
  ref: T.func
};
