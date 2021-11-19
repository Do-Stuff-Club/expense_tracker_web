// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import NewTagDialog from './newTagDialog';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ===================================================================
//                              Tests
// ===================================================================

describe('NewTagDialog component', () => {
    it('has a text field for the tag name', () => {
        render(
            <NewTagDialog
                open={true}
                handleClose={jest.fn()}
                handleSubmit={jest.fn()}
            ></NewTagDialog>,
        );

        // Check that the label is rendered
        expect(screen.getByText('Name')).toBeInTheDocument();

        // Check that the associated text field exists
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('renders the Create Tag dialog title text', () => {
        render(
            <NewTagDialog
                open={true}
                handleClose={jest.fn()}
                handleSubmit={jest.fn()}
            ></NewTagDialog>,
        );

        // Check that the Create Tag text is rendered
        expect(screen.getByText('Create Tag')).toBeInTheDocument();
    });

    it('has a cancel button', () => {
        render(
            <NewTagDialog
                open={true}
                handleClose={jest.fn()}
                handleSubmit={jest.fn()}
            ></NewTagDialog>,
        );

        // Check that the cancel button has important features
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('has a functioning submit button with valid user input', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <NewTagDialog
                open={true}
                handleClose={jest.fn()}
                handleSubmit={mockSubmitHandler}
            ></NewTagDialog>,
        );

        userEvent.type(screen.getByLabelText('Name'), 'testName');
        userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockSubmitHandler).toHaveBeenCalledWith('testName');
        });
    });

    it('will not submit if tag name is empty', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <NewTagDialog
                open={true}
                handleClose={jest.fn()}
                handleSubmit={mockSubmitHandler}
            ></NewTagDialog>,
        );

        userEvent.clear(screen.getByLabelText('Name'));
        userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockSubmitHandler).not.toHaveBeenCalled();
        });
    });
});
