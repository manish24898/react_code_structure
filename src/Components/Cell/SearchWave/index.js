import React from 'react';
import './styles.scss';

import { Avatar } from '@material-ui/core';

const SearchWave = ({
    avatar = 'https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png'
}) => {
    return (
        <div className={'search-wave'}>
            <div className={'wave-ring ring-one'} />
            <div className={'wave-ring ring-two'} />
            <div className={'wave-ring ring-three'} />
            <div className={'wave-ring ring-four'} />
            <div className={'wave-ring ring-five'} />
            <Avatar
                className={'user-image'}
                src={avatar}
            />
        </div>
    );
}

export default SearchWave;
