import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../redux/store';

// ===================================================================
//                            Component
// ===================================================================
const stateToProps = (state: RootState) => state.user;

const connector = connect(stateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type TestProps = ReduxProps;

/**
 * Debugging component that prints out the Redux Store
 *
 * @param {TestProps} props - Redux store props
 * @returns {Element} div element with redux store stringified
 */
const TestComponent: FC<TestProps> = (props) => {
    return (
        <>
            <div>Props &quot;{JSON.stringify(props)}&quot;</div>
        </>
    );
};

export default connector(TestComponent);
