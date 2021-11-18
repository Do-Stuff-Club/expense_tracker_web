// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import EditTagDialog from './editTagDialog';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ===================================================================
//                              Tests
// ===================================================================

describe('EditTagDialog component', () => {
    it('has a text field for the tag name', () => {
        render(
            <EditTagDialog
                open = {true}
                name = ''
                handleClose = {() => 'beep'}
                handleSubmit = {(name: string) => 'boop ' + name}
            ></EditTagDialog>
        );

        // Check that the label is rendered
        expect(screen.getByText('Name')).toBeInTheDocument();

        // Check that the associated text field exists
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('renders the Edit Tag dialog title text', () => {
        render(
            <EditTagDialog
                open = {true}
                name = ''
                handleClose = {jest.fn()}
                handleSubmit = {jest.fn()}
            ></EditTagDialog>,
        );

        // Check that the Edit Tag text is rendered
        expect(screen.getByText('Edit Tag')).toBeInTheDocument();
    });

    it('has a cancel button', () => {
        render(
            <EditTagDialog
                open = {true}
                name = ''
                handleClose = {jest.fn()}
                handleSubmit = {jest.fn()}
            ></EditTagDialog>,
        );

        // Check that the cancel button has important features
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('has a functioning submit button with valid default input', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <EditTagDialog
                open = {true}
                name = 'Test Name'
                handleClose = {jest.fn()}
                handleSubmit = {mockSubmitHandler}
            ></EditTagDialog>,
        );

        userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockSubmitHandler).toHaveBeenCalledWith('Test Name');
        });
    })

    it('has a functioning submit button with valid user input', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <EditTagDialog
                open = {true}
                name = ''
                handleClose = {jest.fn()}
                handleSubmit = {mockSubmitHandler}
            ></EditTagDialog>,
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
            <EditTagDialog
                open = {true}
                name = 'Test Name'
                handleClose = {jest.fn()}
                handleSubmit = {mockSubmitHandler}
            ></EditTagDialog>,
        );

        userEvent.clear(screen.getByLabelText('Name'));
        userEvent.click(screen.getByText('Submit'));

        await waitFor(() => {
            expect(mockSubmitHandler).not.toHaveBeenCalled();
        });
    }); 
});