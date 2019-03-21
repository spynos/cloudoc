import React, { Component } from 'react';
import styles from './ServiceIntro.module.scss';
import classNames from 'classnames/bind';
import { Jumbotron, Row, Col, Button, Container } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('userStore')
@observer
class ServiceIntro extends Component {
  _handleClick = () => {
    this.props.userStore.setUserToSessionStorage();
  }
  render() {
    return (
      <div className={cx('ServiceIntro')}>
        <Container className={cx('container')}>
          <Jumbotron className={cx('jumbotron')}>
            <Row className={cx('top')}>
              <Col className={cx('text')}>
                <h1>어제의 너와 나, 오늘의 우리</h1>
                <p>한의사들의 임상 증례를 바탕으로 임상 데이터를 수집하고 분석하여, <br />
                맞춤형으로 진료를 보조하는 서비스입니다</p>
              </Col>
            </Row>
            <Row className={cx('bottom')}>
              <Col className={cx('button')}>
                <Button href='/' variant='dark' onClick={this._handleClick}>
                  Cloudoc 시작하기
                </Button>
              </Col>
            </Row>
          </Jumbotron>
        </Container>
      </div>
    );
  }
}

export default ServiceIntro;