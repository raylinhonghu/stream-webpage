import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => { // callback load
            window.gapi.client.init({   // initalize client 
                clientId: '1060559337620-q09hmkptlfai97kc015mc0hlcr96cqjb.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                // console.log(window.gapi.auth.signIn())
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen((status)=>{
                    console.log(status);
                    this.onAuthChange(status);
                });
            })
        });
    }

    onAuthChange = (authState) => {
        if (authState) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    signInGoogleClick = () => {
        this.auth.signIn();
    }

    signOutGoogleClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn === true) {
            return (
                <button className="ui red button google" onClick={this.signOutGoogleClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else if (this.props.isSignedIn === false) {
            return (
                <button className="ui red button google" onClick={this.signInGoogleClick}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isSignedIn: state.auth.isSignedIn
})


export default connect(mapStateToProps, {
    signIn: signIn,
    signOut: signOut
})(GoogleAuth);