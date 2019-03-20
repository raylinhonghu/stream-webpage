import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions/index.js';

class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if (error && touched) {
            return (
                // style={{display:'block'}}
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    // passing this function to a component of not pre-defined.. adding context 
    renderInput = ({ input, label, meta }) => {
        // console.log(meta.error + " :  " + meta.touched)
        // return <input type="text" onChange={formProps.input.onChange} value={formProps.input.value}/>

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <Field name="title" component={this.renderInput} label="Enter Title" />
                    <Field name="description" component={this.renderInput} label="Enter Description" />
                    <button className="ui primary button"> Submit</button>
                </form>
            </div>
        )
    }
}

const validate = (formValues) => {
    var errObj = {};
    if (!formValues.title) { errObj.title = 'Stream Title Required' }
    if (!formValues.description) { errObj.description = 'Stream Description Required' }
    return errObj;
}

const formWrapped = reduxForm({
    form: 'createStream',
    validate
})(StreamCreate);

export default connect(null, { createStream })(formWrapped)