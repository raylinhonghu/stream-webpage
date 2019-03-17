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
                this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    onAuthChange = (authState) => {
        if(authState){
            this.props.signIn()
        }else{
            this.props.signOut()
        }
    }

    signInGoogleClick = () => {
        this.setState({ isSignedIn: true});
        this.auth.signIn();
        // this.props.signIn();
    }

    signOutGoogleClick = () => {
        this.setState({ isSignedIn: false});     
        this.auth.signOut();
        // this.props.signOut();
    }

    renderAuthButton() {
        if (this.state.isSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button className="ui red button google" onClick={this.signOutGoogleClick}>
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button className="ui red button google" onClick={this.signInGoogleClick}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            )
        }
    }

    render() {
        console.log(this.props.loginStatus)
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loginStatus: state.loginStatus
})




export default connect(mapStateToProps,{
    signIn,
    signOut
})(GoogleAuth);