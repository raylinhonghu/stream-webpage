import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { deleteStreams, fetchStream } from '../../actions/index';
import { Link } from 'react-router-dom';

import history from '../../history';

class StreamDelete extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    actions = () => {
        return (
            <React.Fragment>
                <div to="/" className="ui red button" onClick={()=>this.props.deleteStreams(this.props.match.params.id)}>
                    DELETE
                </div>
                <div className="ui black button" onClick={() => { history.push('/') }}>
                    CANCLE
                </div>
            </React.Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }
        else {
            return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
        }
    }

    render() {
        return (
            <Modal
                title="DELETE STREAM"
                description={this.renderContent()}
                actions={this.actions}
                cancelDirect={() => history.push('/')}
            />
        )
    }
}

const mapStateToProps = (state, OwnProps) => {
    return {
        stream: state.stream[OwnProps.match.params.id]
    }
}



export default connect(mapStateToProps, { deleteStreams, fetchStream })(StreamDelete);