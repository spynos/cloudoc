import React, { Component } from 'react';
import styles from './CaseSubSidebar.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import SearchForClinicaldb from './components/SearchForClinicaldb/SearchForClinicaldb';
const cx = classNames.bind(styles);

@withRouter
class CaseSubSidebar extends Component {
  render() {
    const { pathname } = this.props.location;
    const type = this.props.location.pathname.split("/")[2] === 'detail' ? 'Case' : 'Create';
    
    return (
      <div className={cx('CaseSubSidebar')}>
        <div className={cx('container')}>
          <div className={cx('top')}>
            <div className={cx('title')}>
              증례기록
            </div>
            <div className={cx('list-wrapper')}>
              <ul className={cx('menu-list')}>
                <li className={cx('menu-list-item')}>
                <a href={`${pathname}#PatientInfo-${type}`}>환자정보</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Symptom-${type}`}>증상</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Lab-${type}`}>혈액검사</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Exam-${type}`}>진찰</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#ANLSymptom-${type}`}>증상 분석</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#ANLLab-${type}`}>혈액검사 분석</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Diagnosis-${type}`}>진단</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#ANLTreatment-${type}`}>추천 처방</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Drug-${type}`}>처방</a>
                </li>
                <li className={cx('menu-list-item')}>
                  <a href={`${pathname}#Memo-${type}`}>주치의 소견</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={cx('bottom')}>
            <div className={cx('title')}>
              임상정보 검색
            </div>
            <SearchForClinicaldb />
          </div>
        </div>
      </div>
    );
  }
}

export default CaseSubSidebar;