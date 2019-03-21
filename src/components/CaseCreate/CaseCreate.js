import React, { Component } from 'react';
import styles from './CaseCreate.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Container, Row, Button } from 'react-bootstrap';
import '../../styles/collapsible.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import PatientInfo from './components/PatientInfo/PatientInfo';
import Symptom from './components/Symptom/Symptom';
import Examination from './components/Examination/Examination';
import BloodTest from './components/BloodTest/BloodTest';
import AnalyzeSymptom from './components/AnalyzeSymptom/AnalyzeSymptom';
import AnalyzeBloodTest from './components/AnalyzeBloodTest/AnalyzeBloodTest';
import Diagnosis from './components/Diagnosis';
import AnalyzeRecommendationTreatment from './components/AnalyzeRecommendationTreatment';
import Treatment from './components/Treatment';
import Memo from './components/Memo/Memo';
import momentHelper from '../../util/momentHelper';

const cx = classNames.bind(styles);

@withRouter
@inject(
  'caseStore',
  'patientInfoStore',
  'memoStore',
  'symptomStore',
  'examinationStore',
  'bloodTestStore',
  'analyzeSymptomStore',
  'analyzeBloodTestStore',
  'diagnosisStore',
  'analyzeRecommendationTreatmentStore',
  'treatmentStore',
  'clinicaldbStore'
)
@observer
class CaseCreate extends Component {
  componentDidMount() {
    this.props.caseStore.setReferenceForIsShowingTopbar(this.recordWrapper.getBoundingClientRect().top);
    this.props.caseStore.clearIsShowingTopbar();
    this.props.clinicaldbStore.loadClinicaldbs();
  }

  componentWillUnmount() {
    this.props.caseStore.clear();
  }

  handleClickSaveButton = () => {
    const dateNow =  momentHelper.getLocaleDateWithYYYY(Date.now());
    let newCase = {
      user_id: "admin",
      created_date: dateNow,
      record: [
        {
          createdDate: dateNow,
          symptom: [],
          exam: [],
          lab: [],
          analyzeSymptom: [],
          analyzeLab: [],
          diagnosis: [],
          analyzeTreatment: [],
          treatment: {},
          memo: ''
        }
      ]
    };

    const patientInfo = JSON.parse(JSON.stringify(this.props.patientInfoStore.editableData));
    const symptom = JSON.parse(JSON.stringify(this.props.symptomStore.editableData));
    const exam = JSON.parse(JSON.stringify(this.props.examinationStore.editableData));
    const lab = JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData));
    const analyzeSymptom = JSON.parse(JSON.stringify(this.props.analyzeSymptomStore.editableData));
    const analyzeLab = JSON.parse(JSON.stringify(this.props.analyzeBloodTestStore.editableData));
    const diagnosis = JSON.parse(JSON.stringify(this.props.diagnosisStore.editableData));
    const analyzeTreatment = JSON.parse(JSON.stringify(this.props.analyzeRecommendationTreatmentStore.editableData));
    const treatment = JSON.parse(JSON.stringify(this.props.treatmentStore.editableDataForTreatment));
    const fomula = JSON.parse(JSON.stringify(this.props.treatmentStore.editableData));
    const { memo } = this.props.memoStore.editableData;

    newCase = { ...newCase, patient: patientInfo };
    newCase.record[0].symptom = symptom.slice();
    newCase.record[0].exam = exam.slice();
    newCase.record[0].lab = lab.slice();

    this.props.bloodTestStore.stateData.forEach((state, i) => {
      newCase.record[0].lab[i].state = state;
    });

    newCase.record[0].analyzeSymptom = analyzeSymptom.slice();
    newCase.record[0].analyzeLab = analyzeLab.slice();
    newCase.record[0].diagnosis = diagnosis.slice();
    newCase.record[0].analyzeTreatment = analyzeTreatment.slice();
    newCase.record[0].treatment = {...treatment, fomula};
    newCase.record[0].memo = memo;
    
    this.props.caseStore.postCase(newCase);
    this.props.history.push('/');
  }

  render() {
    const { isLoading } = this.props.caseStore;

    if (isLoading) {
      return (
        <div className={cx('CaseCreate', 'loading-container')}>
          <div className={cx("spinner-grow")} role="status">
            <span className={cx("sr-only")}>Loading...</span>
          </div>
        </div>
      );
    }

    const dateNow =  momentHelper.getLocaleDateWithYYYY(new Date());
    const numberOfCases = this.props.caseStore.numberOfCases + 1;

    return (
      <div 
        ref={(ref) => {
          this.caseCreate = ref;
        }}
        className={cx('CaseCreate')}
      >
        <Container fluid>
          <Row className={cx('header')}>
            <div className={cx('case-number')}>{`증례 # ${numberOfCases}`}</div>
            <div className={cx('edit-save-delete-createPDF-button')}>
              <div 
                className={cx('button', 'delete-button')}
                onClick={() => {
                  this.props.history.push(`/`);
                }}
              >
                <FontAwesomeIcon className={cx('icon', 'trash')} icon={faUndoAlt} />
                <div className={cx('label')}>취소</div>
              </div>
              <div 
                className={cx('button', 'save-button')}
                onClick={this.handleClickSaveButton}
              >
                <FontAwesomeIcon className={cx('icon', 'save')} icon={faSave} />
                <div className={cx('label')}>저장</div>
              </div>
            </div>
          </Row>
          <div
            ref={ref => {
              this.recordWrapper = ref;
            }}
            className={cx('main')}
          >
            <div className={cx('record-button-wrapper')}>
              <div className={cx('record', 'active')}>
                {dateNow}
              </div>
            </div>
          </div>
          <div className={cx('input-form-container')}>
            <PatientInfo open={true} />
            <Symptom open={true} />
            <Examination open={true} />
            <BloodTest open={true} />
            <AnalyzeSymptom open={false} />
            <AnalyzeBloodTest open={false} />
            <Diagnosis open={true} />
            <AnalyzeRecommendationTreatment open={false} />
            <Treatment open={true} />
            <Memo open={true} />
            <div className={cx('submit-button')}>
              <Button onClick={this.handleClickSaveButton}>작성완료</Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default CaseCreate;