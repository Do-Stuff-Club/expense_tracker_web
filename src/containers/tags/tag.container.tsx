import { connect } from 'react-redux';

import TagComponent from '../../components/tags/tag.component';
import { RootState } from '../../redux/store';
import { updateTagAction } from '../../redux/tags/action';
import { Tag } from '../../redux/tags/types';

const stateToProps = (
    state: RootState,
    ownProps: {
        tag: Tag;
        tags: Record<number, Tag>;
        root: boolean;
    },
) => ({
    tag: ownProps.tag,
    tags: ownProps.tags,
    root: ownProps.root,
});

const dispatchToProps = {
    // createNewTagAction,
    updateTagAction,
    // moveTagAction,
    // deleteTagAction,
};

export default connect(stateToProps, dispatchToProps)(TagComponent);
