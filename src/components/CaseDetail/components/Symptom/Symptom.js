import React, { Component } from 'react';
import styles from './Symptom.module.scss';
import classNames from 'classnames/bind';
import { Container, Row, Button } from 'react-bootstrap';
import Collapsible from 'react-collapsible';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { observer, inject } from 'mobx-react';
import SymptomRowForm from './components/SymptomRowForm';

const cx = classNames.bind(styles);

@inject('symptomStore')
@observer
class Symptom extends Component {
    async componentDidMount() {
        if (this.props.symptom !== undefined) {
            await this.props.symptomStore.setEditableData(this.props.symptom);
        }
    }

    componentWillUnmount() {
        this.props.symptomStore.clear();
    }

    _addSymptom = () => {
        this.props.symptomStore.addSymptom();
    }

    handleDeleteSymptom = (selectedIndex) => {
        this.props.symptomStore.deleteSymptom(selectedIndex);
    }

    _handleClick = () => {
        this.props.symptomStore.deleteAllInputValue();
    }

    render() {
        const { open, isEditing } = this.props;
        return (
            <div id='Symptom-Case' className={cx('Symptom')}>
                <Collapsible transitionTime={150} open={open} trigger="증상">
                    <Container fluid>
                        <Row className={cx('table-container', {readOnly: !isEditing})}>
                            <table className={cx('input-form-table')}>
                                <thead className={cx('table-header')}>
                                    <tr>
                                        { isEditing && <th><div className={cx('label')}>&nbsp;</div></th> }
                                        <th><div className={cx('label')}>중요도</div></th>
                                        <th><div className={cx('label')}>구분</div></th>
                                        <th><div className={cx('label')}>증상명</div></th>
                                        <th><div className={cx('label')}>발생시기</div></th>
                                        <th><div className={cx('label')}>불편한정도</div></th>
                                        <th><div className={cx('label')}>단위</div></th>
                                        <th><div className={cx('label')}>세부사항</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <SymptomRowForm 
                                        isEditing={isEditing}
                                        symptoms={this.props.symptomStore.editableData} 
                                        handleDeleteSymptom={this.handleDeleteSymptom} 
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
                                        onClick={this._addSymptom}
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

export default Symptom;