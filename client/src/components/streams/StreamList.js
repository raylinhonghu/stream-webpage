import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderButton = ({userId, id}) => {
        if (userId === this.props.currentUserId) {
            return (
                <div className="content right floated">
                    <Link to={`/streams/edit/${id}`} className="ui primary button mini">EDIT</Link>
                    <Link to={`/streams/delete/${id}`} className="ui button red mini">DETELE</Link>
                </div>
            )
        }
    }

    renderStreamList = () => {
        console.log(this.props.streams)
        console.log(Object.values(this.props.streams))
        return Object.values(this.props.streams).map((stream, index) => {
            return (
                <div className="item" key={`${stream.title}${index}`}>
                    {this.renderButton(stream)}
                    <i className="large middle camera icon aligned" />
                    <div className="content">
                        <div className="title">
                            <Link to="/streams/show">
                                {stream.title}
                            </Link>
                        </div>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    renderCreate = () => {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui primary button large">Create Stream</Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="ui celled list">
                    {this.renderStreamList()}
                </div>
                {this.renderCreate()}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: state.stream,
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);