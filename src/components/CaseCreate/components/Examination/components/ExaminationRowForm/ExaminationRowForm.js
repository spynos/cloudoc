import React, { Component } from 'react';
import styles from './ExaminationRowForm.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('examinationStore')
@observer
class ExaminationRowForm extends Component {
    _onChangeName = (e) => {
        this.props.examinationStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _deleteExamination = (e) => {
        if (
            e.target.dataset.index !== undefined
        ) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.handleDeleteExamination(selectedIndex);
        }
    }

    render() {
        return (
            this.props.examinations.map((examination, i) => {
                return (
                    <tr className={cx('ExaminatiomRowForm', 'table-row')} key={i}>
                        <td>
                            <div 
                                className={cx('content', 'delete-row-button')} 
                                data-index={i}
                                onClick={this._deleteExamination}
                            >
                                <FontAwesomeIcon 
                                    className={cx('icon', 'minus')} 
                                    icon={faMinusSquare} 
                                    data-index={i}
                                    onClick={this._deleteExamination}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'rank')}>
                                <div className={cx('selector')}>
                                    <select
                                        name='rank'
                                        data-index={i}
                                        value={this.props.examinations[i].rank || ""}
                                        onChange={this._onChangeName}
                                    >
                                        <option value="">- 선택 -</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'category')}>
                                <div className={cx('selector')}>
                                    <select
                                        name='category'
                                        className={cx('category')}
                                        data-index={i}
                                        value={this.props.examinations[i].category || ""}
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
                            <div className={cx('content', 'name')}>
                                <input 
                                    name='name'
                                    data-index={i}
                                    value={this.props.examinations[i].name || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'state')}>
                                <input 
                                    name='state'
                                    data-index={i}
                                    value={this.props.examinations[i].state || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'value')}>
                                <input 
                                    name='value'
                                    data-index={i}
                                    value={this.props.examinations[i].value || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content','unit')}>
                                <input 
                                    name='unit'
                                    data-index={i}
                                    value={this.props.examinations[i].unit || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'description')}>
                                <input 
                                    name='description'
                                    data-index={i}
                                    value={this.props.examinations[i].description || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                    </tr>
                )
            })
        )
    }
}

export default ExaminationRowForm;