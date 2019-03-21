import React, { Component } from 'react';
import styles from './Examination.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { observer, inject } from 'mobx-react';
import ExaminatioinRowForm from './components/ExaminationRowForm';

const cx = classNames.bind(styles);

@inject('examinationStore')
@observer
class Examination extends Component {
    async componentDidMount() {
        if (this.props.examination !== undefined) {
            await this.props.examinationStore.setEditableData(this.props.examination);
        }
    }

    componentWillUnmount() {
        this.props.examinationStore.clear();
    }

    _addExamination = () => {
        this.props.examinationStore.addExamination();
    }

    handleDeleteExamination = (selectedIndex) => {
        this.props.examinationStore.deleteExamination(selectedIndex);
    }

    _handleClick = () => {
        this.props.examinationStore.deleteAllInputValue();
    }

    render() {
        const { open, isEditing } = this.props;
        return (
            <div id='Exam-Case' className={cx('Examination')}>
                <Collapsible transitionTime={150} open={open} trigger="진찰">
                    <Container fluid>
                        <Row className={cx('table-container', {readOnly: !isEditing})}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        { isEditing && <th><div className={cx('label')}>&nbsp;</div></th> }
                                        <th><div className={cx('label')}>중요도</div></th>
                                        <th><div className={cx('label')}>구분</div></th>
                                        <th><div className={cx('label')}>진찰항목</div></th>
                                        <th><div className={cx('label')}>소견</div></th>
                                        <th><div className={cx('label')}>결과값</div></th>
                                        <th><div className={cx('label')}>단위</div></th>
                                        <th><div className={cx('label')}>관찰내용</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ExaminatioinRowForm 
                                        isEditing={isEditing}
                                        examinations={this.props.examinationStore.editableData} 
                                        handleDeleteExamination={this.handleDeleteExamination} 
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
                                        onClick={this._addExamination}
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

export default Examination;