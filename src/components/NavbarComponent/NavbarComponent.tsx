import React, { FunctionComponent } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
//import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { withStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            color: "#f26926",
            marginLeft: 'auto'
        },
        title: {
            color: "#f26926",
            margins: 'auto',
            flexGrow: 1,
            fontFamily: "Impact"
        },
        link: {
            color:'#474C55', 
            fontFamily: "Impact",
            textDecoration: "none",
            '&:hover': {
                color: '#FFFFFF',
            },
        },
        bar: {
            backgroundColor: "white",
            borderColor: "#f26926"
        },
        logo: {
            alignItems: 'screenLeft'
        }
    }),
);

//this is what makes it orange when you hover on a menu item
const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:hover': {
            backgroundColor: '#F26925',
        },
    },
}))(MenuItem);

export const NavBarComponent: FunctionComponent<any> = (props) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentUser = useSelector((state: IState) => {
        return state.loginState.currentUser
    })

    let menuItems = []
    //do we need to specify that we only want this if there is no current user?
    menuItems.push(<StyledMenuItem key={'register'} onClick={handleClose}><Link to='/register' className={classes.link}> Sign Up! </Link></StyledMenuItem>)

    if (currentUser) {

        menuItems.push(
            <Link to='updatePassword' className={classes.link}><StyledMenuItem key={'updatePassword'} onClick={handleClose}>Update Password </StyledMenuItem></Link>,
            <Link to='/updateRole' className={classes.link}><StyledMenuItem key={'updateRole'} onClick={handleClose}> Update Role</StyledMenuItem></Link>,
            <Link to='/associateInfo' className={classes.link}><StyledMenuItem key={'associateInfo'} onClick={handleClose}>Associate Information</StyledMenuItem></Link>,
            <Link to='/allAssociate' className={classes.link}><StyledMenuItem key={'allAssociate'} onClick={handleClose}>All Associates</StyledMenuItem></Link>,
            <Link to='/batchInfo' className={classes.link}><StyledMenuItem key={'batchInfo'} onClick={handleClose}>Batch Profile</StyledMenuItem></Link>,
            <Link to='/currentBatches' className={classes.link}><StyledMenuItem key={'currentBatches'} onClick={handleClose}>Current Batches</StyledMenuItem></Link>,
            <Link to='/allProfile' className={classes.link}><StyledMenuItem key={'allProfile'} onClick={handleClose}>Profile Service</StyledMenuItem></Link>,
            <Link to='/logout' className={classes.link}><StyledMenuItem key={'logout'} onClick={handleClose}>Logout</StyledMenuItem></Link>)

    } return (
        <nav>
            <AppBar position="static">
                <Toolbar className={classes.bar}>

                    <img className={classes.logo} src={('https://3g4d13k75x47q7v53surz1gi-wpengine.netdna-ssl.com/wp-content/themes/revature/imgs/logo.png')} alt='Revature Logo' />
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                        <MenuIcon />
                    </IconButton>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}>
                        {menuItems}
                    </Menu>
                    <IconButton component={Link} to="/login">
                        <PersonIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </nav>

    )
}