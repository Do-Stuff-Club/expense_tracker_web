// ===================================================================
//                             Imports
// ===================================================================
import { useField } from 'formik';
import React from 'react';
import styles from './Form.module.css';
import textFieldStyles from './TextField.module.css';

// ===================================================================
//                            Component
// ===================================================================
type TextFieldProps = {
    name: string;
    label: string;
};

/**
 * Text field component with label and text input. Must be used with
 * <Formik/> context component
 *
 * @param {TextField} props - for the component
 * @returns {Element} TextField element
 */
export default function TextField(props: TextFieldProps): JSX.Element {
    const [field, meta] = useField<string>(props.name);
    return (
        <>
            <div className={textFieldStyles.textField}>
                <label htmlFor={props.name}>{props.label}</label>
                <input {...field} {...props}></input>
                {meta.touched && meta.error ? (
                    <div className={styles.formErrors}>{meta.error}</div>
                ) : (
                    <div />
                )}
            </div>
        </>
    );
}
