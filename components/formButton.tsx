// ===================================================================
//                             Imports
// ===================================================================
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
    },
    { name: 'MuiButton' },
);

// ===================================================================
//                            Component
// ===================================================================
export default function FormButton(props: ButtonProps) {
    const buttonStyles = buttonStyling();

    return (
        <Button
            className={buttonStyles.outlinedPrimary}
            color='primary'
            variant='outlined'
            href={props.href ? props.href : ''}
            type={props.type ? props.type : 'button'}
        >
            {props.name}
        </Button>
    );
}
