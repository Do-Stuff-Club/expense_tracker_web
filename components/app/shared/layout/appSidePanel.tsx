// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { Drawer, Toolbar } from '@mui/material';

// ===================================================================
//                            Component
// ===================================================================
type AppSidePanelProps = {
    direction: 'left' | 'right';
    children?: React.ReactNode;
};

/**
 * Side panel for desktop app
 *
 * @param {AppSidePanelProps} props - Props with the side that the panel should be on
 *
 * @returns {Element} AppBar element
 */
export default function AppSidePanel(props: AppSidePanelProps): JSX.Element {
    const drawerWidth = 240;
    return (
        <Drawer
            variant='permanent'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            anchor={props.direction}
        >
            <Toolbar />
            {props.children}
        </Drawer>
    );
}
