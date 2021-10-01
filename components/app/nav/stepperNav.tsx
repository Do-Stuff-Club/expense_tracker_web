// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import Link from 'next/link';
import {
    Step,
    StepButton,
    StepConnector,
    StepIconProps,
    StepLabel,
    Stepper,
    Typography,
} from '@material-ui/core';
import { styled, makeStyles, withStyles } from '@material-ui/core/styles';
import { AppNavPage, pageLink, pages, pageTitle } from './utils';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import TabsIcon from '@material-ui/icons/Label';
import ExpensesIcon from '@material-ui/icons/AttachMoney';
import DashboardIcon from '@material-ui/icons/Dashboard';

// ===================================================================
//                             Helpers
// ===================================================================
// StepButton wrapped with Next.js Link
const NextLinkA = React.forwardRef<
    HTMLAnchorElement,
    { href: string } & React.HTMLProps<HTMLAnchorElement>
>((props, ref) => (
    <Link href={props.href}>
        <a {...props} ref={ref}></a>
    </Link>
));
NextLinkA.displayName = 'NextLinkA';
NextLinkA.propTypes = {
    href: PropTypes.string.isRequired,
};

const NavStepConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundColor: '#ccc',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const NavStepper = styled(Stepper)({
    display: 'flex',
    justifyContent: 'space-evenly',
});

const useNavStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

/**
 * Helper component for the Header Icons
 *
 * @param {StepIconProps} props - props with the page to represent
 * @returns {Element} icon representing a page
 */
function NavStepIcon(props: StepIconProps): JSX.Element {
    const classes = useNavStepIconStyles();
    const { active, completed } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <TabsIcon />,
        2: <ExpensesIcon />,
        3: <DashboardIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}
// ===================================================================
//                            Component
// ===================================================================
type StepperNavProps = {
    page: AppNavPage;
};

/**
 * App Bar for expense tracker app. Contains navigation links to
 * dashboard, expenses, and tags.
 *
 * @param {StepperNavProps} props - Props containing the page being used
 *
 * @returns {Element} AppBar element
 */
export default function StepperNav(props: StepperNavProps): JSX.Element {
    return (
        <NavStepper
            activeStep={pages.indexOf(props.page)}
            style={{ backgroundColor: 'transparent' }}
            connector={<NavStepConnector />}
            alternativeLabel
            nonLinear
        >
            {pages.map((page) => (
                <Step key={page}>
                    <StepButton href={pageLink(page)} component={NextLinkA}>
                        <StepLabel StepIconComponent={NavStepIcon}>
                            <Typography variant='caption'>
                                {pageTitle(page)}
                            </Typography>
                        </StepLabel>
                    </StepButton>
                </Step>
            ))}
        </NavStepper>
    );
}
