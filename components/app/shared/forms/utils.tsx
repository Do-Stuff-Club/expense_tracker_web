export type FormProps<S> = {
    initialState: S;
    onSubmit: (values: S) => void;
};
