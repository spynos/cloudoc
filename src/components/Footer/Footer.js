import React, { Component } from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Container, Row, ListGroup } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Footer extends Component {
  render() {
    return (
      <Container className={cx('Footer')}>
        <Row className={cx('top')}>
          <ListGroup className={cx('link-wrapper')} variant="flush">
            <ListGroup.Item className={cx('list-item')}>
              <Link to='#'>About</Link>
            </ListGroup.Item>
            <ListGroup.Item className={cx('list-item')}>
              <Link to='#'>Service</Link>
            </ListGroup.Item>
            <ListGroup.Item className={cx('list-item')}>
              <Link to='#'>Privacy</Link>
            </ListGroup.Item>
            <ListGroup.Item className={cx('list-item')}>
              <Link to='#'>Terms</Link>
            </ListGroup.Item>
            <ListGroup.Item className={cx('list-item')}>
              <Link to='#'>Contact</Link>
            </ListGroup.Item>
          </ListGroup>
        </Row>
        <Row className={cx('bottom')}>
          <div className={cx('copyright')}>
            ClouDoc &copy; Copyright 2019. All rights reserved.
          </div>
        </Row>
      </Container>
    );
  }
}

export default Footer;