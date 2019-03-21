import React, { Component, Fragment } from 'react';
import styles from './Treatment.module.scss';
import classNames from 'classnames/bind';
import Collapsible from 'react-collapsible';
import { Container, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { observer, inject } from 'mobx-react';
import { action } from 'mobx';
import TreatmentRowForm from './components/TreatmentRowForm/TreatmentRowForm';

const cx = classNames.bind(styles);

@inject('treatmentStore')
@observer
class Treatment extends Component {
    @action async componentDidMount() {
        if (this.props.treatment !== undefined) {
            await this.props.treatmentStore.setEditableData(this.props.treatment.fomula);
        }
        
        if (this.props.treatment !== undefined) {
            this.props.treatmentStore.initilize(this.props.treatment);
        }
    }

    componentWillUnmount() {
        this.props.treatmentStore.clear();
    }

    _addTreatment = () => {
        this.props.treatmentStore.addTreatment();
    }

    handleDeleteTreatment = (selectedIndex) => {
        this.props.treatmentStore.deleteTreatment(selectedIndex);
    }

    _handleClick = () => {
        this.props.treatmentStore.deleteAllInputValue();
    }

    @action _handleChange = (e) => {
        const type = e.target.name;
        this.props.treatmentStore.editableDataForTreatment[type] = e.target.value;
    }

    render() {
        const { open, isEditing } = this.props;
        const { editableDataForTreatment } = this.props.treatmentStore;

        return (
            <div id='Drug-Case' className={cx('Treatment')}>
                <Collapsible transitionTime={150} open={open} trigger="처방">
                    <Container fluid>
                        <Row className={cx('treatment-container')}>
                            <div className={cx('left')}>
                                {
                                    isEditing
                                    ? <div className={cx('prescription-name')}>
                                        <div className={cx('label')}>처방명</div>
                                        <div className={cx('input-container')}>
                                            <input 
                                                className={cx('input-prescription-name')} 
                                                type="text" 
                                                name="drugName"
                                                value={editableDataForTreatment.drugName}
                                                onChange={this._handleChange}
                                            />
                                        </div>
                                    </div>
                                    : <div className={cx('prescription-name')}>
                                        <div className={cx('label')}>처방명</div>
                                        <div className={cx('input-container', 'readOnly')}>
                                            {editableDataForTreatment.drugName}
                                        </div>
                                    </div>
                                }
                                <div className={cx('prescription-configuration')}>
                                    <div className={cx('label')}>처방구성</div>
                                    <div className={cx('input-container', 'readOnly')}>
                                        <table className={cx('input-form-table')}>
                                            <thead className={cx('table-header')}>
                                                <tr>
                                                    { isEditing && <th><div className={cx('label')}>&nbsp;</div></th> }
                                                    <th><div className={cx('label')}>약재명</div></th>
                                                    <th><div className={cx('label')}>용량(g/첩)</div></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <TreatmentRowForm 
                                                    isEditing={isEditing}
                                                    treatments={this.props.treatmentStore.editableData} 
                                                    handleDeleteTreatment={this.handleDeleteTreatment} 
                                                />
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('right')}>
                                {
                                    isEditing
                                    ? <Fragment>
                                        <div className={cx('medication-method')}>
                                            <div className={cx('label')}>복약법</div>
                                            <div className={cx('input-container')}>
                                                <input 
                                                    className={cx('input-medication-name')} 
                                                    type="text" 
                                                    name="guide"
                                                    value={editableDataForTreatment.guide}
                                                    onChange={this._handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('caution')}>
                                            <div className={cx('label')}>주의사항</div>
                                            <div className={cx('input-container')}>
                                                <textarea 
                                                    placeholder='주의사항...'
                                                    rows='2' 
                                                    name='caution'
                                                    value={editableDataForTreatment.caution}
                                                    onChange={this._handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className={cx('improvement-method')}>
                                            <div className={cx('label')}>생활습관<br/>개선법</div>
                                            <div className={cx('input-container')}>
                                                <textarea 
                                                    rows='2' 
                                                    placeholder='생활습관개선법...'
                                                    name='lifestyle'
                                                    value={editableDataForTreatment.lifestyle}
                                                    onChange={this._handleChange}
                                                />
                                            </div>
                                        </div>
                                    </Fragment>
                                    : <Fragment>
                                        <div className={cx('medication-method')}>
                                            <div className={cx('label')}>복약법</div>
                                            <div className={cx('input-container', 'readOnly')}>
                                                {editableDataForTreatment.guide}
                                            </div>
                                        </div>
                                        <div className={cx('caution')}>
                                            <div className={cx('label')}>주의사항</div>
                                            <div className={cx('input-container', 'readOnly')}>
                                                {editableDataForTreatment.caution}
                                            </div>
                                        </div>
                                        <div className={cx('improvement-method')}>
                                            <div className={cx('label')}>생활습관<br/>개선법</div>
                                            <div className={cx('input-container', 'readOnly')}>
                                                {editableDataForTreatment.lifestyle}
                                            </div>
                                        </div>
                                    </Fragment> 
                                }
                            </div>
                        </Row>
                        {
                            isEditing
                            && <Row className={cx('add-delete-save-button')}>
                                <div className={cx('left')}>
                                    <Button 
                                        className={cx('addup-button')}
                                        onClick={this._addTreatment}
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

export default Treatment;