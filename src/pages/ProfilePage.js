import PageLableWithIcon from "./PageLabelWithIcon";
import {AccountCircle} from "@material-ui/icons";
import ShoppingCart, {CartListItems} from '../components/shopping-cart/ShoppingCartRedux';

import React, {useEffect, useState} from "react";
import {Button, createMuiTheme, CssBaseline, Divider, makeStyles, TextField, Typography} from "@material-ui/core";
import ShoppingCartActionButtons, {BUTTON_TYPE} from "../components/shopping-cart/ShoppingCartActionButtons";
import CommentSection from "../components/comment/CommentSection";
import { ThemeProvider } from "@material-ui/styles";
import AuthService from "../util/auth-service";
import firebase from "firebase";
import { Redirect } from 'react-router';
import CartTotal from "../components/shopping-cart/CartTotal";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

        margin: 'auto',
        borderColor: 'white',
        color: 'white',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',

    },
    palette: {
        type: "dark"
    },
    profile: {
      display: 'flex',
      flexDirection: 'row',
        flexWrap: 'wrap',
    },
    textField: {
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500,
        alignSelf: 'top',
    },
    topRow: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 600,
        height: '100%',
        gap: '30px',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        alignContent: 'top',
        alignSelf: 'top',
        justifyContent: 'center',

    },
    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        width: '80%',
        justifyContent: 'center',
        margin: 'auto',
    },
    logInButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
        width: '80%',
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 'auto',
    },
    link: {
      color: 'red',
    },
    imageContainer: {
        maxWidth: '95%',
        maxHeight: '30%',
    },

}));

const theme = createMuiTheme({
    palette: {
        type: "dark"
    }
});


const ProfilePage = () => {

    const classes = useStyles();
    const [user, setUser] = useState()

    const signOut = () => {
        AuthService.logout()
        setUser(null)

    }


    useEffect(() => {
        console.log(user)
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                let uid = user.uid;
                setUser(user)
                console.log("user profile page", user)
            } else {
                console.log("no user is signed in", user)
                setUser(null)
                // User is signed out
            }
        });
    }, [])

    const getUser = () => {
        const user =AuthService.getCurrentUser()
        setUser(user)
        console.log(user)
    }

    const removeAccount = () => {
        AuthService.deleteUser()
    }

    const handleInput = (name, value) => {
        const displayName = name === 'username' ? value : null
        if (displayName){
        AuthService.updateUserProfile(displayName)
        console.log(name, value)
        }

    }


    return(
        <div id='hover-container' className={classes.root}>

            <PageLableWithIcon {...{ text: 'Din profil', icon: <AccountCircle/>}}/>

            {user ?
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <div className={classes.profile}>

                    <div className={classes.topRow}>
                        <Typography variant="h5" component="h2">
                            Konto
                        </Typography>

                        <TextField onChange={(e) => handleInput(e.target.name, e.target.value)} className={classes.textField}
                                  defaultValue={user.displayName} name="username" label="Användarnamn" variant="outlined"/>
                        <TextField onChange={(e) => handleInput(e.target.name, e.target.value)} className={classes.textField}
                                   name="firstname" label="Namn" variant="outlined"/>
                        <TextField onChange={(e) => handleInput(e.target.name, e.target.value)} className={classes.textField}
                                   name="lastname" label="Efternamn" variant="outlined"/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            data-testid="signin-anon"
                            onClick={signOut}
                        >
                            Log ut
                        </Button>
                        <a className={classes.link} onClick={removeAccount}>Remove account</a>
                    </div>

                    <div className={classes.topRow}>

                        <ShowUsersHistory user={user} />
                    </div>

                    </div>


                </ThemeProvider>

            :
                <div className={classes.topRow}>
                <Typography>Logga in för att se din profil</Typography>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.logInButton}
                data-testid="signin-anon"
                onClick={() => window.location = 'login'}
                >
                Logga in
                </Button>
                </div>
            }

        </div>

    )


}

const ShowUsersHistory = (props) => {

    return(
        <>
            <Typography variant="h5" component="h2">
                Dina köp
            </Typography>

            <div >

                <CartListItems />

            </div>

        </>
    )

}

export default ProfilePage

















