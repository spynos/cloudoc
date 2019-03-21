import React, { Component } from 'react';
import styles from './SymptomRowForm.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('referenceDetailStore')
@observer
class SymptomRowForm extends Component {
    _addSymptom = () => {
        this.props.referenceDetailStore.addSymptom();
    }

    _handleChange = (e) => {
        const {
            dataset,
            name,
            value
        } = e.target;
        this.props.referenceDetailStore.handleChangeForSymptom(dataset.index, name, value);
    }

    _deleteSymptom = (e) => {
        if (e.target.dataset.index !== undefined) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.referenceDetailStore.deleteSymptom(selectedIndex);
        }
    }
    
    render() {
        const {
            isEditing,
            isLoading
        } = this.props;
        const {
            editableDataForSymptom
        } = this.props.referenceDetailStore;
        const {
            links
        } = this.props.referenceDetailStore.currentReference;

        if (isLoading || links === undefined) {
            return (
                <div className={cx('SymptomRowForm', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }

        if (!isEditing) {
            return (
                <div className={cx('SymptomRowForm')}>
                    <div className={cx('container-label')}>증상-질병</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>증상명</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>증상-질환 관련성</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                links.symptom.map((symptom, i) => {
                                    const {
                                        symptomName,
                                        conditionName,
                                        description
                                    } = symptom;
                                    return (
                                        <tr key={i}>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content', 'empty-td')}></div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {symptomName}
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
                <div className={cx('SymptomRowForm')}>
                    <div className={cx('container-label')}>증상-질병</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>증상명</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>증상-질환 관련성</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                editableDataForSymptom.map((symptom, i) => {
                                    const {
                                        symptomName,
                                        conditionName,
                                        description
                                    } = symptom;
                                    return (
                                        <tr key={i}>
                                            <td
                                                onClick={this._deleteSymptom}
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
                                                <div className={cx('content', 'symptom-name')}>
                                                    <input 
                                                        name='symptomName'
                                                        data-index={i}
                                                        value={symptomName || ''}
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
                            onClick={this._addSymptom}
                        >
                            추가 <FontAwesomeIcon className={cx('icon', 'minus')} icon={faPlus} />
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default SymptomRowForm;