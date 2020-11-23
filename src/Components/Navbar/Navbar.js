import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import cls from './Navbar.module.css'
import Button from '../Buttons/Button'
// npm install --save-dev @iconify/react @iconify/icons-logos
import { Icon } from '@iconify/react';
import netflixIcon from '@iconify/icons-logos/netflix';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none'
  },
  menuButton: {
    margin: theme.spacing(2),
    backgroundImage: 'transparent',
    outline: 'none',
  },
  appBar: {
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to bottom ,black, transparent)',
    boxShadow: 'none',
    padding: '20px 0'
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const [iconBtn, setIconBtn] = React.useState(window.innerWidth)
  let [dropDown, setDropDown] = React.useState(null)
  let navButtons = null
  window.addEventListener('resize', () => {
    setIconBtn(window.innerWidth)
  })

  const handleClick = (event) => {
    setDropDown(event.currentTarget);
    console.log(event.currentTarget)
  };

  const handleClose = () => {
    setDropDown(null);
  };

  if (iconBtn > 500) {
    navButtons = (
      <div className={cls.navBtnContainer}>
        <Button classes={classes.menuButton} btnName='browse' />
        <Button classes={classes.menuButton} btnName='Mylist' />
        <Button classes={classes.menuButton} btnName='Top picks' />
      </div>
    )
  } else {
    navButtons = (
      <>
        <IconButton edge="start" onClick={handleClick} className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={dropDown}
          keepMounted
          open={Boolean(dropDown)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>browse</MenuItem>
          <MenuItem onClick={handleClose}>Mylist</MenuItem>
          <MenuItem onClick={handleClose}>Top picks</MenuItem>
        </Menu>
      </>
    )
  }


  return (
    <div className={classes.root}>
      <AppBar position="fixed" classes={{ root: classes.appBar }}>
        <Toolbar variant="dense" className={cls.iconBar}>

          <Typography variant="h6" color="inherit">
            <Icon icon={netflixIcon} width="150" height="60" />
          </Typography>
          {navButtons}
        </Toolbar>
      </AppBar>
    </div>
  );
}
