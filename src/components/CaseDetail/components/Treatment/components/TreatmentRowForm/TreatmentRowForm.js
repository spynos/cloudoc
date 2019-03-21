import React, { Component, Fragment } from 'react';
import styles from './TreatmentRowForm.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('treatmentStore')
@observer
class TreatmentRowForm extends Component {
    _onChangeName = (e) => {
        this.props.treatmentStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _deleteTreatment = (e) => {
        if (
            this.props.treatmentStore.editableData.length > 1
            && e.target.dataset.index !== undefined
        ) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.handleDeleteTreatment(selectedIndex);
        }
    }

    render() {
        const { isEditing } = this.props;

        return (
            this.props.treatments.map((treatment, i) => {
                return (
                    <tr className={cx('TreatmentRowForm', 'table-row')} key={i}>
                        {
                            isEditing
                            ? <Fragment>
                                <td>
                                    <div 
                                        className={cx('content', 'delete-row-button')} 
                                        data-index={i}
                                        onClick={this._deleteTreatment}
                                    >
                                        <FontAwesomeIcon 
                                            className={cx('icon', 'minus')} 
                                            icon={faMinusSquare} 
                                            data-index={i}
                                            onClick={this._deleteTreatment}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content', 'medicinal-name')}>
                                        <input 
                                            name='herbName'
                                            data-index={i}
                                            value={this.props.treatments[i].herbName}
                                            onChange={this._onChangeName}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content', 'dose')}>
                                        <input 
                                            name='dose'
                                            data-index={i}
                                            value={this.props.treatments[i].dose}
                                            onChange={this._onChangeName}
                                        />
                                    </div>
                                </td>
                            </Fragment>
                            : <Fragment>
                                <td>
                                    <div className={cx('content', 'medicinal-name')}>
                                        {this.props.treatments[i].herbName}
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content', 'dose')}>
                                        {this.props.treatments[i].dose}
                                    </div>
                                </td>
                            </Fragment>
                        }
                    </tr>
                )
            })
        )
    }
}

export default TreatmentRowForm;