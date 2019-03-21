import React, { Component } from 'react';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import { Container, Navbar, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Header extends Component {

  render() {
    return (
      <Container className={cx('Header')}>
        <Navbar className={cx('navbarContainer')}>
          <Navbar.Brand as={'a'} href='/'>ClouDoc</Navbar.Brand>
          <div className={cx('buttonsWrapper')}>
            <Button className={cx('buttonSignIn')} href='/login' variant='link'>
              Sign In
            </Button>
            <Button className={cx('buttonSignUp')} href='/signup' variant='link'>
              Sign Up
            </Button>
          </div>
        </Navbar>
      </Container>
    );
  }
}

export default Header;