import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import {
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Typography,
    Avatar
} from '@material-ui/core';
import {
    Menu as MenuIcon, ArrowBack
} from '@material-ui/icons';
import { Icons } from '../../../Shared';
import { toggleDrawer } from '../../../Redux/Actions/CommonActions';
import { RouterService } from '../../../Services';

const Header = ({
    hasDrawer = true,
    title,
    leftIcon,
    onLeft,
    hasCenterIcon = false,
    centerIcon = Icons.coffeeCup,
    rightIcon,
    onRight,
    toggleDrawer = () => { }
}) => {
    return (
        <AppBar className={'header'} color={'inherit'} position={'relative'} elevation={2}>
            <Grid container justify={'center'}>
                <Grid item xs={12} sm={8} md={6}>
                    <Toolbar>
                        <Grid container justify={'space-between'} alignItems={'center'}>
                            <div className={'icon-title-wrapper'}>
                                <IconButton
                                    className={title && 'icon-margin-right'}
                                    disabled={!!leftIcon && !onLeft}
                                    onClick={
                                        !!onLeft ?
                                            onLeft
                                            :
                                            hasDrawer ?
                                                toggleDrawer
                                                :
                                                RouterService.gotoHome
                                    }
                                >
                                    {!!leftIcon ?
                                        leftIcon
                                        :
                                        hasDrawer ?
                                            <MenuIcon color={'primary'} />
                                            :
                                            <ArrowBack color={'primary'} />
                                    }
                                </IconButton>
                                {!!title &&
                                    <Typography variant={'h6'}>
                                        {title}
                                    </Typography>
                                }
                            </div>
                            {hasCenterIcon &&
                                <Avatar
                                    style={{ borderRadius: 0 }}
                                    imgProps={{ className: 'center-icon' }}
                                    src={centerIcon}
                                />
                            }

                            <IconButton
                                aria-owns={true ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                disabled={!rightIcon}
                                onClick={onRight}
                                color="inherit"
                            >
                                {rightIcon}
                            </IconButton>
                        </Grid>
                    </Toolbar>
                </Grid>
            </Grid>
        </AppBar>
    );
}

export default connect(null, { toggleDrawer })(Header);

