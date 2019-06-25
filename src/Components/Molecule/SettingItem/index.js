import React, { useState } from 'react';
import './styles.scss';

import { withRouter } from 'react-router-dom';

import {
    ListItem,
    ListItemText,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Grid,
    Typography,
} from '@material-ui/core';
import { Slider } from '@material-ui/lab';
import { RouterService } from '../../../Services';

const SettingItem = ({
    match,
    setting = {},
    values,
    onChangeSetting = () => { }
}) => {
    let {
        key,
        name,
        description,
        range,
        prompt,
        options,
        isBoolean,
        subSettingRoute
    } = setting;
    let value = values[key];

    let [isModalOpen, setModelOpen] = useState(false);
    let [rangeValue, setRangeValue] = useState(value);

    return (
        <React.Fragment>
            <ListItem
                button
                className={'setting-item'}
                onClick={() => {
                    if (isBoolean) {
                        onChangeSetting(!value);
                    } else if (!!options || !!range || !!prompt) {
                        setModelOpen(true);
                    } else if (subSettingRoute) {
                        RouterService.pushRoute(`${match.url}${subSettingRoute}`);
                    }
                }}
            >
                <ListItemText
                    primary={name}
                    secondary={
                        description || (!!range ? `${value} ${values['distanceUnit']}` : value)
                    }
                />
                {isBoolean &&
                    <Checkbox
                        disableRipple
                        checked={value}
                        color={'primary'}
                    />
                }
            </ListItem>

            {(!!options || !!range || !!prompt) &&
                <Dialog
                    fullWidth
                    maxWidth={'xs'}
                    open={isModalOpen}
                    onClose={() => setModelOpen(false)}
                    className={'setting-modal'}
                >
                    <DialogTitle>
                        <Grid container justify={'space-between'}>
                            <Typography variant={'h6'}>
                                {name}
                            </Typography>
                            {!!range &&
                                <Typography>
                                    {rangeValue} {values['distanceUnit']}
                                </Typography>
                            }
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        {!!options &&
                            <RadioGroup
                                value={value}
                                onChange={({ target }) => {
                                    onChangeSetting(target.value);
                                    setModelOpen(false);
                                }}
                            >
                                {options.map((option, index) => {
                                    return (
                                        <FormControlLabel
                                            key={index}
                                            label={option}
                                            value={option}
                                            control={<Radio color={'primary'} />}
                                        />
                                    );
                                })}
                            </RadioGroup>
                        }
                        {!!range &&
                            <Slider
                                className={'distance-slider'}
                                value={rangeValue}
                                min={range.min}
                                max={range.max}
                                step={1}
                                onChange={(_, value) => {
                                    setRangeValue(value);
                                }}
                            />
                        }
                    </DialogContent>
                    <DialogActions>
                        <Grid container justify={range ? 'center' : 'flex-end'}>
                            {(!!options || !!prompt) &&
                                <Button
                                    onClick={() => setModelOpen(false)}
                                    color={'primary'}
                                >
                                    Cancel
                                </Button>
                            }
                            {!!prompt &&
                                <Button
                                    onClick={() => setModelOpen(false)}
                                    color={'primary'}
                                >
                                    OK
                                </Button>
                            }
                            {!!range &&
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={() => {
                                        onChangeSetting(rangeValue);
                                        setModelOpen(false);
                                    }}
                                >
                                    Set
                                </Button>
                            }
                        </Grid>
                    </DialogActions>
                </Dialog>
            }
        </React.Fragment>
    );
}

export default withRouter(SettingItem);
