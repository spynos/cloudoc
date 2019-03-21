import React, { Component } from 'react';
import styles from './Condition.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import category from '../../../../constant/conditionCategory';
import severityCategory from '../../../../constant/conditionSeverityCategory';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

@withRouter
@inject('conditionDetailStore')
@observer
class Condition extends Component {
    componentWillUnmount() {
        this.props.conditionDetailStore.clear();
    }

    _handleChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        this.props.conditionDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        this.props.conditionDetailStore.createCondition();
        this.props.history.push(`/clinicaldb`);
    }

    _renderCategoryOption = () => {
        return category.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    _renderSeverityCategoryOption = () => {
        return severityCategory.map((severity, i) => {
            return (
                <option key={i} value={severity}>{severity}</option>
            )
        })
    }

    render() {
        const { 
            isLoading
        } = this.props.conditionDetailStore;
        const {
            editName,
            editDescription,
            editCategory,
            editSeverity
        } = this.props.conditionDetailStore.editableData;
        
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
                <Container className={cx('condition-container')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>
                            <div className={cx('input-container')}>
                                <input 
                                    className={cx('input-part')} 
                                    name='editName'
                                    type="text" 
                                    value={editName}
                                    onChange={this._handleChange}
                                    placeholder='증상명...'/>
                            </div>
                        </div>
                        <div className={cx('edit-save-delete-button')}>
                            <div 
                                className={cx('button', 'cancel-button')}
                                onClick={() => {this.props.history.push('/clinicaldb')}}
                                >
                                <FontAwesomeIcon className={cx('icon', 'cancel')} icon={faUndoAlt} />
                                <div className={cx('label')}>취소</div>
                            </div>
                            <div 
                                className={cx('button', 'save-button')}
                                onClick={this._handleSave}
                            >
                                <FontAwesomeIcon className={cx('icon', 'save')} icon={faSave} />
                                <div className={cx('label')}>저장</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('top-content')}>
                        <div className={cx('content-wrapper')}>
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
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>심각도</div>
                            <div className={cx('input-container')}>
                                <div className={cx('selector')}>
                                    <select
                                        name='editSeverity'
                                        className={cx('category')}
                                        value={editSeverity || ""}
                                        onChange={this._handleChange}
                                    >
                                        <option value="">- 선택 -</option>
                                        {this._renderSeverityCategoryOption()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>상세설명</div>
                            <div className={cx('input-container')}>
                                <textarea 
                                    name='editDescription'
                                    rows='6' 
                                    placeholder='해당 진단에 대한 상세설명...'
                                    value={editDescription}
                                    onChange={this._handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default Condition;