import React, { Component, Fragment } from 'react';
import styles from './BloodTestRowForm.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import VisualizedDataBar from '../../../../../VisualizedDataBar';
import bloodTestItem from '../../../../../../constant/bloodTestItem';

const cx = classNames.bind(styles);

@inject('bloodTestStore')
@observer
class BloodTestRowForm extends Component {

    _onChangeName = (e) => {
        this.props.bloodTestStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _renderState = (index, value) => {
        let state;
        const {
            refMin,
            refMax,
            optMin,
            optMax
        } = bloodTestItem[index];

        state = this.props.bloodTestStore.getState(index, refMin, refMax, optMin, optMax, value);
        return state;
    }

    _renderItemList = (items, isEditing) => {
        
        return items.map((item, i) => {
            const {
                refMin,
                refMax,
                optMin,
                optMax
            } = bloodTestItem[i];

            let category, name, unit;
            category = item.category;
            name = item.name;
            unit = item.unit;

            return (
                    <tr className={cx('BloodTestRowForm', 'table-row')} key={i}>
                    { isEditing ?
                        <Fragment>
                            <td>
                                <div className={cx('content', 'category')}>
                                    <div className={cx('selector')}>
                                        <div
                                            name='category'
                                            className={cx('category')}
                                            data-index={i}
                                        >
                                            {category}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'name')}>
                                        <div        
                                            name='name'
                                            className={cx('name')}
                                            data-index={i}
                                        >
                                            {name}
                                        </div>
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'value')}>
                                    <input 
                                        name='value'
                                        data-index={i}
                                        className={cx('value')}
                                        value={this.props.bloodTest[i].value || ""}
                                        onChange={this._onChangeName}
                                    />
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'unit')}>
                                        <div
                                            name='unit'
                                            data-index={i}
                                        >
                                            {unit}
                                        </div>
                                </div>
                            </td>
                            <td>
                                <div className={cx('content', 'state')}>
                                    {this._renderState(i, this.props.bloodTest[i].value)}
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'visualized-data-bar')}>
                                    <VisualizedDataBar 
                                        currentPosition={this.props.bloodTest[i].value}
                                        label={[refMin, optMin, optMax, refMax]}
                                        refMin={refMin}
                                        refMax={refMax}
                                        optMin={optMin}
                                        optMax={optMax}
                                        state={this.props.bloodTest[i].state}
                                    />
                                </div>
                            </td>
                        </Fragment>
                        : <Fragment>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'category')}>
                                    <div className={cx('selector')}>
                                        {this.props.bloodTest[i].category}
                                    </div>
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'name')}>
                                    {this.props.bloodTest[i].name}
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'value')}>
                                    {this.props.bloodTest[i].value || '-'}
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'unit')}>
                                    {this.props.bloodTest[i].unit}
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content')}>
                                    {this.props.bloodTest[i].state || '-'}
                                </div>
                            </td>
                            <td className={cx('readOnly')}>
                                <div className={cx('content', 'visualized-data-bar')}>
                                    <VisualizedDataBar 
                                        currentPosition={this.props.bloodTest[i].value}
                                        label={[refMin, optMin, optMax, refMax]}
                                        refMin={refMin}
                                        refMax={refMax}
                                        optMin={optMin}
                                        optMax={optMax}
                                        state={this.props.bloodTest[i].state}
                                    />
                                </div>
                            </td>
                        </Fragment>
                    }
                    </tr>
            )
        })
    }

    render() {
        if (!JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData))[0]) return null;

        const { isEditing } = this.props;
        
        return (
            <Fragment>
                {this._renderItemList(this.props.bloodTest, isEditing)}
            </Fragment>
        )
    }
}

export default BloodTestRowForm;