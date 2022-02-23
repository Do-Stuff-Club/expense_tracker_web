// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';
import styles from './formButton.module.css';

// ===================================================================
//                             Styling
// ===================================================================
const StyledButton = styled(Button)(); // FIXME customize later

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
    const classes = [styles.formButton];

    if (props.className) classes.push(props.className);

    return (
        <StyledButton
            className={classes.join(' ')}
            color='primary'
            variant={props.variant ? props.variant : 'outlined'}
            href={props.href ? props.href : ''}
            type={props.type ? props.type : 'button'}
            onClick={props.onClick ? props.onClick : undefined}
        >
            {props.name}
        </StyledButton>
    );
}
