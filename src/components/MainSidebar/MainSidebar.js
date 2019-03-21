import React, { Component } from 'react';
import styles from './MainSidebar.module.scss';
import classNames from 'classnames/bind';
import Logo from '../../styles/img/dummy.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faBook, faPlus, faBars, faUserTie, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class MainSidebar extends Component {
  render() {
    return (
      <div className={cx('MainSidebar')}>
        <div className={cx('brand-logo')}>
          <img src={Logo} alt="ClouDoc-Logo"/>
        </div>
        <div className={cx('nav-container')}>
          <div className={cx('top-buttons-wrapper')}>
            <Link 
              className={cx('nav-button')}
              to={`/case/create`}
            >
              <FontAwesomeIcon className={cx('icon', 'plus')} icon={faPlus} />
            </Link>
            <Link 
              className={cx('nav-button')}
              to='/'
            >
              <FontAwesomeIcon className={cx('icon', 'folder')} icon={faFolder} />
            </Link>
            <Link 
              className={cx('nav-button')}
              to='/clinicaldb'
            >
              <FontAwesomeIcon className={cx('icon', 'book')} icon={faBook} />
            </Link>
          </div>
          <div className={cx('bottom-buttons-wrapper')}>
            <div className={cx('nav-button')}>
              <FontAwesomeIcon className={cx('icon', 'bars')} icon={faBars} />
            </div>
            <div className={cx('nav-button')}>
              <FontAwesomeIcon className={cx('icon', 'user')} icon={faUserTie} />
            </div>
            <div className={cx('nav-button')}>
              <FontAwesomeIcon className={cx('icon', 'question')} icon={faQuestionCircle} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainSidebar;