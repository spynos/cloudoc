import React, { Component } from 'react';
import styles from './ServiceDescription.module.scss';
import classNames from 'classnames/bind';
import { Container, Col, Row, Image, Button } from 'react-bootstrap';
import DummyImg from '../../styles/img/dummy.png';

const cx = classNames.bind(styles);

class ServiceDescription extends Component {
  render() {
    return (
      <div className={cx('ServiceDescription')}>
        <Container>
          <Row className={cx('top')}>
            <Col className={cx('description-container')}>
              <div className={cx('image-wrapper')}>
                <Image className={cx('image')} src={DummyImg} />
                <h2>Main Function</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, laboriosam.</p>
              </div>
            </Col>
            <Col className={cx('description-container')}>
              <div className={cx('image-wrapper')}>
                <Image className={cx('image')} src={DummyImg} />
                <h2>Main Function</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, laboriosam.</p>
              </div>
            </Col>
          </Row>
          <Row className={cx('bottom')}>
            <Col className={cx('description-container')}>
              <div className={cx('image-wrapper')}>
                <Image className={cx('image')} src={DummyImg} />
                <h2>Main Function</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, laboriosam.</p>
              </div>
            </Col>
            <Col className={cx('description-container')}>
              <div className={cx('image-wrapper')}>
                <Image className={cx('image')} src={DummyImg} />
                <h2>Main Function</h2>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, laboriosam.</p>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={cx('button-wrapper')}>
          <h4>Promotion Text</h4>
          <Button href='/login'>Start Now, It's FREE !</Button>
        </div>
      </div>
    );
  }
}

export default ServiceDescription;