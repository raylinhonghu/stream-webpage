import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError({ error, touched }) {
        if (error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
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
        this.props.onSubmit(formValues);
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

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
