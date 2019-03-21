import React, { Component, Fragment } from 'react';
import styles from './Drug.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Container, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSave, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import DrugRowForm from './components/DrugRowForm';
import category from '../../../../constant/drugCategory';
import TitleForClinicaldb from '../../../common/TitleForClinicaldb/TitleForClinicaldb';

const cx = classNames.bind(styles);

@withRouter
@inject('drugDetailStore')
@observer
class Drug extends Component {
    async componentDidMount() {
        const drugId = this.props.id;
        await this.props.drugDetailStore.loadDrug(drugId);
    }

    componentWillUnmount() {
        this.props.drugDetailStore.clear();
    }

    _addHerb = () => {
        this.props.drugDetailStore.addHerb();
    }

    handleDeleteHerb = (selectedIndex) => {
        this.props.drugDetailStore.deleteHerb(selectedIndex);
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.drugDetailStore.changeEditableData(name, value);
    }

    _handleSave = () => {
        const drugId = this.props.id;
        this.props.drugDetailStore.updateDrug(drugId);
    }

    _handleDelete = () => {
        const drugId = this.props.id;
        this.props.drugDetailStore.deleteDrug(drugId);
        this.props.history.push('/clinicaldb');
    }

    _deleteAllInputValue = () => {
        this.props.drugDetailStore.deleteAllInputValue();
    }

    _toggleEditing = () => {
        const { isEditing } = this.props.drugDetailStore;
        if (!isEditing) {
            this.props.drugDetailStore.setEditableData(this.props.drugDetailStore.currentDrug);
            this.props.drugDetailStore.setEditableDataForHerb(this.props.drugDetailStore.currentDrug.formula);
        }
        if (isEditing) {
            this.props.drugDetailStore.clearEditableDataForHerb();
        }
        
        if (isEditing) { return this.props.drugDetailStore.notEditing(); }
        if (!isEditing) { return this.props.drugDetailStore.onEditing(); }
    }

    _renderCategoryOption = () => {
        return category.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    render() {
        const { 
            isLoading, 
            isEditing 
        } = this.props.drugDetailStore;
        const {
            editName,
            editDescription,
            editCategory,
            editReference,
            editCaution,
            editGuide,
            editLifestyle
        } = this.props.drugDetailStore.editableData;
        const {
            name,
            description,
            category,
            reference,
            caution,
            guide,
            lifestyle
        } = this.props.drugDetailStore.currentDrug;
        const { formula } = this.props.drugDetailStore.currentDrug;

        if (isLoading) {
            return (
                <div className={cx('Drug', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={cx('Drug')}>
                <TitleForClinicaldb title={'처방'} />
                <Container fluid>
                    <Row>
                        <div className={cx('header')}>
                            <div className={cx('title')}>
                                {
                                    !isEditing
                                    ? <div>{name}</div>
                                    : <div className={cx('input-container', 'readOnly')}>
                                        <input 
                                            className={cx('input-name')} 
                                            name='editName'
                                            type="text" 
                                            value={editName}
                                            onChange={this._handleChange}
                                            placeholder='처방명...'/>
                                    </div>
                                }
                            </div>
                            <div className={cx('edit-save-delete-button')}>
                            { 
                                !isEditing
                                && <div 
                                    className={cx('button', 'edit-button')} 
                                    onClick={this._toggleEditing}
                                >
                                    <FontAwesomeIcon className={cx('icon', 'edit')} icon={faEdit} />
                                    <div className={cx('label')}>편집</div>
                                </div>
                            }
                            {
                                isEditing
                                && <div 
                                    className={cx('button', 'cancel-button')}
                                    onClick={this._toggleEditing}
                                    >
                                    <FontAwesomeIcon className={cx('icon', 'cancel')} icon={faUndoAlt} />
                                    <div className={cx('label')}>취소</div>
                                </div>
                            }
                            {
                                isEditing
                                && <div 
                                    className={cx('button', 'save-button')}
                                    onClick={this._handleSave}
                                >
                                    <FontAwesomeIcon className={cx('icon', 'save')} icon={faSave} />
                                    <div className={cx('label')}>저장</div>
                                </div>
                            }
                            {
                                !isEditing
                                && <div 
                                    className={cx('button', 'delete-button')}
                                    onClick={this._handleDelete}
                                    >
                                    <FontAwesomeIcon className={cx('icon', 'trash')} icon={faTrash} />
                                    <div className={cx('label')}>삭제</div>
                                </div>
                            }
                            </div>
                        </div>  
                    </Row>
                    <Row className={cx('drug-container')}>
                        <div className={cx('left')}>
                            {
                                isEditing
                                ? <div className={cx('prescription-category')}>
                                    <div className={cx('label')}>분류</div>
                                    <div className={cx('input-container')}>
                                        <div className={cx('selector')}>
                                            <select
                                                name='editCategory'
                                                className={cx('category')}
                                                value={editCategory || ""}
                                                onChange={this._handleChange}
                                            >
                                                <option value="">- 선택 -</option>
                                                {this._renderCategoryOption()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                : <div className={cx('prescription-category')}>
                                    <div className={cx('label')}>분류</div>
                                    <div className={cx('input-container', 'readOnly')}>
                                        {category}
                                    </div>
                                </div>
                            }
                            {
                                isEditing
                                ? <div className={cx('prescription-name')}>
                                    <div className={cx('label')}>출전</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-prescription-name')} 
                                            type="text" 
                                            name="editReference"
                                            value={editReference || ''}
                                            onChange={this._handleChange}
                                        />
                                    </div>
                                </div>
                                : <div className={cx('prescription-name')}>
                                    <div className={cx('label')}>출전</div>
                                    <div className={cx('input-container', 'readOnly')}>
                                        {reference}
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
                                            <DrugRowForm 
                                                isEditing={isEditing}
                                                herbsForReading={formula || []} 
                                                herbsForEditing={this.props.drugDetailStore.editableDataForHerb || []} 
                                                handleDeleteHerb={this.handleDeleteHerb} 
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
                                                name="editGuide"
                                                value={editGuide || ''}
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
                                                name='editCaution'
                                                value={editCaution || ''}
                                                onChange={this._handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className={cx('improvement-method')}>
                                        <div className={cx('label')}>처방설명</div>
                                        <div className={cx('input-container')}>
                                            <textarea 
                                                rows='2' 
                                                placeholder='처방설명...'
                                                name='editDescription'
                                                value={editDescription || ''}
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
                                                name='editLifestyle'
                                                value={editLifestyle || ''}
                                                onChange={this._handleChange}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                                : <Fragment>
                                    <div className={cx('medication-method')}>
                                        <div className={cx('label')}>복약법</div>
                                        <div className={cx('input-container', 'readOnly')}>
                                            {guide}
                                        </div>
                                    </div>
                                    <div className={cx('caution')}>
                                        <div className={cx('label')}>주의사항</div>
                                        <div className={cx('input-container', 'readOnly')}>
                                            {caution}
                                        </div>
                                    </div>
                                    <div className={cx('description')}>
                                        <div className={cx('label')}>처방설명</div>
                                        <div className={cx('input-container', 'readOnly')}>
                                            {description}
                                        </div>
                                    </div>
                                    <div className={cx('improvement-method')}>
                                        <div className={cx('label')}>생활습관<br/>개선법</div>
                                        <div className={cx('input-container', 'readOnly')}>
                                            {lifestyle}
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
                                    onClick={this._addHerb}
                                >
                                    추가 <FontAwesomeIcon className={cx('icon', 'minus')} icon={faPlus} />
                                </Button>
                            </div>
                            <div className={cx('right')}>
                                <Button variant="secondary" onClick={this._deleteAllInputValue}>기록삭제</Button>
                            </div>
                        </Row>
                    }
                    
                </Container>
            </div>
        );
    }
}

export default Drug;