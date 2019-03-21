import React, { Component } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import Layout from '../../components/common/Layout/Layout';
import { Container, Button, Form, Row, Col, Image } from 'react-bootstrap';
import GoogleLogo from '../../styles/img/google-logo.png';
import { inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('userStore')
class Login extends Component {
  _handleClick = () => {
    this.props.userStore.setUserToSessionStorage();
  }

  render() {
    return (
      <div className={cx('Login')}>
        <Layout>
          <Container className={cx('login-container')}>
            <Row className={cx('row')}>
              <Col xs={12} sm={8} md={6} lg={5} xl={4}>
                <h5>Log in to your ClouDoc</h5>
                <Button className={cx('google-auth')}>
                  <Image src={GoogleLogo} />
                  <span>Continue with Google</span>
                </Button>
                <div className={cx('divider')}>
                  <span className={cx('or')}>or</span>
                </div>
                <Form className={cx('form-container')}>
                  <Form.Group controlId="form-basic-email">
                    <Form.Control className={cx('input-form')} type="email" placeholder="Email"/>
                  </Form.Group>
                  <Form.Group controlId="form-basic-password">
                    <Form.Control className={cx('input-form')} type="password" placeholder="Password" />
                  </Form.Group>
                  <Button className={cx('login-button')} variant="primary" type="submit" href='/' onClick={this._handleClick}>
                    Login
                  </Button>
                </Form>
                <div className={cx('link-for-password')}>
                  <a href="/">Forgot your password?</a>
                </div>
              </Col>
            </Row>
          </Container>
        </Layout>
      </div>
    );
  }
}

export default Login;