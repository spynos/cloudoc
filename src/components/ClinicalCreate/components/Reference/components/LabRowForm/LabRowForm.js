import React, { Component } from 'react';
import styles from './LabRowForm.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('referenceDetailStore')
@observer
class LabRowForm extends Component {
    _addLab = () => {
        this.props.referenceDetailStore.addLab();
    }

    _handleChange = (e) => {
        const {
            dataset,
            name,
            value
        } = e.target;
        this.props.referenceDetailStore.handleChangeForLab(dataset.index, name, value);
    }

    _deleteLab = (e) => {
        if (e.target.dataset.index !== undefined) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.referenceDetailStore.deleteLab(selectedIndex);
        }
    }
    
    render() {
        const {
            isEditing
        } = this.props;
        const {
            editableDataForLab
        } = this.props.referenceDetailStore;
        const {
            links
        } = this.props.referenceDetailStore.currentReference;

        if (!isEditing) {
            return (
                <div className={cx('LabRowForm')}>
                    <div className={cx('container-label')}>혈액검사-질병</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>혈액검사항목</div></th>
                                <th><div className={cx('label')}>상태</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>검사항목-질환 관련성</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                links.lab.map((lab, i) => {
                                    const {
                                        labName,
                                        state,
                                        conditionName,
                                        description
                                    } = lab;
                                    return (
                                        <tr key={i}>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content', 'empty-td')}></div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {labName}
                                                </div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {state}
                                                </div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {conditionName}
                                                </div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {description}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }

        if (isEditing) {
            return (
                <div className={cx('LabRowForm')}>
                    <div className={cx('container-label')}>혈액검사-질병</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>혈액검사항목</div></th>
                                <th><div className={cx('label')}>상태</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>검사항목-질환 관련성</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                editableDataForLab.map((lab, i) => {
                                    const {
                                        labName,
                                        state,
                                        conditionName,
                                        description
                                    } = lab;
                                    return (
                                        <tr key={i}>
                                            <td
                                                onClick={this._deleteLab}
                                            >
                                                <div 
                                                    data-index={i}
                                                    className={cx('content', 'delete-row-button')} 
                                                >
                                                    <FontAwesomeIcon 
                                                        className={cx('icon', 'minus')} 
                                                        icon={faMinusSquare}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('content', 'lab-name')}>
                                                    <input 
                                                        name='labName'
                                                        data-index={i}
                                                        value={labName || ''}
                                                        onChange={this._handleChange}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('content', 'state')}>
                                                    <input 
                                                        name='state'
                                                        data-index={i}
                                                        value={state || ''}
                                                        onChange={this._handleChange}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('content', 'condition-name')}>
                                                    <input 
                                                        name='conditionName'
                                                        data-index={i}
                                                        value={conditionName || ''}
                                                        onChange={this._handleChange}
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className={cx('content', 'description')}>
                                                    <input 
                                                        name='description'
                                                        data-index={i}
                                                        value={description || ''}
                                                        onChange={this._handleChange}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className={cx('addup-button-wrapper')}>
                        <Button 
                            className={cx('addup-button')}
                            onClick={this._addLab}
                        >
                            추가 <FontAwesomeIcon className={cx('icon', 'minus')} icon={faPlus} />
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default LabRowForm;