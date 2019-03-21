import React, { Component } from 'react';
import styles from './BloodTest.module.scss';
import classNames from 'classnames/bind';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faTrash, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import VisualizedDataBar from '../../../VisualizedDataBar/VisualizedDataBar';
import category from '../../../../constant/bloodTestCategory';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import TitleForClinicaldb from '../../../common/TitleForClinicaldb/TitleForClinicaldb';

const cx = classNames.bind(styles);

@withRouter
@inject('bloodTestDetailStore')
@observer
class BloodTest extends Component {
    async componentDidMount() {
        const labId = this.props.id;
        await this.props.bloodTestDetailStore.loadLab(labId);
    }
    componentWillUnmount() {
        this.props.bloodTestDetailStore.clear();
    }

    _handleChange = (e) => {
        const { name, value } = e.target;
        this.props.bloodTestDetailStore.changeEditableData(name, value);
    }
    
    _handleSave = () => {
        const labId = this.props.id;
        this.props.bloodTestDetailStore.updateLab(labId);
    }

    _handleDelete = () => {
        const labId = this.props.id;
        this.props.bloodTestDetailStore.deleteLab(labId);
        this.props.history.push('/clinicaldb');
        
    }

    _toggleEditing = () => {
        const { isEditing } = this.props.bloodTestDetailStore;
        if (!isEditing) {
            this.props.bloodTestDetailStore.setEditableData(this.props.bloodTestDetailStore.currentLab);
        }
        
        if (isEditing) { return this.props.bloodTestDetailStore.notEditing(); }
        if (!isEditing) { return this.props.bloodTestDetailStore.onEditing(); }
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
        } = this.props.bloodTestDetailStore;
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
        } = this.props.bloodTestDetailStore.editableData;
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
        } = this.props.bloodTestDetailStore.currentLab;

        if (isLoading) {
            return (
                <div className={cx('BloodTest', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }
        
        return (
            <div className={cx('BloodTest')}>
                <TitleForClinicaldb title={'혈액검사'} />
                <Container className={cx('blood-test-container')}>
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

export default BloodTest;