// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import textFieldStyles from './textField.module.css';

// ===================================================================
//                            Component
// ===================================================================
type TextFieldProps = {
    name: string;
    label: string;
    className?: string;
};

/**
 * Text field component with label and text input. Must be used with
 * <Formik/> context component
 *
 * @param {TextField} props - for the component
 * @returns {Element} TextField element
 */
export default function TextField({
    className,
    ...props
}: TextFieldProps): JSX.Element {
    const [field, meta] = useField<string>(props.name);
    const styleClasses = className
        ? [textFieldStyles.textField, className].join(' ')
        : textFieldStyles.textField;
    return (
        <>
            <div className={styleClasses}>
                <label htmlFor={props.name}>{props.label}</label>
                <input id={props.name} {...field} {...props}></input>
                {meta.touched && meta.error ? (
                    <div className={textFieldStyles.formErrors}>
                        {meta.error}
                    </div>
                ) : (
                    <div />
                )}
            </div>
        </>
    );
}
