import React, { Component } from 'react';
import styles from './Exam.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import category from '../../../../constant/examCategory';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

@withRouter
@inject('examDetailStore')
@observer
class Exam extends Component {
    componentWillUnmount() {
        this.props.examDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.examDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        this.props.examDetailStore.createExam();
        this.props.history.push(`/clinicaldb`);
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
            isLoading
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
                <Container className={cx('exam-container')}>
                    <div className={cx('header')}>
                        <div className={cx('title')}>
                        <div className={cx('input-container')}>
                            <input 
                                className={cx('input-part')} 
                                name='editName'
                                type="text" 
                                value={editName}
                                onChange={this._handleChange}
                                placeholder='진찰명...'/>
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
                            <div className={cx('label')}>단위</div>
                            <div className={cx('input-container')}>
                                <input 
                                    className={cx('input-part')} 
                                    name='editUnit'
                                    type="text" 
                                    value={editUnit}
                                    onChange={this._handleChange}
                                    placeholder='단위...'/>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>성별</div>
                            <div className={cx('input-container')}>
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
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>참고값</div>
                            <div className={cx('input-container')}>
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
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div className={cx('label')}>상세설명</div>
                            <div className={cx('input-container')}>
                                <textarea 
                                    name='editDescription'
                                    rows='6' 
                                    placeholder='해당 검사에 대한 상세설명...'
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

export default Exam;