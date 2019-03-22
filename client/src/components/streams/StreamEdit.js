import _ from 'lodash';

import React from 'react';
import { connect } from 'react-redux';
import { editStreams, fetchStream } from '../../actions/index';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onEditStream = (formValues) => {
        this.props.editStreams(this.props.match.params.id, formValues);
    }

    render() {
        return (
            <div>
                <h3>Edit A Stream</h3>
                <StreamForm
                    onSubmit={this.onEditStream}
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.stream[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { editStreams, fetchStream })(StreamEdit);