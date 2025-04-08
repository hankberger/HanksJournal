import React from 'react';
import './HeaderPic.css';

interface CircularImageProps {
  src: string;
  alt?: string;
  size?: number; // Size in pixels (width and height)
}

const HeaderPic: React.FC<CircularImageProps> = ({ src, alt = 'Circular Image', size = 150 }) => {
  const imageStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  return (
  <div className='HeaderPic'>
    <img src={src} alt={alt} className="circular-image" style={imageStyle} />
    <h1>Hank's Journal</h1>
  </div>)
};

export default HeaderPic;
