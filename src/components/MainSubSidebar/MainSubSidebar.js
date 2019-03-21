import React, { Component } from 'react';
import styles from './MainSubSidebar.module.scss';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import DummyAvatar from '../../styles/img/dummy.png';

const cx = classNames.bind(styles);

class MainSubSidebar extends Component {
  render() {
    return (
      <div className={cx('MainSubSidebar')}>
        <div className={cx('container')}>
          <div className={cx('user-avatar')}>
            <img src={DummyAvatar} alt="user avatar"/>
          </div>
          <div className={cx('user-info')}>
            <div className={cx('name')}>허준 원장님</div>
            <div className={cx('grade')}>일반 / 한의사</div>
          </div>
          <div className={cx('case-add-button')}>
            <Link to={`/case/create`}>
              <Button>
                증례 등록하기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default MainSubSidebar;