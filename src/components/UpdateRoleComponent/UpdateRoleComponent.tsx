import { useDispatch, useSelector } from 'react-redux';
import React, { FunctionComponent, useState, SyntheticEvent } from 'react'
import { createStyles, makeStyles, Theme, InputLabel, Select, FormControl, Container, createMuiTheme, ThemeProvider, Paper } from '@material-ui/core';
import { IState } from '../../reducers';
import { deepOrange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';
import { updateRoleActionMapper } from '../../action-mappers/updateRole-action-mapper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        component: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh'
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        button: {
            background: "#61dafb",
            borderColor: "#61dafb",
            minWidth: 90,
            minHeight: 40
        },
        root: {
            padding: theme.spacing(1)
        },
    }),
);

const theme = createMuiTheme({
    palette: {
        primary: deepOrange,
        action: {
            hover: '#F26925', //can't get this to work

        }
    },
});

export const UpdateRoleComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [role, changeRole] = useState('');

    const updateRole = (e: any) => {
        e.preventDefault();
        changeRole(e.currentTarget.value);
        console.log(role);

    }

    let currentUser = useSelector((state: IState) => {
        return state.loginState.currentUser
    })

    let dispatch = useDispatch();

    const submitRole = async (e: SyntheticEvent) => {
        e.preventDefault();
        try {
            //let userId = await getUserByEmailRemote(props.associate.email)
            // let thunk = await updateRoleActionMapper(currentUser.userId, userId, role); // Replace 1 with userID selected by Admin
            let thunk = await updateRoleActionMapper(currentUser.userId, props.associate.email, role); // Replace 1 with userID selected by Admin
            dispatch(thunk);
            props.history.push('/home')
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Container className={classes.component} maxWidth="xs">
            <div>
                <h1>Update A Role</h1>
                <Paper variant="outlined" square elevation={3}>
                    <FormControl className={classes.formControl}>
                        <form onSubmit={submitRole}>
                            <InputLabel color='primary' htmlFor="age-native-simple">Role</InputLabel>
                            <ThemeProvider theme={theme}>
                                <Select
                                    native
                                    value={role}
                                    onChange={updateRole}
                                    inputProps={{
                                        name: 'role',
                                        id: 'age-native-simple'
                                    }}>
                                    <option value=''></option>
                                    <option value='Associate'>Associate</option>
                                    <option value='Trainer'>Trainer</option>
                                    <option value='Admin'>Admin</option>
                                </Select>
                            </ThemeProvider>
                            <button className={classes.button} color="default" type="submit" > Submit </button>
                        </form>
                    </FormControl>
                    <br /><br />
                    {/* <button className={classes.button} color="default" type="submit" > Submit </button> */}
                </Paper>
            </div>
        </Container>
    )

}
