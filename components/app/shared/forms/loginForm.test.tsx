// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import LoginForm from './loginForm';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ===================================================================
//                              Tests
// ===================================================================

describe('LoginForm component', () => {
    it('has text fields for email and password', () => {
        render(
            <LoginForm
                initialState={{ email: '', password: '' }}
                onSubmit={jest.fn()}
            ></LoginForm>,
        );

        // Check that labels are rendered
        // FIXME MUI renders the text label twice (once in a <label/> and once in a <span/>)
        // so we query both and take the first one to check that the text is in the document.
        expect(screen.getAllByText('Email')[0]).toBeInTheDocument();
        expect(screen.getAllByText('Password')[0]).toBeInTheDocument();

        // Check that associated text fields exist
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    it('has a Home button and Log In button', () => {
        render(
            <LoginForm
                initialState={{ email: '', password: '' }}
                onSubmit={jest.fn()}
            ></LoginForm>,
        );

        // Check that Home button has important features
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Home').closest('a')).toHaveAttribute(
            'href',
            '/',
        );

        // Check that Log In button has important features
        expect(screen.getByText('Log In')).toBeInTheDocument();
    });

    it('has a functioning submit button with valid default input', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <LoginForm
                initialState={{
                    email: 'test@domain.com',
                    password: 'supersecret',
                }}
                onSubmit={mockSubmitHandler}
            ></LoginForm>,
        );

        userEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(mockSubmitHandler).toHaveBeenCalledWith(
                {
                    email: 'test@domain.com',
                    password: 'supersecret',
                },
                expect.anything(),
            ); // expect.anything() just ignores other fields provided by Formik to the handler
        });
    });

    it('has a functioning submit button with valid user input', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <LoginForm
                initialState={{ email: '', password: '' }}
                onSubmit={mockSubmitHandler}
            ></LoginForm>,
        );

        userEvent.type(screen.getByLabelText('Email'), 'test@domain.com');
        userEvent.type(screen.getByLabelText('Password'), 'supersecret');
        userEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(mockSubmitHandler).toHaveBeenCalledWith(
                {
                    email: 'test@domain.com',
                    password: 'supersecret',
                },
                expect.anything(),
            ); // expect.anything() just ignores other fields provided by Formik to the handler
        });
    });

    it('will not submit if email does not have @', async () => {
        const mockSubmitHandler = jest.fn();
        render(
            <LoginForm
                initialState={{ email: '', password: '' }}
                onSubmit={mockSubmitHandler}
            ></LoginForm>,
        );

        userEvent.type(screen.getByLabelText('Email'), 'test_domain.com');
        userEvent.type(screen.getByLabelText('Password'), 'supersecret');
        userEvent.click(screen.getByText('Log In'));

        await waitFor(() => {
            expect(mockSubmitHandler).not.toHaveBeenCalled();
        });
    });
});
