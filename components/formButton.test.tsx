// ===================================================================
//                             Imports
// ===================================================================
import React from 'react';
import FormButton from './formButton';
import { screen, render, cleanup } from '@testing-library/react';
import each from 'jest-each';

// ===================================================================
//                              Helper Functions
// ===================================================================

type ButtonType = 'submit' | 'reset' | 'button' | undefined;
type ButtonVariantType = 'outlined' | 'text' | 'contained' | undefined;
type HelperFn = (variant: ButtonVariantType, type: ButtonType) => void;

const variants: Array<ButtonVariantType> = [
    'outlined',
    'text',
    'contained',
    undefined,
];
const types: Array<ButtonType> = ['submit', 'button', 'reset', undefined];
let typeVariantCombinations: Array<Array<ButtonVariantType | ButtonType>> = [];
variants.forEach((variant) => {
    types.forEach((type) => {
        typeVariantCombinations.push([variant, type]);
    });
});

// ===================================================================
//                              Tests
// ===================================================================
each(typeVariantCombinations).describe(
    'variant: %s, type: %s',
    (variant, type) => {
        test('renders label', () => {
            render(
                <FormButton
                    name='potato'
                    href='\potato'
                    type={type}
                    variant={variant}
                />,
            );
            expect(screen.getByText('potato')).toBeInTheDocument();
        });
    },
);
