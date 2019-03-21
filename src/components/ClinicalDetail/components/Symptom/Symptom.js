import React, { Component } from 'react';
import styles from './Symptom.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import category from '../../../../constant/symptomCategory';
import TitleForClinicaldb from '../../../common/TitleForClinicaldb/TitleForClinicaldb';

const cx = classNames.bind(styles);

@withRouter
@inject('symptomDetailStore')
@observer
class Symptom extends Component {
    async componentDidMount() {
        const symptomId = this.props.id;
        await this.props.symptomDetailStore.loadSymptom(symptomId);
    }
    componentWillUnmount() {
        this.props.symptomDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.symptomDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        const symptomId = this.props.id;
        this.props.symptomDetailStore.updateSymptom(symptomId);
    }

    _handleDelete = () => {
        const symptomId = this.props.id;
        this.props.symptomDetailStore.deleteSymptom(symptomId);
        this.props.history.push('/clinicaldb');
    }

    _toggleEditing = () => {
        const { isEditing } = this.props.symptomDetailStore;
        if (!isEditing) {
            this.props.symptomDetailStore.setEditableData(this.props.symptomDetailStore.currentSymptom);
        }
        
        if (isEditing) { return this.props.symptomDetailStore.notEditing(); }
        if (!isEditing) { return this.props.symptomDetailStore.onEditing(); }
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
        } = this.props.symptomDetailStore;
        const {
            editName,
            editDescription,
            editCategory
        } = this.props.symptomDetailStore.editableData;
        const {
            name,
            description,
            category,
        } = this.props.symptomDetailStore.currentSymptom;

        if (isLoading) {
            return (
                <div className={cx('Symptom', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }

        return (
            <div className={cx('Symptom')}>
                <TitleForClinicaldb title={'증상'} />
                <Container className={cx('symptom-container')}>
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
                            <div className={cx('label')}>상세설명</div>
                            {
                                !isEditing
                                ? <div>{description}</div>
                                : <div className={cx('input-container')}>
                                    <textarea 
                                        name='editDescription'
                                        rows='6' 
                                        placeholder='해당 증상에 대한 상세설명...'
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

export default Symptom;