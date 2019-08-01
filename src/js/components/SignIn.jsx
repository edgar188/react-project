import React from "react";
import {connect} from 'react-redux';
import { setEmailValue, setPasswordValue, handleClickShowPassword} from "../redux/actions/signIn/signInActions";
import firebase from "../configs/FireBase";
import "firebase/auth";
import "./styles/signIn.css";
// Material UI packages --------------------------------------
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
// ------------------------------------------------------------

export const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        flexBasis: 200,
        width: 350
    },
    textFieldEmail: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 350
    },
    rightIcon: {
        marginLeft: 40
    },
    buttonSignIn: {
        fontSize: 18,
        padding: 5,
        textAlign: "center",
        width: 200,
        marginTop: 10,
        fontWeight: "bold",
        color: "#CF4554"
    },
    buttonSignUp: {
        fontSize: 18,
        padding: 5,
        marginLeft: 10,
        marginTop: 10,
        width: 140,
    },
}));

function SignIn (props) {
    const classes = useStyles();
    const {email, password, showPassword, setEmailValue, setPasswordValue, handleClickShowPassword} = props;
    
    const onSignIn = e => {
        e.preventDefault();
        const emailValue = email,
             passValue = password;
        setEmailValue("");
        setPasswordValue("");
        let auth = firebase.auth(),
            promise = auth.signInWithEmailAndPassword(emailValue, passValue);
        promise.then(val => alert("User is loged In !"));
        promise.catch(e => alert(e.message));
    }
    const handleMouseDownPassword = e => {
        e.preventDefault();
    };

    return (
        <div id="signInContainer">
            <h1><span style={{ color: "#3F51B5"}}>SIGN</span> IN</h1>
            <div>
                <TextField
                    id="filled-email-input"
                    label="Email"
                    className={classes.textFieldEmail}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="filled"
                    value={email}
                    onChange={e => {setEmailValue(e.target.value)}}
                />
            </div>
            <div>
                <TextField
                    id="filled-adornment-password"
                    className={clsx(classes.margin, classes.textField)}
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}              
                    label="Password"
                    value={password}
                    onChange={e => {setPasswordValue(e.target.value)}}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    aria-label="toggle password visibility"
                                    onClick={e => { handleClickShowPassword(!showPassword)}}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <Button onClick={onSignIn} variant="contained" color="default" className={classes.buttonSignIn}>
                SIGN IN<Icon className={classes.rightIcon}>send</Icon>
            </Button>
            <Button variant="contained" color="primary" size="medium" className={classes.buttonSignUp}>
                SIGN UP
            </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.email,
        password: state.password,
        showPassword: state.showPassword
    }
}

const mapDispatchToProps = {
    setEmailValue,
    setPasswordValue,
    handleClickShowPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);