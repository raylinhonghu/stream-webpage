import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index.js';

import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
    
    onCreateStream = formValues=> {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a Form</h3>
                <StreamForm onSubmit={this.onCreateStream}/>
            </div>
        )
    }
}


export default connect(null, { createStream })(StreamCreate)