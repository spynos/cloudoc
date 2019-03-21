import React, { Component } from 'react';
import styles from './AnalyzeRecommendationTreatment.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';
import AnalyzeRecommendationTreatmentRowForm from './components/AnalyzeRecommendationTreatmentRowForm';

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
class AnalyzeRecommendationTreatment extends Component {
    componentWillUnmount() {
        this.props.analyzeRecommendationTreatmentStore.clear();
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

        if (this.props.analyzeRecommendationTreatmentStore.editableData.length === 0) {
            this.props.caseStore.analyzeTreatment(referenceData);
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

        await this.props.analyzeRecommendationTreatmentStore.clear();
        await this.props.caseStore.analyzeTreatment(referenceData);
        return null;
    }

    render() {
        const { open } = this.props;
        return (
            <div id='ANLTreatment-Create' className={cx('AnalyzeRecommendationTreatment')}>
                <Collapsible transitionTime={150} open={open} trigger="추천처방분석" onOpen={this._handleTriggerClick}>
                    <Container fluid>
                        <Row className={cx('table-container')}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        <th><div className={cx('label')}>순위</div></th>
                                        <th><div className={cx('label')}>처방명</div></th>
                                        <th><div className={cx('label')}>관련질병</div></th>
                                        <th><div className={cx('label')}>판단근거</div></th>
                                        <th><div className={cx('label')}>참고문헌</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnalyzeRecommendationTreatmentRowForm 
                                        analyzeRecommendationTreatments={this.props.analyzeRecommendationTreatmentStore.editableData}
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

export default AnalyzeRecommendationTreatment;