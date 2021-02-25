import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../redux/store';

import { UserState } from '../redux/user/types';

const stateToProps = (state: RootState) => state.user;

const connector = connect(stateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TestProps = ReduxProps;

const TestComponent: FC<TestProps> = (props) => {
    return (
        <>
            <div>Props "{JSON.stringify(props)}"</div>
        </>
    );
};

export default connector(TestComponent);
