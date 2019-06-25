import React, { Component } from 'react';
import './styles.scss';

import { Grid, Typography } from '@material-ui/core';
import Hammer from 'react-hammerjs';
import { Utility } from '../../../Services';
import { Check, Close, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import { ImageIcon } from '../../Atom';
import { Icons } from '../../../Shared';

Number.prototype.map = function ({ inputRange: [iMin, iMax], outputRange: [oMin, oMax], clamp = false }) {
    let finalValue = (this.valueOf() - iMin) / (iMax - iMin) * (oMax - oMin) + oMin;
    if (clamp) {
        if (finalValue > oMax) {
            return oMax
        } else if (finalValue < oMin) {
            return oMin
        }
    }
    return finalValue;
}


class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageIndex: 1,
            x: 0,
            y: 0,
            initialPosition: { x: 0, y: 0 },
            animate: true,
        }

        this.swipeThreshold = 150;
        this.rotationThreshold = 15;
    }

    handlePanStart() {
        this.setState({
            animate: false
        });
    }

    handlePan(event) {
        this.setState({
            x: event.deltaX,
            y: event.deltaY
        });
    }

    handlePanEnd(event) {
        const getDirection = () => {
            let xOffset = event.deltaX * Math.floor(Math.abs(event.velocityX) + 1);

            switch (true) {
                case (xOffset < -this.swipeThreshold):
                    return -1;
                case (xOffset > this.swipeThreshold):
                    return 1;
                default: return 0;
            }
        }

        const direction = getDirection();

        if (direction) {
            if (direction > 0) {
                this.like();
            } else {
                this.dislike();
            }
        } else {
            this.setState({ animate: true }, () => {
                this.resetPosition();
            });
        }
    }

    like() {
        this.props.onLike(this.props.id);
        this.animateCard({
            toX: this.state.initialPosition.x + 5 * this.swipeThreshold,
            duration: 20
        }, () => {
            this.props.removeUser(this.props.id);
        });
    }

    dislike() {
        this.props.onDislike(this.props.id);
        this.animateCard({
            toX: this.state.initialPosition.x - 5 * this.swipeThreshold,
            duration: 20
        }, () => {
            this.props.removeUser(this.props.id);
        });
    }

    resetPosition() {
        this.setState({
            x: 0,
            y: 0,
            initialPosition: { x: 0, y: 0 }
        });
    }

    animateCard({ toX, duration = 10 }, callback) {
        let offset = toX - this.state.x;
        let changeOffset = offset / duration;

        let animation = () => {
            let { x } = this.state
            if ((toX < 0 && x + this.state.initialPosition.x <= toX) || (toX > 0 && x - this.state.initialPosition.x >= toX)) {
                callback && callback();
                clearInterval(this.interval);
            } else {
                this.setState(state => ({
                    x: state.x + changeOffset
                }));
            }
        }

        this.interval = setInterval(animation, 1);
        setImmediate(animation);
    }

    changeImageIndex() {
        let imagesLength = (this.props.images || []).length;
        this.setState(state => {
            let imageIndex = state.imageIndex + 1;
            if (imageIndex < 1) {
                imageIndex = imagesLength;
            } else if (imageIndex > imagesLength) {
                imageIndex = 1;
            }

            return {
                imageIndex
            };
        });
    }

    render() {
        let {
            index,
            zIndex,
            images = [],
            name = '',
            distance = 0,
            age = 0
        } = this.props;
        let {
            imageIndex,
            animate,
            x,
            y,
            initialPosition
        } = this.state;
        let xOffset = x - initialPosition.x;

        let rotation = xOffset.map({
            inputRange: [-4 * this.swipeThreshold, 4 * this.swipeThreshold],
            outputRange: [-this.rotationThreshold, this.rotationThreshold],
            clamp: true
        });

        const style = {
            ...Utility.translate3d(x, y, rotation),
            ...Utility.translateCardPosition(index),
            zIndex
        };
        let movingRight = xOffset > 0;
        let overlayOpacity = Math.abs(xOffset).map({
            inputRange: [0, this.swipeThreshold / 2],
            outputRange: [0, 1],
            clamp: true
        });
        return (
            <Hammer
                direction={'DIRECTION_ALL'}
                onPanStart={this.handlePanStart.bind(this)}
                onPan={this.handlePan.bind(this)}
                onPanEnd={event => this.handlePanEnd(event)}
            >
                <Grid
                    container
                    style={style}
                    className={`profile-card ${animate ? 'animate' : 'inactive'}`}
                >
                    <SwipeableViews
                        index={imageIndex - 1}
                        className={'image-slider'}
                    >
                        {images.map((image, index) => {
                            return (
                                <img key={index} className={'user-image'} alt={'user'} draggable={false} src={image} />
                            );
                        })}
                    </SwipeableViews>
                    <Grid container className={'user-info-wrapper'}>
                        <Grid item xs={12}>
                            <Typography variant={'h6'} className={'user-name'}>
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={'user-info'}>
                                {distance} km away | {age} years old
                            </Typography>
                        </Grid>
                    </Grid>
                    <div className={'card-overlay'} style={{ opacity: overlayOpacity }}>
                        {movingRight ?
                            <Check className={'like-icon'} />
                            :
                            <Close className={'dislike-icon'} />
                        }
                        <Typography className={'overlay-info'}>
                            {movingRight ?
                                'Like'
                                :
                                'Dislike'
                            }
                        </Typography>
                    </div>
                    <Grid className={'card-fixed-header'} container justify={'space-between'}>
                        <button className={'image-index-indicator'} onClick={this.changeImageIndex.bind(this)}>
                            <KeyboardArrowLeft />
                            <span className={'index-text'}>{imageIndex}</span>
                            <span>/</span>
                            <span className={'index-text'}>{images.length}</span>
                            <KeyboardArrowRight />
                        </button>
                        <button className={'user-info-button'}>
                            <ImageIcon
                                src={Icons.info}
                                size={12}
                            />
                        </button>
                    </Grid>
                </Grid>
            </Hammer>
        );
    }
}

export default ProfileCard
