import React, { Component } from 'react';
import styles from './ClinicalCreate.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col } from 'react-bootstrap';
import { inject, observer } from 'mobx-react';
import SectionButtonGroup from './components/SectionButtonGroup';
import Symptom from './components/Symptom/Symptom';
import BloodTest from './components/BloodTest/BloodTest';
import Exam from './components/Exam/Exam';
import Condition from './components/Condition/Condition';
import Drug from './components/Drug/Drug';
import Reference from './components/Reference/Reference';

const cx = classNames.bind(styles);

@inject('clinicalCreateStore')
@observer
class ClinicalCreate extends Component {
    _renderCreateComponent = () => {
        const { sectionKeyword } = this.props.clinicalCreateStore;

        switch(sectionKeyword) {
            case 'symptom':
                return <Symptom />
            case 'lab':
                return <BloodTest />
            case 'exam':
                return <Exam />
            case 'condition':
                return <Condition />
            case 'drug':
                return <Drug />
            case 'reference':
                return <Reference />
            default:
                return <div>no match sectionName</div>
        }
    }
    render() {
        return (
            <div className={cx('ClinicalCreate')}>
                <Container>
                    <Row className={cx('title-container')}>
                        <Col>
                            <div className={cx('title')}>
                            새 임상정보 생성
                            </div>
                        </Col>
                    </Row>
                    <SectionButtonGroup />
                    <Container>
                        {this._renderCreateComponent()}
                    </Container>
                </Container>
            </div>
        );
    }
}

export default ClinicalCreate;