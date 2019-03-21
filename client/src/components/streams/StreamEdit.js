import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { editStreams, fetchStream } from '../../actions/index';


class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
        console.log("1")
    }

    renderInput = ({ input, meta, label }) => {
        console.log(this.props.state)
        if(label==="Enter Title"&&!this.props.stream){
            return (
                <div className="ui field">
                    <label>{label}</label>
                    <input {...input} value={this.props.stream.title}/>
                </div>
    
            )
        }
    }
    renderForm = () => {
        return (


            <div className="ui form">

                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />

                <button className="ui button primary">Apply Change</button>
            </div>
        )
    }

    render() {
        console.log("2")

        console.log(this.props.stream);

        return (
            <div>
                {this.renderForm()}
            </div>
        )
    }


}

const mapStateToProps = (state, ownProps) => {

    return {
        stream: state.stream[ownProps.match.params.id]
    }
}

const editFormWrapped = reduxForm({
    form: 'editForm'
})(StreamEdit)

export default connect(mapStateToProps, { editStreams, fetchStream })(editFormWrapped);