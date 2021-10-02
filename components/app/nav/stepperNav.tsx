// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import Link from 'next/link';
import {
    Step,
    StepButton,
    StepConnector,
    stepConnectorClasses,
    StepIconProps,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AppNavPage, pageLink, pages, pageTitle } from './utils';
import PropTypes from 'prop-types';
import TabsIcon from '@mui/icons-material/Label';
import ExpensesIcon from '@mui/icons-material/AttachMoney';
import DashboardIcon from '@mui/icons-material/Dashboard';

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

const NavStepConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: '#ccc',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const NavStepper = styled(Stepper)({
    display: 'flex',
    justifyContent: 'space-evenly',
});

const NavStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

/**
 * Helper component for the Header Icons
 *
 * @param {StepIconProps} props - props with the page to represent
 * @returns {Element} icon representing a page
 */
function NavStepIcon(props: StepIconProps): JSX.Element {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: <TabsIcon />,
        2: <ExpensesIcon />,
        3: <DashboardIcon />,
    };

    return (
        <NavStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </NavStepIconRoot>
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
