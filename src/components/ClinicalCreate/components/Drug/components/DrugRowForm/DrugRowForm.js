import React, { Component } from 'react';
import styles from './DrugRowForm.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('drugDetailStore')
@observer
class DrugRowForm extends Component {
    _handleChange = (e) => {
        const {
            dataset,
            name,
            value
        } = e.target;
        this.props.drugDetailStore.handleChangeForHerb(dataset.index, name, value);
    }

    _deleteHerb = (e) => {
        if (
            this.props.drugDetailStore.editableDataForHerb.length > 1
            && e.target.dataset.index !== undefined
        ) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.handleDeleteHerb(selectedIndex);
        }
    }

    render() {
        const { isEditing, herbsForReading, herbsForEditing } = this.props;

        if (!isEditing) {
            return (
                herbsForReading.map((herb, i) => {
                    const {
                        herbName,
                        dose
                    } = herb;
                    return (
                        <tr className={cx('DrugRowForm', 'table-row')} key={i}>
                            <td>
                                <div className={cx('content', 'medicinal-name')}>
                                    {herbName}
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'dose')}>
                                    {dose}
                                </div>
                            </td>
                        </tr>
                    )
                })
            )
        }
        if (isEditing) {
            return (
                herbsForEditing.map((herb, i) => {
                    const {
                        herbName,
                        dose
                    } = herb;
                    return (
                        <tr className={cx('DrugRowForm', 'table-row')} key={i}>
                            <td
                                onClick={this._deleteHerb}
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
                                <div className={cx('content', 'medicinal-name')}>
                                    <input 
                                        name='herbName'
                                        data-index={i}
                                        value={herbName || ''}
                                        onChange={this._handleChange}
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'dose')}>
                                    <input 
                                        name='dose'
                                        data-index={i}
                                        value={dose || ''}
                                        onChange={this._handleChange}
                                    />
                                </div>
                            </td>
                        </tr>
                    )
                })
            )
        }
    }
}

export default DrugRowForm;