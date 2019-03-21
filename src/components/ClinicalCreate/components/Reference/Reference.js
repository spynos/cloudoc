import React, { Component } from 'react';
import styles from './Reference.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';
import category from '../../../../constant/referenceCategory';
import method from '../../../../constant/referenceMethod';
import SymptomRowForm from './components/SymptomRowForm/SymptomRowForm';
import LabRowForm from './components/LabRowForm';
import DrugRowForm from './components/DrugRowForm';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

@withRouter
@inject('referenceDetailStore')
@observer
class Reference extends Component {
    componentWillUnmount() {
        this.props.referenceDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.referenceDetailStore.changeEditableData(name, value);
    }

    _handleSave = () => {
        this.props.referenceDetailStore.createReference();
        this.props.history.push(`/clinicaldb`);
    }

    _renderCategoryOption = () => {
        return category.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    _renderMethodOption = () => {
        return method.map((method, i) => {
            return (
                <option key={i} value={method}>{method}</option>
            )
        })
    }

    render() {
        const { 
            isLoading
        } = this.props.referenceDetailStore;
        const {
            editName,
            editDescription,
            editCategory,
            editMethod,
            editDoi,
            editYear,
            editPublisher,
            editUrl,
            editMemo,
            editMethodDetail
        } = this.props.referenceDetailStore.editableData;

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
            <div className={cx('Reference')}>
                <Container className={cx('reference-container')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>
                            <div className={cx('input-container')}>
                                <input 
                                    className={cx('input-part')} 
                                    name='editName'
                                    type="text" 
                                    value={editName}
                                    onChange={this._handleChange}
                                    placeholder='문헌명...'/>
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
                        <div className={cx('left-right-wrapper')}>
                            <div className={cx('left')}>
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
                                    <div className={cx('label')}>연구방법</div>
                                    <div className={cx('input-container')}>
                                        <div className={cx('selector')}>
                                            <select
                                                name='editMethod'
                                                className={cx('method')}
                                                value={editMethod || ""}
                                                onChange={this._handleChange}
                                            >
                                                <option value="">- 선택 -</option>
                                                {this._renderMethodOption()}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>DOI</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-doi')} 
                                            name='editDoi'
                                            type="text"
                                            value={editDoi}
                                            onChange={this._handleChange}
                                            placeholder='DOI...'/>
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>출판연도</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-year')} 
                                            name='editYear'
                                            type="text"
                                            value={editYear}
                                            onChange={this._handleChange}
                                            placeholder='Year...'/>
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>출판사<br/>(저널명)</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-publisher')} 
                                            name='editPublisher'
                                            type="text"
                                            value={editPublisher}
                                            onChange={this._handleChange}
                                            placeholder='publisher...'/>
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>원문링크</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-url')} 
                                            name='editUrl'
                                            type="text"
                                            value={editUrl}
                                            onChange={this._handleChange}
                                            placeholder='url...'/>
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>참고사항</div>
                                    <div className={cx('input-container')}>
                                        <input 
                                            className={cx('input-memo')} 
                                            name='editMemo'
                                            type="text"
                                            value={editMemo}
                                            onChange={this._handleChange}
                                            placeholder='memo...'/>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('right')}>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>주요내용</div>
                                    <div className={cx('input-container')}>
                                        <textarea 
                                            name='editDescription'
                                            rows='6' 
                                            placeholder='해당 증상에 대한 상세설명...'
                                            value={editDescription}
                                            onChange={this._handleChange}
                                        />
                                    </div>
                                </div>
                                <div className={cx('content-wrapper')}>
                                    <div className={cx('label')}>생활습관<br/>실험방법</div>
                                    <div className={cx('input-container')}>
                                        <textarea 
                                            name='editMethodDetail'
                                            rows='6' 
                                            placeholder='해당 증상에 대한 상세설명...'
                                            value={editMethodDetail}
                                            onChange={this._handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SymptomRowForm isLoading={false} isEditing={true} />
                    <LabRowForm isLoading={false} isEditing={true} />
                    <DrugRowForm isLoading={false} isEditing={true} />
                </Container>
            </div>
        );
    }
}

export default Reference;