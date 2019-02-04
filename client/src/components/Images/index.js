import React from 'react';

export const ImageFullHeight = ({image}) => (
  <div className={'position-relative'}>
    <img src={image} alt={'full-height'} className={'img-fluid greyscale w-100'}/>
  </div>
);
