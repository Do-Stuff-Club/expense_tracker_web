// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormButton from './formButton';

// ===================================================================
//                              Tests
// ===================================================================

describe('FormButton component', () => {
    it('renders its name', () => {
        render(<FormButton name='My Button'></FormButton>);
        expect(screen.getByText('My Button')).toBeInTheDocument();
    });

    it('is clickable', async () => {
        const myMockHandler = jest.fn(); // Spy the handler with jest
        render(
            <FormButton name='My Button' onClick={myMockHandler}></FormButton>,
        );

        userEvent.click(screen.getByText('My Button'));

        await waitFor(() => {
            expect(myMockHandler).toHaveBeenCalledTimes(1);
        });
    });
});
