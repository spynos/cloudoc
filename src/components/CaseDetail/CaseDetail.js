import React, { Component, Fragment } from 'react';
import styles from './CaseDetail.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { Container, Row, Button } from 'react-bootstrap';
import '../../styles/collapsible.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faFilePdf, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
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
import TopHeaderForCaseDetail from './components/TopHeaderForCaseDetail';

const cx = classNames.bind(styles);

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
class CaseDetail extends Component {
  async componentDidMount() {
    const { id, dateIndex } = this.props.match.params;
    await this.props.caseStore.setCurrentCase(id, dateIndex);
    this.containerForCaseDetail.addEventListener("scroll", this.showBar);
    this.props.caseStore.setReferenceForIsShowingTopbar(this.recordWrapper.getBoundingClientRect().top);
    this.props.caseStore.clearIsShowingTopbar();
    this.props.clinicaldbStore.loadClinicaldbs();
  }

  // 다른 진료날짜의 진료내역을 선택했을 때, 컴포넌트 리렌더링
  // componentDidUpdate(prevProps) {
  //   if (prevProps.match.params !== this.props.match.params) {
  //     const { caseStore } = this.props;
  //     const { id, dateIndex } = this.props.match.params;
  //     caseStore.setCurrentCase(id, dateIndex);
  //   }
  // }

  componentWillUnmount() {
    this.props.caseStore.clearIsEditing();
    this.containerForCaseDetail.removeEventListener("scroll", this.showBar);
  }

  showBar = () => {
      const { 
        isShowingTopbar,
        referenceForIsShowingTopbar 
      } = this.props.caseStore;

      if (this.containerForCaseDetail.scrollTop > referenceForIsShowingTopbar && !isShowingTopbar) {
        return this.props.caseStore.setIsShowingTopbar(true);
      }
      if (this.containerForCaseDetail.scrollTop < referenceForIsShowingTopbar && isShowingTopbar) {
        return this.props.caseStore.setIsShowingTopbar(false);
      }
  }

  _renderRecordDate = (recordDates, activeDate) => {
    return recordDates.map((recordDate, i) => {
      const { id, index } = this.props.match.params;
      
      return (
        <Link 
          key={i} 
          className={cx('record', {active: activeDate === recordDate})}
          to={`/case/detail/${id}/${index}/${i}`}
        >
          {recordDate}
        </Link>
      )
    })
  }

  _handleClickAddRecordButton = async () => {
    const { id } = this.props.match.params;
    const caseId = this.props.caseStore.currentCasePatient.id;
    const index = id - 1;
    const lengthOfRecord = this.props.caseStore.cases[index].record.length;
    const createdDate =  momentHelper.getLocaleDateWithYYYY(new Date());
    const lastDate = this.props.caseStore.cases[index].record[lengthOfRecord - 1].createdDate;

    if (createdDate === lastDate) {
      return alert('동일날짜 진료가 이미 있습니다.');
    }
    await this.props.caseStore.addNewRecordToCase(index, caseId);
    this.props.history.replace(`/case/detail/${id}/0`);
  }

  _handleClickEditingButton = () => {
    this.props.caseStore.toggleIsEditing();
  }

  _handleClickDeleteRecordButton = async () => {
    const caseId = this.props.caseStore.currentCasePatient.id;
    const { id } = this.props.match.params;
    const index = id - 1;

    if (this.props.caseStore.currentCaseRecord.length <= 1) {
      return alert(`마지막 진료입니다. 완전삭제를 원하시면, 증례 #${id} 를 삭제해 주세요`);
    }

    if (this.props.caseStore.currentCaseRecord.length > 1) {
      await this.props.caseStore.deleteRecordFromCase(index, caseId);
      this.props.history.replace(`/case/detail/${id}/0`);
    }
    
  }

  _handleClickDeleteCaseButton = async () => {
    const caseId = this.props.match.params.id;
    await this.props.caseStore.deleteCase(caseId);
    this.props.history.replace(`/`);
  }

  _handleClickSaveButton = () => {
    const { currentCaseRecordDate } = this.props.caseStore;
    const { id, dateIndex } = this.props.match.params;

    let updatedCase = {
      record: [
        {
          createdDate: currentCaseRecordDate,
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

    let patientInfo = JSON.parse(JSON.stringify(this.props.patientInfoStore.editableData));
    let symptom = JSON.parse(JSON.stringify(this.props.symptomStore.editableData));
    let exam = JSON.parse(JSON.stringify(this.props.examinationStore.editableData));
    let lab = JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData));
    let analyzeSymptom = JSON.parse(JSON.stringify(this.props.analyzeSymptomStore.editableData));
    let analyzeLab = JSON.parse(JSON.stringify(this.props.analyzeBloodTestStore.editableData));
    let diagnosis = JSON.parse(JSON.stringify(this.props.diagnosisStore.editableData));
    let analyzeTreatment = JSON.parse(JSON.stringify(this.props.analyzeRecommendationTreatmentStore.editableData));
    let treatment = JSON.parse(JSON.stringify(this.props.treatmentStore.editableDataForTreatment));
    let fomula = JSON.parse(JSON.stringify(this.props.treatmentStore.editableData));
    let { memo } = this.props.memoStore.editableData;

    updatedCase = { ...updatedCase, patient: patientInfo };
    updatedCase.record[0].symptom = symptom.slice();

    updatedCase.record[0].symptom.forEach((symptom, i) => {
      updatedCase.record[0].symptom[i].onset = momentHelper.getLocaleDateWithYYYY(updatedCase.record[0].symptom[i].onset);
    })

    updatedCase.record[0].exam = exam.slice();
    updatedCase.record[0].lab = lab.slice();

    this.props.bloodTestStore.stateData.forEach((state, i) => {
      updatedCase.record[0].lab[i].state = state;
    });

    updatedCase.record[0].analyzeSymptom = analyzeSymptom.slice();
    updatedCase.record[0].analyzeLab = analyzeLab.slice();
    updatedCase.record[0].diagnosis = diagnosis.slice();
    updatedCase.record[0].analyzeTreatment = analyzeTreatment.slice();
    updatedCase.record[0].treatment = {...treatment, fomula};
    updatedCase.record[0].memo = memo;
    
    this.props.caseStore.updateCase(dateIndex, id, updatedCase);
  }

  render() {
    const { isEditing ,isLoading } = this.props.caseStore;
    const { 
      currentCasePatient,
      currentCaseDetail,
      currentCaseRecord
    } = this.props.caseStore;

    const { index } = this.props.match.params;
    const caseNumber = +index + 1;

    const {
      symptom,
      exam,
      lab,
      analyzeSymptom,
      analyzeLab,
      diagnosis,
      analyzeTreatment,
      treatment,
      memo
    } = currentCaseDetail;

    const currentCaseRecordDate = this.props.caseStore.currentCaseRecordDate;

    if (
      isLoading ||
      currentCasePatient === undefined ||
      currentCaseDetail === undefined ||
      currentCaseRecord === undefined
      ) {
      return (
        <div className={cx('CaseDetail', 'loading-container')}>
          <div className={cx("spinner-grow")} role="status">
            <span className={cx("sr-only")}>Loading...</span>
          </div>
        </div>
      );
    }
    
    const open = true;

    return (
      <div 
        ref={ref => {
              this.containerForCaseDetail = ref;
            }}
        className={cx('CaseDetail')}
      >
      <TopHeaderForCaseDetail 
            caseNumber={caseNumber}
            isEditing={isEditing}
      />
          <Container fluid={isEditing}>
            <Row className={cx('header')}>
              <div className={cx('case-number')}>{`증례 # ${caseNumber}`}</div>
              <div className={cx('edit-save-delete-createPDF-button')}>
                {
                  isEditing
                  ? <div 
                      className={cx('button', 'cancel-button')}
                      onClick={this._handleClickEditingButton}
                    >
                      <FontAwesomeIcon className={cx('icon', 'cancel')} icon={faUndoAlt} />
                      <div className={cx('label')}>취소</div>
                    </div>
                  : <div 
                      className={cx('button', 'edit-button')}
                      onClick={this._handleClickEditingButton}
                    >
                      <FontAwesomeIcon className={cx('icon', 'edit')} icon={faEdit} />
                      <div className={cx('label')}>편집</div>
                    </div>
                }
                <div 
                  className={cx('button', 'delete-button')}
                  onClick={this._handleClickDeleteRecordButton}
                >
                  <FontAwesomeIcon className={cx('icon', 'trash')} icon={faTrash} />
                  <div className={cx('label')}>삭제</div>
                </div>
                {
                  isEditing
                  && <div 
                      className={cx('button', 'save-button')}
                      onClick={this._handleClickSaveButton}
                    >
                      <FontAwesomeIcon className={cx('icon', 'save')} icon={faSave} />
                      <div className={cx('label')}>저장</div>
                    </div>
                }
                {
                  !isEditing
                  && <Fragment>
                      <div 
                        className={cx('button', 'delete-button')}
                        onClick={this._handleClickDeleteCaseButton}
                      >
                        <FontAwesomeIcon className={cx('icon', 'trash')} icon={faTrash} />
                        <div className={cx('label')}>증례삭제</div>
                      </div>
                    </Fragment>
                }
                {
                  !isEditing
                  && <div className={cx('button', 'createPDF-button')}>
                      <FontAwesomeIcon className={cx('icon', 'filePdf')} icon={faFilePdf} /> 
                      <div className={cx('label')}>PDF생성</div>
                    </div>
                }
              </div>
            </Row>
            <div className={cx('main')}>
              <div className={cx('record-button-wrapper')}>
                <div 
                  className={cx('add-button')}
                  onClick={this._handleClickAddRecordButton}
                >
                    새 진료
                </div>
                {this._renderRecordDate(currentCaseRecord, currentCaseRecordDate)}
              </div>
            </div>
              <div 
                ref={ref => {
                this.recordWrapper = ref;
                }}
                className={cx('input-form-container')}>
                <PatientInfo isEditing={isEditing} open={open} patientInfo={currentCasePatient}/>
                <Symptom isEditing={isEditing} open={open} symptom={symptom} />
                <Examination isEditing={isEditing} open={open} examination={exam} />
                <BloodTest isEditing={isEditing} open={open} bloodTest={lab} />
                <AnalyzeSymptom isEditing={isEditing} open={open} analyzeSymptom={analyzeSymptom} />
                <AnalyzeBloodTest isEditing={isEditing} open={open} analyzeBloodTest={analyzeLab} />
                <Diagnosis isEditing={isEditing} open={open} diagnosis={diagnosis} />
                <AnalyzeRecommendationTreatment isEditing={isEditing} open={open} analyzeRecommendationTreatment={analyzeTreatment} />
                <Treatment isEditing={isEditing} open={open} treatment={treatment} />
                <Memo isEditing={isEditing} open={open} memo={memo} />
                {
                  isEditing 
                  && <div 
                      className={cx('submit-button')}
                      onClick={this._handleClickSaveButton}
                    >
                    <Button>수정완료</Button>
                  </div>
                }
            </div>
          </Container>
      </div>
    );
  }
}

export default CaseDetail;