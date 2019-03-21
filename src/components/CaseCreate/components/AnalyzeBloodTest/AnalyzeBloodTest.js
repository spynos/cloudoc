import React, { Component } from 'react';
import styles from './AnalyzeBloodTest.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';
import AnalyzeBloodTestRowForm from './components/AnalyzeBloodTestRowForm';

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
    'treatmentStore'
)
@observer
class AnalyzeBloodTest extends Component {
    componentWillUnmount() {
        this.props.analyzeBloodTestStore.clear();
    }

    _handleTriggerClick = () => {
        let referenceData = {};
        const symptom = JSON.parse(JSON.stringify(this.props.symptomStore.editableData));
        const exam = JSON.parse(JSON.stringify(this.props.examinationStore.editableData));
        const lab = JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData));
        const diagnosis = JSON.parse(JSON.stringify(this.props.diagnosisStore.editableData));

        referenceData = {
            symptom: symptom.slice(),
            exam: exam.slice(),
            lab: lab.slice(),
            diagnosis: diagnosis.slice()
        }
        this.props.bloodTestStore.stateData.forEach((state, i) => {
            referenceData["lab"][i].state = state;
        });
        
        if (this.props.analyzeBloodTestStore.editableData.length === 0) {
            this.props.caseStore.analyzeLab(referenceData);
        }
        return null;
    }

    _handleClickForRetry = async () => {
        let referenceData = {};
        const symptom = JSON.parse(JSON.stringify(this.props.symptomStore.editableData));
        const exam = JSON.parse(JSON.stringify(this.props.examinationStore.editableData));
        const lab = JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData));
        const diagnosis = JSON.parse(JSON.stringify(this.props.diagnosisStore.editableData));

        referenceData = {
            symptom: symptom.slice(),
            exam: exam.slice(),
            lab: lab.slice(),
            diagnosis: diagnosis.slice()
        }
        this.props.bloodTestStore.stateData.forEach((state, i) => {
            referenceData["lab"][i].state = state;
        });

        await this.props.analyzeBloodTestStore.clear();
        await this.props.caseStore.analyzeLab(referenceData);
        return null;
    }
    
    render() {
        const { open } = this.props;
        return (
            <div id='ANLLab-Create' className={cx('AnalyzeBloodTest')}>
                <Collapsible transitionTime={150} open={open} trigger="혈액검사분석" onOpen={this._handleTriggerClick}>
                    <Container fluid>
                        <Row className={cx('table-container')}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        <th><div className={cx('label')}>순위</div></th>
                                        <th><div className={cx('label')}>질병명</div></th>
                                        <th><div className={cx('label')}>일치도</div></th>
                                        <th><div className={cx('label')}>일치항목</div></th>
                                        <th><div className={cx('label')}>불일치항목</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnalyzeBloodTestRowForm 
                                        analyzeBloodTests={this.props.analyzeBloodTestStore.editableData}
                                    />
                                </tbody>
                            </table>
                        </Row>
                        <Row className={cx('reanalysis-button')}>
                            <Button onClick={this._handleClickForRetry}>재분석</Button>
                        </Row>
                    </Container>
                </Collapsible>
            </div>
        );
    }
}

export default AnalyzeBloodTest;