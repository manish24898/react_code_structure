import React from 'react';
import './styles.scss';

import { MobileStepper } from '@material-ui/core';

const CarouselIndicator = ({
    className,
    steps,
    activeStep,
    ...restProps
}) => {
    return (
        <MobileStepper
            steps={steps}
            activeStep={activeStep}
            position={'static'}
            className={`carousel-custom-indicator ${className}`}
            variant={'dots'}
            {...restProps}
        />
    );
}

export default CarouselIndicator
