import React from 'react';
import './styles.scss';

import { connect } from 'react-redux';
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Typography,
    ListSubheader,
    ListItemIcon
} from '@material-ui/core';
import { MenuList } from '../../../Config';
import { ImageIcon } from '../../Atom';
import { Icons } from '../../../Shared';
import { RouterService } from '../../../Services';
import { toggleDrawer } from '../../../Redux/Actions/CommonActions';

const CustomDrawer = ({
    drawerOpen,
    toggleDrawer = () => { }
}) => {
    return (
        <Drawer
            className={'custom-drawer'}
            open={drawerOpen}
            anchor={'left'}
            onClose={toggleDrawer}
        >
            <div className={'menu-lists'}>
                <div className={'drawer-header'}>
                    <Avatar
                        className={'user-avatar'}
                        src={Icons.coffeeCup}
                    />
                    <Typography className={'user-name'} variant={'h6'}>
                        Manish Kumar
                    </Typography>
                    <Typography>
                        +919876543210
                    </Typography>
                </div>
                {MenuList.map((menu, menuIndex) => {
                    let { title, items = [] } = menu;
                    return (
                        <List
                            key={menuIndex}
                            className={'menu-list'}
                            onClick={toggleDrawer}
                            subheader={title && <ListSubheader>{title}</ListSubheader>}
                        >
                            {items.map((item, itemIndex) => {
                                return (
                                    <ListItem
                                        button
                                        key={itemIndex}
                                        onClick={() => {
                                            RouterService.pushRoute(item.route);
                                        }}
                                    >
                                        <ListItemIcon>
                                            <ImageIcon src={item.icon} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.title} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    );
                })}
            </div>
        </Drawer >
    );
}

const mapStateToProps = (state) => ({
    drawerOpen: state.common.drawerOpen
});

export default connect(mapStateToProps, { toggleDrawer })(CustomDrawer);
