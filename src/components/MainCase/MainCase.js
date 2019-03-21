import React, { Component } from 'react';
import styles from './MainCase.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import SearchBar from './components/SearchBar/SearchBar';
import FilterButtonGroup from './components/FilterButtonGroup/FilterButtonGroup';

const cx = classNames.bind(styles);

@inject('caseStore')
@observer
class MainCase extends Component {
  async componentDidMount() {
    await this.props.caseStore.loadCases();
  }

  handleOnSearch = (searchKeyword) => {
    this.props.caseStore.setSearchKeyword(searchKeyword);
}

  _renderCases = (cases) => {
    // 인자로 금지명인 'case'를 하면 에러발생, 그래서 'Case' 로 함
    return cases.map((Case, i) => {
      const caseId = Case._id;
      const latestRecordIndex = Case.record.length - 1;
      const {
        gender,
        age,
        chart_id
      } = Case.patient;
      
      const { symptom, diagnosis, treatment } = Case.record[latestRecordIndex];

      return (            
        <div className={cx('cases-wrapper')} key={i}>
          <Link 
            className={cx('case')}
            to={`/case/detail/${caseId}/${i}/${0}`}
          >
            <div className={cx('case-number')}>
              <div className={cx('chart-id')}>{` #${chart_id}`}</div>
              <div className={cx('number')}>{`${i + 1}`}</div>
            </div>
            <div className={cx('case-content')}>
              <div className={cx('content-item')}>
                <span className={cx('label')}>인적사항</span>
                <div className={cx('content')}>{`${gender}, ${age}세`}</div>
              </div>
              <div className={cx('content-item')}>
                <span className={cx('label')}>증상</span>
                <div className={cx('content')}>
                  {this._renderSymptom(symptom)}
                </div>
              </div>
              <div className={cx('content-item')}>
                <span className={cx('label')}>진단</span>
                <div className={cx('content')}>
                  {this._renderDiagnosis(diagnosis)}
                </div>
              </div>
              <div className={cx('content-item')}>
                <span className={cx('label')}>처방</span>
                <div className={cx('content')}>
                  {this._renderTreatments(treatment)}
                </div>
              </div>
            </div>
          </Link>
        </div>
      )
    });
  }

  _renderSymptom = (symptoms) => {
    return symptoms.map((symptom, i) => {
      const { name } = symptom;
      return (
          <div key={i} className={cx('item')}>{name}</div>
        );
    })
  }

  _renderDiagnosis = (diagnosis) => {
    return diagnosis.map((diagnosis, i) => {
      const { conditionName } = diagnosis;
      return (
          <div key={i} className={cx('item')}>{conditionName}</div>
        );
    })
  }

  _renderTreatments = (treatment) => {
      const { drugName } = treatment;
      return (
          <div className={cx('item')}>{drugName}</div>
        );
  }

  render() {
    const { cases } = this.props.caseStore;
    const { isLoading } = this.props.caseStore;
    
    if (isLoading) {
      return (
        <div className={cx('MainCase', 'loading-container')}>
          <div className={cx("spinner-grow")} role="status">
            <span className={cx("sr-only")}>Loading...</span>
          </div>
        </div>
      );
    }
    
    return (
      <div className={cx('MainCase')}>
          <Container fluid>
            <Row className={cx('title-container')}>
              <Col>
                <div className={cx('title')}>
                  현재 등록된 증례
                </div>
              </Col>
            </Row>
            <Row className={cx('search-bar-container')}>
              <Col>
                <SearchBar onSearch={_.debounce(this.handleOnSearch, 300)} />
              </Col>
            </Row>
            <Row className={cx('filter-buttons-container')}>
              <Col>
                <FilterButtonGroup />
              </Col>
            </Row>
            <Row className={cx('cases-container')}>
              <Col>
                  {this._renderCases(cases)}
              </Col>
            </Row>
          </Container>
      </div>
    );
  }
}

export default MainCase;