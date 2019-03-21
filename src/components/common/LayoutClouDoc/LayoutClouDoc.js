import React, { Component } from 'react';
import styles from './LayoutClouDoc.module.scss';
import classNames from 'classnames/bind';
import MainSidebar from '../../MainSidebar';
import TopHeader from '../TopHeader/TopHeader';
import { inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('caseStore')
class LayoutClouDoc extends Component {
  componentDidMount(){
    this.props.caseStore.loadCases();
    this.container.addEventListener("scroll", this.showBar);
  }

  componentWillUnmount(){
      this.container.removeEventListener("scroll", this.showBar);
  }

  showBar = () => {
      const { 
        isShowingTopbar,
        referenceForIsShowingTopbar 
      } = this.props.caseStore;

      if (this.container.scrollTop > referenceForIsShowingTopbar && !isShowingTopbar) {
        return this.props.caseStore.setIsShowingTopbar(true);
      }
      if (this.container.scrollTop < referenceForIsShowingTopbar && isShowingTopbar) {
        return this.props.caseStore.setIsShowingTopbar(false);
      }
  }

  render() {
    const { subSidebar, create } = this.props;

    return (
      <div className={cx('LayoutClouDoc')}>
        <div className={cx('main-sidebar')}>
          <MainSidebar />
        </div>
        <div className={cx('sub-sidebar')}>
          {subSidebar}
        </div>
        <div 
          ref={ref => {
            this.container = ref;
          }}
          className={cx('main-container')}
        >
          {
            create && <TopHeader />
          }
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default LayoutClouDoc;