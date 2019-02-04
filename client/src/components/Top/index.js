import React from 'react';
import './top.css';

export const ReturnToTop = () => (
  <div className={'return-to-top-container'} onClick={() => {window.scroll(0, 0)}}>
    <span>^</span>
  </div>
);
