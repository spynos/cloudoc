import React, { Component } from 'react';
import styles from './PatientInfo.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';

const cx = classNames.bind(styles);

@inject('patientInfoStore')
@observer
class PatientInfo extends Component {

    componentWillUnmount() {
        this.props.patientInfoStore.clear();
    }

    @action _handleChange = (e) => {
        const type = e.target.name;
        this.props.patientInfoStore.editableData[type] = e.target.value;
    }

    _handleClick = () => {
        this.props.patientInfoStore.deleteAllInputValue();
    }

    render() {
        const { open } = this.props;
        const { editableData } = this.props.patientInfoStore;
        return (
            <div id='PatientInfo-Create' className={cx('PatientInfo')}>
                <Collapsible transitionTime={150} open={open} trigger="환자정보">
                    <Container fluid className={cx('content-container')}>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('gender')}>
                                <div className={cx('label')}>성별</div>
                                <div className={cx('input-container')}>
                                    <div className={cx('radio')}>
                                        <label>
                                            <input 
                                                name='gender'
                                                type="radio" 
                                                value="남자" 
                                                checked={editableData.gender === "남자"}
                                                onChange={this._handleChange} />
                                            <span>남</span>
                                        </label>
                                    </div>
                                    <div className={cx('radio')}>
                                        <label>
                                            <input 
                                                name='gender'
                                                type="radio" 
                                                value="여자" 
                                                checked={editableData.gender === "여자"}
                                                onChange={this._handleChange} />
                                            <span>여</span>
                                        </label>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('age')}>
                                <div className={cx('label')}>나이</div>
                                <div className={cx('input-container')}>
                                    <span>만</span>
                                    <input 
                                        className={cx('input-age')} 
                                        type="text" 
                                        name="age"
                                        value={editableData.age || ''}
                                        onChange={this._handleChange}
                                        placeholder='25'
                                    />
                                    <span>세</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('pastHistory')}>
                                <div className={cx('label')}>과거력</div>
                                <div className={cx('input-container')}>
                                    <textarea 
                                        name='pastHistory'
                                        rows='2' 
                                        value={editableData.pastHistory || ''}
                                        onChange={this._handleChange}
                                        placeholder='환자의 과거이력...'/>
                                </div>
                            </Col>
                            <Col className={cx('familyHistory')}>
                                <div className={cx('label')}>가족력</div>
                                <div className={cx('input-container')}>
                                    <textarea 
                                        name='familyHistory'
                                        rows='2' 
                                        value={editableData.familyHistory || ''}
                                        onChange={this._handleChange}
                                        placeholder='환자의 가족력...'/>
                                </div>
                            </Col>
                            <Col className={cx('socialHistory')}>
                                <div className={cx('label')}>사회력</div>
                                <div className={cx('input-container')}>
                                    <textarea 
                                        rows='2' 
                                        name='socialHistory'
                                        value={editableData.socialHistory || ''}
                                        onChange={this._handleChange}
                                        placeholder='환자의 사회이력...'/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('memo')}>
                                <div className={cx('label')}>메모</div>
                                <div className={cx('input-container', 'memo')}>
                                    <textarea 
                                        name='memo'
                                        value={editableData.memo || ''}
                                        onChange={this._handleChange}
                                        rows='4' 
                                        placeholder='기타 비고란...'/>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row', 'delete-save-button')}>
                            <Button variant="secondary" onClick={this._handleClick}>기록삭제</Button>
                        </Row>
                    </Container>
                </Collapsible>
            </div>
        );
    }
}

export default PatientInfo;