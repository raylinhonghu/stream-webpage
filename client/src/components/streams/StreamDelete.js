import React from 'react';
import Modal from '../Modal';

import history from '../../history';

class StreamDelete extends React.Component {


    actions = () => {
        return (
            <React.Fragment>
                <div className="ui red button">
                    DELETE
                </div>
                <div className="ui black button">
                    CANCLE
                </div>
            </React.Fragment>
        )
    }

    cancelDirect = () => {
        console.log(111111111111111);
        
        history.push('/');
    }

    render() {
        return (
            <Modal
                title="DELETE STREAM"
                description="Are you sure you want to delete this stream?"
                actions={this.actions}
                cancelDirect={()=> history.push('/')}
            />
        )
    }
}

export default StreamDelete;