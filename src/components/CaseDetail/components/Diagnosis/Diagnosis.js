import React, { Component } from 'react';
import styles from './Diagnosis.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { observer, inject } from 'mobx-react';
import DiagnosisRowForm from './components/DiagnosisRowForm';

const cx = classNames.bind(styles);

@inject('diagnosisStore')
@observer
class Diagnosis extends Component {
    async componentDidMount() {
        if (this.props.diagnosis !== undefined) {
            await this.props.diagnosisStore.setEditableData(this.props.diagnosis);
        }
    }

    componentWillUnmount() {
        this.props.diagnosisStore.clear();
    }

    _addDiagnosis = () => {
        this.props.diagnosisStore.addDiagnosis();
    }

    handleDeleteDiagnosis = (selectedIndex) => {
        this.props.diagnosisStore.deleteDiagnosis(selectedIndex);
    }

    _handleClick = () => {
        this.props.diagnosisStore.deleteAllInputValue();
    }

    render() {
        const { open, isEditing } = this.props;
        return (
            <div id='Diagnosis-Case' className={cx('Diagnosis')}>
                <Collapsible transitionTime={150} open={open} trigger="진단">
                    <Container fluid>
                        <Row className={cx('table-container', {readOnly: !isEditing})}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        { isEditing && <th><div className={cx('label')}>&nbsp;</div></th>}
                                        <th><div className={cx('label')}>구분</div></th>
                                        <th><div className={cx('label')}>질병명</div></th>
                                        <th><div className={cx('label')}>주치의 소견</div></th>
                                        <th><div className={cx('label')}>치료방향</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <DiagnosisRowForm 
                                        isEditing={isEditing}
                                        diagnosis={this.props.diagnosisStore.editableData} 
                                        handleDeleteDiagnosis={this.handleDeleteDiagnosis} 
                                    />
                                </tbody>
                            </table>
                        </Row>
                        {
                            isEditing
                            && <Row className={cx('add-delete-save-button')}>
                                <div className={cx('left')}>
                                    <Button 
                                        className={cx('addup-button')}
                                        onClick={this._addDiagnosis}
                                    >
                                        추가 <FontAwesomeIcon className={cx('icon', 'minus')} icon={faPlus} />
                                    </Button>
                                </div>
                                <div className={cx('right')}>
                                    <Button variant="secondary" onClick={this._handleClick}>기록삭제</Button>
                                </div>
                            </Row>
                        }
                        
                    </Container>
                </Collapsible>
            </div>
        );
    }
}

export default Diagnosis;