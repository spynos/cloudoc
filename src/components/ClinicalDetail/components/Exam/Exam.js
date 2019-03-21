import React, { Component } from 'react';
import styles from './Exam.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import VisualizedDataBar from '../../../VisualizedDataBar/VisualizedDataBar';
import category from '../../../../constant/examCategory';
import { inject, observer } from 'mobx-react';
import TitleForClinicaldb from '../../../common/TitleForClinicaldb/TitleForClinicaldb';

const cx = classNames.bind(styles);

@withRouter
@inject('examDetailStore')
@observer
class Exam extends Component {
    async componentDidMount() {
        const examId = this.props.id;
        await this.props.examDetailStore.loadExam(examId);
    }
    componentWillUnmount() {
        this.props.examDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.examDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        const examId = this.props.id;
        this.props.examDetailStore.updateExam(examId);
    }

    _handleDelete = () => {
        const examId = this.props.id;
        this.props.examDetailStore.deleteExam(examId);
        this.props.history.push('/clinicaldb');
    }

    _toggleEditing = () => {
        const { isEditing } = this.props.examDetailStore;
        if (!isEditing) {
            this.props.examDetailStore.setEditableData(this.props.examDetailStore.currentExam);
        }
        
        if (isEditing) { return this.props.examDetailStore.notEditing(); }
        if (!isEditing) { return this.props.examDetailStore.onEditing(); }
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
        } = this.props.examDetailStore;
        const {
            editName,
            editDescription,
            editCategory,
            editUnit,
            editSex,
            editRefMin,
            editRefMax,
            editOptMin,
            editOptMax
        } = this.props.examDetailStore.editableData;
        const {
            name,
            description,
            category,
            unit,
            sex,
            refMin,
            refMax,
            optMin,
            optMax
        } = this.props.examDetailStore.currentExam;

        if (isLoading) {
            return (
                <div className={cx('Exam', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }
        
        return (
            <div className={cx('Exam')}>
                <TitleForClinicaldb title={'진찰'} />
                <Container className={cx('exam-container')}>
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
                                    placeholder='혈검항목명...'/>
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
                            <div className={cx('label')}>단위</div>
                            {
                                !isEditing
                                ? <div>{unit}</div>
                                : <div className={cx('input-container')}>
                                    <input 
                                        className={cx('input-part')} 
                                        name='editUnit'
                                        type="text" 
                                        value={editUnit}
                                        onChange={this._handleChange}
                                        placeholder='단위...'/>
                                </div>
                            }
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>성별</div>
                            {
                                !isEditing
                                ? <div>{sex}</div>
                                : <div className={cx('input-container')}>
                                    <div className={cx('selector')}>
                                        <select
                                            name='editSex'
                                            className={cx('category')}
                                            value={editSex || ""}
                                            onChange={this._handleChange}
                                        >
                                            <option value="">- 선택 -</option>
                                            <option value='남녀공통'>남녀공통</option>
                                            <option value='남자'>남자</option>
                                            <option value='여자'>여자</option>
                                        </select>
                                    </div>
                                </div>
                            }
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>참고값</div>
                            {
                                !isEditing
                                ? <div 
                                    className={cx('input-container', 'VisualizedDataBar')}>
                                    <VisualizedDataBar 
                                        label={[refMin, optMin, optMax, refMax]}
                                        sectionLabel={['낮음', '최적', '높음']}
                                    />
                                </div>
                                : <div className={cx('input-container')}>
                                    <input 
                                        className={cx('input-ref')} 
                                        name='editRefMin'
                                        type="text" 
                                        value={editRefMin}
                                        onChange={this._handleChange}
                                        placeholder='단위...'/>
                                    <input 
                                        className={cx('input-ref')} 
                                        name='editOptMin'
                                        type="text" 
                                        value={editOptMin}
                                        onChange={this._handleChange}
                                        placeholder='단위...'/>
                                    <input 
                                        className={cx('input-ref')} 
                                        name='editOptMax'
                                        type="text" 
                                        value={editOptMax}
                                        onChange={this._handleChange}
                                        placeholder='단위...'/>    
                                    <input 
                                        className={cx('input-ref')} 
                                        name='editRefMax'
                                        type="text" 
                                        value={editRefMax}
                                        onChange={this._handleChange}
                                        placeholder='단위...'/>
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
                                        placeholder='해당 검사에 대한 상세설명...'
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

export default Exam;