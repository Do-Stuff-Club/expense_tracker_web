// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';
import TagsInput from './tagsInput';

// ===================================================================
//                              Tests
// ===================================================================

describe('TagsInput component', () => {
    it('lets you add new tags with a text field and button', () => {
        render(
            <Formik
                initialValues={{
                    tags: [],
                }}
                onSubmit={() => {
                    return;
                }}
            >
                <TagsInput name='tags' category_id={0} />
            </Formik>,
        );

        const newTagNameInput = screen.getByLabelText('Add a new tag:');
        userEvent.type(newTagNameInput, 'TagName');
        userEvent.click(screen.getByRole('button', { name: 'Add!' }));

        expect(screen.getByText('TagName')).toBeInTheDocument();
    });

    it('displays existing tags', () => {
        render(
            <Formik
                initialValues={{
                    tags: [
                        {
                            name: 'Old Tag 1',
                            id: 0,
                            category_id: 0,
                        },
                        {
                            name: 'Old Tag 2',
                            id: 0,
                            category_id: 0,
                        },
                    ],
                }}
                onSubmit={() => {
                    return;
                }}
            >
                <TagsInput name='tags' category_id={0} />
            </Formik>,
        );

        expect(screen.getByText('Old Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Old Tag 2')).toBeInTheDocument();
    });

    it('displays existing tags and new tags together', () => {
        render(
            <Formik
                initialValues={{
                    tags: [
                        {
                            name: 'Old Tag 1',
                            id: 0,
                            category_id: 0,
                        },
                        {
                            name: 'Old Tag 2',
                            id: 0,
                            category_id: 0,
                        },
                    ],
                }}
                onSubmit={() => {
                    return;
                }}
            >
                <TagsInput name='tags' category_id={0} />
            </Formik>,
        );

        const newTagNameInput = screen.getByLabelText('Add a new tag:');
        userEvent.type(newTagNameInput, 'TagName');
        userEvent.click(screen.getByRole('button', { name: 'Add!' }));

        expect(screen.getByText('TagName')).toBeInTheDocument();
        expect(screen.getByText('Old Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Old Tag 2')).toBeInTheDocument();
    });

    it('represents new tags with a different data type as old tags', async () => {
        const mockSubmit = jest.fn();
        render(
            <Formik
                initialValues={{
                    tags: [
                        {
                            name: 'Old Tag 1',
                            id: 0,
                            category_id: 0,
                        },
                        {
                            name: 'Old Tag 2',
                            id: 0,
                            category_id: 0,
                        },
                    ],
                }}
                onSubmit={mockSubmit}
            >
                <Form noValidate>
                    <TagsInput name='tags' category_id={0} />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>,
        );

        const newTagNameInput = screen.getByLabelText('Add a new tag:');
        userEvent.type(newTagNameInput, 'TagName');
        userEvent.click(screen.getByRole('button', { name: 'Add!' }));
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));

        expect(screen.getByText('TagName')).toBeInTheDocument();
        expect(screen.getByText('Old Tag 1')).toBeInTheDocument();
        expect(screen.getByText('Old Tag 2')).toBeInTheDocument();

        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith(
                {
                    tags: [
                        {
                            name: 'Old Tag 1',
                            id: 0,
                            category_id: 0,
                        },
                        {
                            name: 'Old Tag 2',
                            id: 0,
                            category_id: 0,
                        },
                        {
                            name: 'TagName',
                        },
                    ],
                },
                expect.anything(),
            );
        });
    });
});
