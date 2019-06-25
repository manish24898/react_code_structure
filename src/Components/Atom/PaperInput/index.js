import React from 'react';
import './styles.scss';

import { Paper, InputBase } from '@material-ui/core';

const PaperInput = ({
    className,
    ...restProps
}) => {
    return (
        <Paper className={'paper-input-wrapper'}>
            <InputBase
                className={`paper-input-field ${className}`}
                {...restProps}
            />
        </Paper>
    );
}

export default PaperInput;
