import { connect } from 'react-redux';
import withAuth from '../../components/misc/withAuthentication';
import TagsComponent from '../../components/tags/tags.component';
import { RootState } from '../../redux/store';
import { getAllTagsAction } from '../../redux/tags/action';

const stateToProps = (state: RootState) => ({
    tag: state.tag,
    userId: state.user.id,
});

const dispatchToProps = {
    getAllTagsAction,
};

export default connect(stateToProps, dispatchToProps)(withAuth(TagsComponent));
