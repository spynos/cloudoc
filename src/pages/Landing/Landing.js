import React, { Component } from 'react';
import styles from './Landing.module.scss';
import classNames from 'classnames/bind';
import Layout from '../../components/common/Layout/Layout';
import ServiceIntro from '../../components/ServiceIntro';
// import ServiceDescription from '../../components/ServiceDescription/ServiceDescription';

const cx = classNames.bind(styles);

class Landing extends Component {
  render() {
    return (
      <div className={cx('Landing')}>
        <Layout>
          <ServiceIntro />
          
        </Layout>
      </div>
    );
  }
}

export default Landing;