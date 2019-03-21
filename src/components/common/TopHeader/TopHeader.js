import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './TopHeader.module.scss';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'react-bootstrap';
import momentHelper from '../../../util/momentHelper';

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
class TopHeader extends Component {
    handleClickSaveButton = () => {
        const dateNow =  momentHelper.getLocaleDateWithYYYY(new Date());
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
        newCase.patient.chart_id = '';
        newCase.record[0].symptom = symptom.slice();
        newCase.record[0].exam = exam.slice();
        newCase.record[0].lab = lab.slice();
    
        this.props.bloodTestStore.stateData.forEach((state, i) => {
            newCase.record[0].lab[i].state = state;
        })
    
        newCase.record[0].analyzeSymptom = analyzeSymptom.slice();
        newCase.record[0].analyzeLab = analyzeLab.slice();
        newCase.record[0].diagnosis = diagnosis.slice();
        newCase.record[0].analyzeTreatment = analyzeTreatment.slice();
        newCase.record[0].treatment = {...treatment, fomula};
        newCase.record[0].memo = memo;
    
        console.log(newCase);

        this.props.caseStore.postCase(newCase);
        this.props.history.push('/');
    }

    render() {
        const { isShowingTopbar } = this.props.caseStore;
        const numberOfCases = this.props.caseStore.numberOfCases + 1;

        return (
            <div className={cx('TopHeader', { isShowingTopbar: isShowingTopbar})}>
                <Container>
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
                </Container>
            </div>
        );
    }
}

export default TopHeader;