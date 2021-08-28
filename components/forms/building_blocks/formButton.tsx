// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Button, ButtonProps, makeStyles } from '@material-ui/core';
import styles from './formButton.module.css';

// ===================================================================
//                             Styling
// ===================================================================
const buttonStyling = makeStyles(
    {
        outlinedPrimary: {
            color: 'white',
            border: '1px solid white',
            '&:hover': {
                backgroundColor: 'white',
                color: '#4253B4',
            },
        },
        textPrimary: {
            color: 'white',
            '&:hover': {
                color: 'black',
            },
        },
    },
    { name: 'MuiButton' },
);

// ===================================================================
//                            Component
// ===================================================================

/**
 * Styled button for use in forms
 *
 * @param {ButtonProps} props - standard Material UI Button Props
 * @returns {Element} Button element
 */
export default function FormButton(props: ButtonProps): JSX.Element {
    const buttonStyles = buttonStyling();

    const classes = [styles.formButton];

    if (props.variant === 'text') classes.push(buttonStyles.textPrimary);
    else classes.push(buttonStyles.outlinedPrimary);

    if (props.className) classes.push(props.className);

    return (
        <Button
            className={classes.join(' ')}
            color='primary'
            variant={props.variant ? props.variant : 'outlined'}
            href={props.href ? props.href : ''}
            type={props.type ? props.type : 'button'}
            onClick={props.onClick ? props.onClick : undefined}
        >
            {props.name}
        </Button>
    );
}
