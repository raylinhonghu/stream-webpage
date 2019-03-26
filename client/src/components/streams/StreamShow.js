import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/index';

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchStreams(this.props.match.params.title);
    }

    render() {
        if(!this.props.stream){
            return (
                <div>
                    Loading..
                </div>
            )
        }else {
            return (
                <div>
                    <div>{this.props.stream.title}</div>
                    <div>{this.props.stream.description}</div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.stream[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamShow);