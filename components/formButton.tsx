// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Button, ButtonProps, makeStyles } from '@material-ui/core';

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

    return (
        <Button
            className={
                props.variant === 'text'
                    ? buttonStyles.textPrimary
                    : buttonStyles.outlinedPrimary
            }
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
