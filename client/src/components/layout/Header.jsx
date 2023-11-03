import { AppBar, Box, Button, Typography } from '@mui/material';
import MyLogo from '../../assets/question mark.png';
import './Layout.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const { user } = useSelector((state) => state);
  return (
    <AppBar
      position="fixed"
      sx={{
        flexDirection: 'inherit',
        background: 'white',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.14) 0px 0px 3px',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <div className="container">
        <img src={MyLogo} style={{ width: 60 }} alt="Logo" />
        <Link to="/">
          <Typography color="primary" className="brand">
            FunEnglish
          </Typography>
        </Link>
      </div>
      <nav>
        <ul className="nav__links">
          <li>
            <NavLink to="/grammar" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Grammar checking
            </NavLink>
          </li>
          <li>
            <NavLink to="/speaking" className={({ isActive }) => (isActive ? 'active' : undefined)}>
              Text to speech
            </NavLink>
          </li>
          {user.token ? (
            <li>
              <NavLink exact="true" to="/profile" className={({ isActive }) => (isActive ? 'active' : undefined)}>
                {' '}
                Profile
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink exact="true" to="/playing" style={({ isActive }) => (isActive ? 'active' : undefined)}>
                {' '}
                Playing quiz
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {/* {isLogin ?
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography color='black'>{userName}</Typography>
            <Button style={{ marginLeft: 10 }} onClick={logout}>Đăng xuất</Button></div>
        : <Link to="/login" className='login-button'>Đăng nhập</Link>} */}
      {user.token ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: 'black' }}>Hi, {user.user.username}</Typography>
          <Button onClick={() => handleLogout()}>Logout</Button>
        </Box>
      ) : (
        <>
          <Box sx={{ '& button': { mr: 3 } }}>
            <Button variant="contained">Sign Up</Button>
            <Button variant="outlined">Play</Button>
          </Box>
        </>
      )}
    </AppBar>
  );
};

export default Header;
