import React, { Component, Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './TopHeaderForCaseDetail.module.scss';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row } from 'react-bootstrap';
import { faEdit, faSave, faTrash, faFilePdf, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import momentHelper from '../../../../util/momentHelper';


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
    'treatmentStore'
)
@observer
class TopHeaderForCaseDetail extends Component {
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
        const {
            caseNumber,
            isEditing
        } = this.props;
        const { isShowingTopbar } = this.props.caseStore;

        return (
            <div className={cx('TopHeaderForCaseDetail', { isEditing: isEditing} ,{ isShowingTopbar: isShowingTopbar})}>
                <Container>
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
                </Container>
            </div>
        );
    }
}

export default TopHeaderForCaseDetail;