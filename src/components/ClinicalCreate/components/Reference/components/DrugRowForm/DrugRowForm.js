import React, { Component } from 'react';
import styles from './DrugRowForm.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('referenceDetailStore')
@observer
class DrugRowForm extends Component {
    _addDrug = () => {
        this.props.referenceDetailStore.addDrug();
    }

    _handleChange = (e) => {
        const {
            dataset,
            name,
            value
        } = e.target;
        this.props.referenceDetailStore.handleChangeForDrug(dataset.index, name, value);
    }

    _deleteDrug = (e) => {
        if (e.target.dataset.index !== undefined) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.referenceDetailStore.deleteDrug(selectedIndex);
        }
    }
    
    render() {
        const {
            isEditing
        } = this.props;
        const {
            editableDataForDrug
        } = this.props.referenceDetailStore;
        const {
            links
        } = this.props.referenceDetailStore.currentReference;

        if (!isEditing) {
            return (
                <div className={cx('DrugRowForm')}>
                    <div className={cx('container-label')}>질병-처방</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>처방명</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>치료기전</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                links.drug.map((drug, i) => {
                                    const {
                                        drugName,
                                        conditionName,
                                        description
                                    } = drug;
                                    return (
                                        <tr key={i}>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content', 'empty-td')}></div>
                                            </td>
                                            <td className={cx('readOnly')}>
                                                <div className={cx('content')}>
                                                    {drugName}
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
                <div className={cx('DrugRowForm')}>
                    <div className={cx('container-label')}>질병-처방</div>
                    <table className={cx('input-form-container')}>
                        <thead className={cx('table-header')}>
                            <tr>
                                <th><div className={cx('label')}>&nbsp;</div></th>
                                <th><div className={cx('label')}>처방명</div></th>
                                <th><div className={cx('label')}>질병명</div></th>
                                <th><div className={cx('label')}>치료기전</div></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                editableDataForDrug.map((drug, i) => {
                                    const {
                                        drugName,
                                        conditionName,
                                        description
                                    } = drug;
                                    return (
                                        <tr key={i}>
                                            <td
                                                onClick={this._deleteDrug}
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
                                                        name='drugName'
                                                        data-index={i}
                                                        value={drugName || ''}
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
                            onClick={this._addDrug}
                        >
                            추가 <FontAwesomeIcon className={cx('icon', 'minus')} icon={faPlus} />
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default DrugRowForm;