import React, { Component } from 'react';
import styles from './SymptomRowForm.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { inject, observer } from 'mobx-react';
import category from '../../../../../../constant/symptomCategory';

const cx = classNames.bind(styles);

@inject('symptomStore')
@observer
class SymptomRowForm extends Component {
    _onChangeName = (e) => {
        this.props.symptomStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _deleteSymptom = (e) => {
        if (e.target.dataset.index !== undefined
        ) {
            e.stopPropagation();
            const selectedIndex = e.target.dataset.index;
            this.props.handleDeleteSymptom(selectedIndex);
        }
    }

    _renderCategoryOption = () => {
        return category.map((category, i) => {
            return (
                <option key={i} value={category}>{category}</option>
            )
        })
    }

    render() {
        return (
            this.props.symptoms.map((symptom, i) => {
                return (
                    <tr className={cx('SymptomRowForm', 'table-row')} key={i}>
                        <td>
                            <div 
                                className={cx('content', 'delete-row-button')} 
                                data-index={i}
                                onClick={this._deleteSymptom}
                            >
                                <FontAwesomeIcon 
                                    className={cx('icon', 'minus')} 
                                    icon={faMinusSquare} 
                                    data-index={i}
                                    onClick={this._deleteSymptom}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'rank')}>
                                <div className={cx('selector')}>
                                    <select
                                        name='rank'
                                        data-index={i}
                                        value={this.props.symptoms[i].rank || ""}
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
                                        value={this.props.symptoms[i].category || ""}
                                        onChange={this._onChangeName}
                                    >
                                        <option value="">- 선택 -</option>
                                        {this._renderCategoryOption()}
                                    </select>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'name')}>
                                <input 
                                    name='name'
                                    data-index={i}
                                    value={this.props.symptoms[i].name || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'onset')}>
                                <input 
                                    name='onset'
                                    data-index={i}
                                    value={this.props.symptoms[i].onset || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'degree')}>
                                <input 
                                    name='degree'
                                    data-index={i}
                                    value={this.props.symptoms[i].degree || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'unit')}>
                                <input 
                                    name='unit'
                                    data-index={i}
                                    value={this.props.symptoms[i].unit || ""}
                                    onChange={this._onChangeName}
                                />
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'description')}>
                                <input 
                                    name='description'
                                    data-index={i}
                                    value={this.props.symptoms[i].description || ""}
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

export default SymptomRowForm;