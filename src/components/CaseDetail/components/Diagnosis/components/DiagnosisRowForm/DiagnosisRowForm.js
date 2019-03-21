import React, { Component, Fragment } from 'react';
import styles from './DiagnosisRowForm.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('diagnosisStore')
@observer
class DiagnosisRowForm extends Component {
    _onChangeName = (e) => {
        this.props.diagnosisStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _deleteDiagnosis = (e) => {
        if (
            this.props.diagnosisStore.editableData.length > 1
            && e.target.dataset.index !== undefined
        ) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.handleDeleteDiagnosis(selectedIndex);
        }
    }

    render() {
        const { isEditing } = this.props;

        return (
            this.props.diagnosis.map((diagnosis, i) => {
                return (
                    <tr className={cx('DiagnosisRowForm', 'table-row')} key={i}>
                        {
                            isEditing
                            ? <Fragment>
                                <td>
                                    <div 
                                        className={cx('content', 'delete-row-button')} 
                                        data-index={i}
                                        onClick={this._deleteDiagnosis}
                                    >
                                        <FontAwesomeIcon 
                                            className={cx('icon', 'minus')} 
                                            icon={faMinusSquare} 
                                            data-index={i}
                                            onClick={this._deleteDiagnosis}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content')}>
                                        <div className={cx('selector')}>
                                            <select
                                                name='category'
                                                className={cx('category')}
                                                data-index={i}
                                                value={this.props.diagnosis[i].category || ""}
                                                onChange={this._onChangeName}
                                            >
                                                <option value="">- 선택 -</option>
                                                <option value="소화기계">소화기계</option>
                                                <option value="신경">신경</option>
                                                <option value="내부">내부</option>
                                                <option value="외부">외부</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content')}>
                                        <input 
                                            name='conditionName'
                                            data-index={i}
                                            value={this.props.diagnosis[i].conditionName || ""}
                                            onChange={this._onChangeName}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content', 'description')}>
                                        <input 
                                            name='description'
                                            data-index={i}
                                            value={this.props.diagnosis[i].description || ""}
                                            onChange={this._onChangeName}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className={cx('content')}>
                                        <div className={cx('selector')}>
                                            <select
                                                name='strategy'
                                                className={cx('treatmen-way')}
                                                data-index={i}
                                                value={this.props.diagnosis[i].strategy || ""}
                                                onChange={this._onChangeName}
                                            >
                                                <option value="">- 선택 -</option>
                                                <option value="소화기계">소화기계</option>
                                                <option value="신경">신경</option>
                                                <option value="내부">내부</option>
                                                <option value="외부">외부</option>
                                            </select>
                                        </div>
                                    </div>
                                </td>
                            </Fragment>
                            : <Fragment>
                                <td className={cx('readOnly')}>
                                    <div className={cx('content')}>
                                        <div className={cx('selector')}>
                                            {this.props.diagnosis[i].category}
                                        </div>
                                    </div>
                                </td>
                                <td className={cx('readOnly')}>
                                    <div className={cx('content')}>
                                        {this.props.diagnosis[i].conditionName}
                                    </div>
                                </td>
                                <td className={cx('readOnly')}>
                                    <div className={cx('content', 'description')}>
                                        {this.props.diagnosis[i].description}
                                    </div>
                                </td>
                                <td className={cx('readOnly')}>
                                    <div className={cx('content')}>
                                        <div className={cx('selector')}>
                                            {this.props.diagnosis[i].strategy}
                                        </div>
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

export default DiagnosisRowForm;