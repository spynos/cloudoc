import React, { Component } from 'react';
import styles from './Condition.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import category from '../../../../constant/conditionCategory';
import severityCategory from '../../../../constant/conditionSeverityCategory';
import TitleForClinicaldb from '../../../common/TitleForClinicaldb/TitleForClinicaldb';

const cx = classNames.bind(styles);

@withRouter
@inject('conditionDetailStore')
@observer
class Condition extends Component {
    async componentDidMount() {
        const conditionId = this.props.id;
        await this.props.conditionDetailStore.loadCondition(conditionId);
    }
    componentWillUnmount() {
        this.props.conditionDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.conditionDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        const conditionId = this.props.id;
        this.props.conditionDetailStore.updateCondition(conditionId);
    }

    _handleDelete = () => {
        const conditionId = this.props.id;
        this.props.conditionDetailStore.deleteCondition(conditionId);
        this.props.history.push('/clinicaldb');
    }

    _toggleEditing = () => {
        const { isEditing } = this.props.conditionDetailStore;
        if (!isEditing) {
            this.props.conditionDetailStore.setEditableData(this.props.conditionDetailStore.currentCondition);
        }
        
        if (isEditing) { return this.props.conditionDetailStore.notEditing(); }
        if (!isEditing) { return this.props.conditionDetailStore.onEditing(); }
    }

    _renderCategoryOption = () => {
        return category.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    _renderSeverityCategoryOption = () => {
        return severityCategory.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    render() {
        const { 
            isLoading, 
            isEditing 
        } = this.props.conditionDetailStore;
        const {
            editName,
            editDescription,
            editCategory,
            editSeverity
        } = this.props.conditionDetailStore.editableData;
        const {
            name,
            description,
            category,
            severity
        } = this.props.conditionDetailStore.currentCondition;

        if (isLoading) {
            return (
                <div className={cx('Condition', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={cx('Condition')}>
                <TitleForClinicaldb title={'진단'} />
                <Container className={cx('condition-container')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>
                            {
                                !isEditing
                                ? <div>{name}</div>
                                : <div className={cx('input-container')}>
                                    <input 
                                        className={cx('input-part')} 
                                        name='editName'
                                        type="text" 
                                        value={editName}
                                        onChange={this._handleChange}
                                        placeholder='증상명...'/>
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
                    <div className={cx('top-content')}>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>분류</div>
                            {
                                !isEditing
                                ? <div>{category}</div>
                                : <div className={cx('input-container')}>
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
                            }
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>심각도</div>
                            {
                                !isEditing
                                ? <div>{severity}</div>
                                : <div className={cx('input-container')}>
                                    <div className={cx('selector')}>
                                        <select
                                            name='editSeveriy'
                                            className={cx('category')}
                                            value={editSeverity || ""}
                                            onChange={this._handleChange}
                                        >
                                            <option value="">- 선택 -</option>
                                            {this._renderSeverityCategoryOption()}
                                        </select>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>상세설명</div>
                            {
                                !isEditing
                                ? <div>{description}</div>
                                : <div className={cx('input-container')}>
                                    <textarea 
                                        name='editDescription'
                                        rows='6' 
                                        placeholder='해당 진단에 대한 상세설명...'
                                        value={editDescription}
                                        onChange={this._handleChange}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Condition;