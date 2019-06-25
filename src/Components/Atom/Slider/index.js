import React from 'react';
import './styles.scss';

const Slider = ({
    className = '',
    ...restProps
}) => {
    return (
        <input
            type={'range'}
            className={`custom-slider ${className}`}
            {...restProps}
        />
    );
}

export default Slider;
