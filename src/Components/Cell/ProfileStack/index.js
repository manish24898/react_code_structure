import React, { Component } from 'react';
import './styles.scss';

import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import { ProfileCard } from '../../Molecule';
import { SpeedActions, LikeAction, SpeedActionNames } from '../../../Config';
import { UIConstants } from '../../../Shared';

class ProfileStack extends Component {
    constructor(props) {
        super(props);
        this.cards = {};
    }

    shouldComponentUpdate(props) {
        return (this.props.users || []).length != (props.users || []).length;
    }

    onClickSpeedDial(name) {
        let { currentUserId, onUndo } = this.props;
        let currentUserCard = this.cards[`card${currentUserId}`];
        if (currentUserCard) {
            switch (name) {
                case SpeedActionNames.UNDO:
                    return onUndo();
                case SpeedActionNames.LIKE:
                    return currentUserCard.like();
                case SpeedActionNames.DISLIKE:
                    return currentUserCard.dislike();
                default:
                    return;
            }
        }
    }

    renderSpeedDial() {
        return (
            <SpeedDial
                className={'speed-dial'}
                ariaLabel={'SpeedDial'}
                icon={LikeAction.icon}
                open={true}
                onClick={this.onClickSpeedDial.bind(this, LikeAction.name)}
            >
                {SpeedActions.map(action => {
                    let { name, icon } = action;
                    return (
                        <SpeedDialAction
                            key={name}
                            icon={icon}
                            tooltipTitle={name}
                            onClick={this.onClickSpeedDial.bind(this, name)}
                        />
                    );
                })}
            </SpeedDial>
        );
    }

    render() {
        let { users, onLike, onDislike, removeUser } = this.props;
        let usersToShow = users.filter((_, index) => {
            return index < UIConstants.renderProfileCount;
        });
        return (
            <Grid container className={'profile-stack'} justify={'center'}>
                <Grid item xs={12} sm={10} md={8} className={'profiles-wrapper'}>
                    {usersToShow.map((user, index) => {
                        let { id, images = [], name, distance, age } = user;
                        return (
                            <ProfileCard
                                ref={ref => this.cards[`card${id}`] = ref}
                                key={id}
                                id={id}
                                index={index}
                                zIndex={UIConstants.renderProfileCount - index}
                                images={images}
                                name={name}
                                distance={distance}
                                age={age}
                                onLike={onLike}
                                onDislike={onDislike}
                                removeUser={removeUser}
                            />
                        );
                    })}
                    {this.renderSpeedDial()}
                </Grid>
            </Grid>
        );
    }
}

ProfileStack.defaultProps = {
    users: [],
    onLike: () => { },
    onDislike: () => { },
}

ProfileStack.propTypes = {
    users: PropTypes.array.isRequired,
    onLike: PropTypes.func.isRequired,
    onDislike: PropTypes.func.isRequired,
}

export default ProfileStack;
