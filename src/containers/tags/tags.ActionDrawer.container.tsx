import { connect } from 'react-redux';
import TagActionDrawer from '../../components/tags/tagActionDrawer';
import { RootState } from '../../redux/store';
import {
    createNewTagAction,
    deleteTagAction,
    updateTagAction,
    moveTagAction,
} from '../../redux/tags/action';
import { Tag } from '../../redux/tags/types';

const stateToProps = (
    state: RootState,
    ownProps: { selectedTag: Tag | undefined },
) => ({
    selectedTag: ownProps.selectedTag,
});

const dispatchToProps = {
    createNewTagAction,
    updateTagAction,
    moveTagAction,
    deleteTagAction,
};

export default connect(stateToProps, dispatchToProps)(TagActionDrawer);
