import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/store';

const stateToProps = (state: RootState) => state.user;

const connector = connect(stateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TestProps = ReduxProps;

const TestComponent: FC<TestProps> = (props) => {
    return (
        <>
            <div>Props &quot;{JSON.stringify(props)}&quot;</div>
        </>
    );
};

export default connector(TestComponent);
