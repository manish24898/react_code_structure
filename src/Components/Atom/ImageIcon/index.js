import React from 'react';
import './styles.scss';

const ImageIcon = ({
    className = '',
    src,
    size
}) => {
    return (
        <img
            className={`image-icon ${className}`}
            alt={'icon'}
            src={src}
            style={size && { width: size, height: size }}
        />
    );
}

export default ImageIcon
