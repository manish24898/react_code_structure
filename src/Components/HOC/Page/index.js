import React from 'react';
import './styles.scss';

import { Grid } from '@material-ui/core';
import { Header } from '../../Cell';

const Page = ({
    noHeader = false,
    pageClassName = '',
    containerClassName = '',
    headerProps = {},
    children
}) => {
    return (
        <Grid container className={`page-wrapper ${pageClassName}`} direction={'column'}>
            {!noHeader &&
                <Header
                    {...headerProps}
                />
            }
            <Grid container className={'page-container-wrapper'}>
                <Grid item xs={12} sm={8} md={6} className={`page-container ${containerClassName}`}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Page;
