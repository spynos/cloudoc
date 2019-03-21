import React, { Component } from 'react';
import styles from './PatientInfo.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { observer, inject } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('patientInfoStore')
@observer
class PatientInfo extends Component {
    async componentDidMount() {
        await this.props.patientInfoStore.initialize(this.props.patientInfo);
    }

    componentWillUnmount() {
        this.props.patientInfoStore.clear();
    }

    _handleChange = (e) => {
        const type = e.target.name;
        const { value } = e.target;
        this.props.patientInfoStore.changeEditableData(type, value);
    }

    _handleClick = () => {
        this.props.patientInfoStore.deleteAllInputValue();
    }

    render() {
        const { open, isEditing } = this.props;
        const { editableData } = this.props.patientInfoStore;
        return (
            <div id='PatientInfo-Case' className={cx('PatientInfo')}>
                <Collapsible transitionTime={150} open={open} trigger="환자정보">
                {
                    isEditing
                    ? <Container fluid className={cx('content-container')}>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('chart-id')}>
                                <div className={cx('label')}>차트번호</div>
                                <div className={cx('input-container')}>
                                    <input 
                                        className={cx('input-chart-id')} 
                                        type="text" 
                                        name="chart_id"
                                        value={editableData.chart_id}
                                        onChange={this._handleChange}
                                        placeholder='123'
                                    />
                                </div>
                            </Col>
                        </Row>
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
                                        value={editableData.age}
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
                                        value={editableData.pastHistory}
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
                                        value={editableData.familyHistory}
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
                                        value={editableData.socialHistory}
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
                                        value={editableData.memo}
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
                : <Container fluid className={cx('content-container')}>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('chart-id')}>
                                <div className={cx('label')}>차트번호</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    <div>{editableData.chart_id}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('gender')}>
                                <div className={cx('label')}>성별</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    {
                                        editableData.gender === '남자'
                                        ? <div>남자</div>
                                        : <div>여자</div>
                                    }
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('age')}>
                                <div className={cx('label')}>나이</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    <span>만&nbsp;</span>
                                    <div>{editableData.age}</div>
                                    <span>세</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col md={6} sm={12} className={cx('pastHistory')}>
                                <div className={cx('label')}>과거력</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    <div>{editableData.pastHistory}</div>
                                </div>
                            </Col>
                            <Col md={6} sm={12} className={cx('familyHistory')}>
                                <div className={cx('label')}>가족력</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    <div>{editableData.familyHistory}</div>
                                </div>
                            </Col>
                            <Col md={6} sm={12} className={cx('socialHistory')}>
                                <div className={cx('label')}>사회력</div>
                                <div className={cx('input-container', 'readOnly')}>
                                    <div>{editableData.socialHistory}</div>
                                </div>
                            </Col>
                        </Row>
                        <Row className={cx('content-container-row')}>
                            <Col className={cx('memo')}>
                                <div className={cx('label')}>메모</div>
                                <div className={cx('input-container', 'readOnly', 'memo')}>
                                    <div>{editableData.memo}</div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                }
                </Collapsible>
            </div>
        );
    }
}

export default PatientInfo;