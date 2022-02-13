import {useState, useRef, useEffect} from 'react';

import colors from "assets/theme/base/colors";
import {ReactComponent as HomeIcon} from 'assets/images/home.svg';
import {ReactComponent as StakeIcon} from 'assets/images/stake.svg';
import {ReactComponent as DocsIcon} from 'assets/images/docs.svg';
import {ReactComponent as SocialIcon} from 'assets/images/social.svg';
import {ReactComponent as DiscordIcon} from 'assets/images/discord.svg';
import {ReactComponent as MediumIcon} from 'assets/images/medium.svg';
import {ReactComponent as TelegramIcon} from 'assets/images/telegram.svg';
import {ReactComponent as TwitterIcon} from 'assets/images/twitter.svg';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from "@mui/material";

import SuiButton from 'components/SuiButton';
import SuiBox from 'components/SuiBox';

function SubListItemButton(props) {
  const renderIcon = ((title) => {
    if (title === "Telegram")
      return <TelegramIcon fill={colors.text.main} width='20px' height='20px'/>
    else if (title === "Twitter")
      return <TwitterIcon fill={colors.text.main} width='20px' height='20px'/>
    else if (title === "Discord")
      return <DiscordIcon fill={colors.text.main} width='20px' height='20px'/>
    else if (title === "Medium")
      return <MediumIcon fill={colors.text.main} width='20px' height='20px'/>
  })
  return(
    <ListItemButton 
      component = "a"
      href = {props.url}
      target="_blank"
      sx= {{ padding:'2px 10px' }}
    >
      <ListItemIcon>
      {
        renderIcon(props.title)
      }
      </ListItemIcon>
      <ListItemText primary={props.title} primaryTypographyProps={{fontSize: '1rem'}}  />
    </ListItemButton>
  );
}

function SocialPopupMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let ref = useRef(null);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <SuiButton 
        variant= "text"
        color= "secondary"
        id='demo-customized-button'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        ref={ref}
      >
        <SocialIcon fill={colors.text.main} width="20px" height="20px"/>
        &nbsp;&nbsp;&nbsp;Social
      </SuiButton>
        <Menu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
        <MenuItem onClick={handleClose} disableRipple sx={{ paddingLeft:'0' }}>
          <SubListItemButton 
            title = "Telegram" 
            url = "https://t.me/titano_finance"
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple sx={{ paddingLeft:'0' }}>
          <SubListItemButton 
            title = "Twitter" 
            url = "https://twitter.com/TitanoFinance"
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple sx={{ paddingLeft:'0' }}>
          <SubListItemButton 
            title = "Discord" 
            url = "https://discord.gg/xxdS792B7q"
          />
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple sx={{ paddingLeft:'0' }}>
          <SubListItemButton 
            title = "Medium" 
            url = "https://titano.medium.com/"
          />
        </MenuItem>
        </Menu>
    </>
  );
}

function ListMainMenu() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360}}
      component = "ul"
      className = "vertical-bar clearfix dsk"
    >
      <Paper elevation={0} sx={{ maxWidth: 256, backgroundColor: 'inherit', padding:"0.5rem 0"}}>
      <ListItemButton component="a">
        <ListItemIcon >
          <HomeIcon fill={colors.text.main} width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText 
          primary="Home"
        />
      </ListItemButton>
      <ListItemButton component= "a" href="">
        <ListItemIcon>
          <StakeIcon fill={colors.text.main} width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItemButton>
      <ListItemButton component = "a">
        <ListItemIcon>
          <DocsIcon fill={colors.text.main} width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Docs"/>
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <SocialIcon fill={colors.text.main} width='24px' height='24px'/>
        </ListItemIcon>
        <ListItemText primary="Social" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <SubListItemButton 
            title = "Telegram" 
            url = "https://t.me/titano_finance"
            icon = {<TelegramIcon />}
          />
          <SubListItemButton 
            title = "Twitter" 
            url = "https://twitter.com/TitanoFinance"
            icon = {<TwitterIcon />}
          />
          <SubListItemButton 
            title = "Discord" 
            url = "https://discord.gg/xxdS792B7q"
            icon = {<DiscordIcon fill='white' width='24px' height='24px'/>}
          />
          <SubListItemButton 
            title = "Medium" 
            url = "https://titano.medium.com/"
            icon = {<MediumIcon fill='white' width='24px' height='24px'/>}
          />
        </List>
      </Collapse>
      </Paper>
    </List>
  );
}

function MainMenuForMobile() {
  const [open, setOpen] = useState(false);

  return(
    <SuiBox 
      className= "mobile-navbar"
      position="fixed" 
      bottom={0} 
      bgColor= "grey-200" 
      width="100%"
      zIndex={100}
    >
      <Grid container pr={1.5}>
        <Grid item xs= {3} height= "50px" pt={1.8}>
          <SuiButton 
            component= "a"
            href= "#"
            variant= "text"
            color= "secondary"
            fullWidth>
            <HomeIcon fill={colors.text.main} width="20px" height="20px"/>
            &nbsp;&nbsp;&nbsp;Home
          </SuiButton>
        </Grid>
        <Grid item xs= {3} height= "50px" pt={1.8}>
          <SuiButton 
            component= "a"
            href= "#"
            variant= "text"
            color= "secondary"
            fullWidth>
            <StakeIcon fill={colors.text.main} width="20px" height="20px"/>
            &nbsp;&nbsp;&nbsp;Account
          </SuiButton>
        </Grid>
        <Grid item xs= {3} height= "50px" pt={1.8}>
          <SuiButton 
            component= "a"
            href= "#"
            variant= "text"
            color= "secondary"
            fullWidth>
            <DocsIcon fill={colors.text.main} width="20px" height="20px"/>
            &nbsp;&nbsp;&nbsp;Docs
          </SuiButton>
        </Grid>
        <Grid item xs= {3} height= "50px" pt={1.8}>
          <SocialPopupMenu />
        </Grid>
      </Grid>
    </SuiBox>
  );
}

export default ListMainMenu;
export {MainMenuForMobile};