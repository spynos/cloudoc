import React, { Component } from 'react';
import styles from './ClinicalDetail.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Symptom from './components/Symptom/Symptom';
import BloodTest from './components/BloodTest/BloodTest';
import Exam from './components/Exam';
import Condition from './components/Condition';
import Drug from './components/Drug';
import Reference from './components/Reference/Reference';

const cx = classNames.bind(styles);

@withRouter
class ClinicalDetail extends Component {
    _renderComponent = (sectionName, id) => {
        switch(sectionName) {
            case 'symptom':
                return <Symptom id={id} sectionName={sectionName} />
            case 'lab':
                return <BloodTest id={id} sectionName={sectionName} />
            case 'exam':
                return <Exam id={id} sectionName={sectionName} />
            case 'condition':
                return <Condition id={id} sectionName={sectionName} />
            case 'drug':
                return <Drug id={id} sectionName={sectionName} />
            case 'reference':
                return <Reference id={id} sectionName={sectionName} />
            default:
                return <div>not found</div>
        }
    }

    render() {
        const { id, sectionName } = this.props.match.params;
        return (
            <div className={cx('ClinicalDetail')}>
                <Container>
                    {this._renderComponent(sectionName, id)}
                </Container>
            </div>
        );
    }
}

export default ClinicalDetail;