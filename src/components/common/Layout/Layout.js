import React, { Component } from 'react';
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';
import Header from '../../Header';
import Footer from '../../Footer';
const cx = classNames.bind(styles);

class Layout extends Component {

  render() {
    const { children } = this.props;
    
    return (
      <div className={cx('Layout')}>
        <div className={cx('header-container')}>
          <Header />
        </div>
        <div className={cx('main-container')}>
          {children}
        </div>
        <div className={cx('footer-container')}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Layout;