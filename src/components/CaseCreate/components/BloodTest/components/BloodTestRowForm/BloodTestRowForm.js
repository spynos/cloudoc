import React, { Component, Fragment } from 'react';
import styles from './BloodTestRowForm.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import items from '../../../../../../constant/bloodTestItem';
import VisualizedDataBar from '../../../../../VisualizedDataBar';

const cx = classNames.bind(styles);

@inject('bloodTestStore')
@observer
class BloodTestRowForm extends Component {
    _onChangeName = (e) => {
        this.props.bloodTestStore.handleChange(e.target.dataset.index, e.target.name, e.target.value);
    }

    _renderState = (index, value) => {
        const {
            refMin,
            refMax,
            optMin,
            optMax
        } = items[index];

        let state = this.props.bloodTestStore.getState(index, refMin, refMax, optMin, optMax, value);

        return state;
    }

    _renderItemList = (labs) => {
        return labs.map((item, i) => {
            let category, name, unit;
            category = item.category;
            name = item.name;
            unit = item.unit;

            const {
                refMin,
                refMax,
                optMin,
                optMax
            } = items[i];

            return (
                <tr className={cx('BloodTestRowForm', 'table-row')} key={i}>
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
                    <td>
                        <div className={cx('content', 'visualized-data-bar')}>
                            <VisualizedDataBar 
                                currentPosition={''}
                                label={[refMin, optMin, optMax, refMax]}
                                refMin={refMin}
                                refMax={refMax}
                                optMin={optMin}
                                optMax={optMax}
                                state={this.props.bloodTest[i].state}
                            />
                        </div>
                    </td>
                </tr>
            )
        })
    }

    render() {
        if (!JSON.parse(JSON.stringify(this.props.bloodTestStore.editableData))[0]) return (
            <tr className={cx('CaseCreate', 'loading-container')}>
                <td className={cx("spinner-grow")} role="status">
                    <span className={cx("sr-only")}>Loading...</span>
                </td>
            </tr>
        );
        return (
            <Fragment>
                {this._renderItemList(this.props.bloodTest)}
            </Fragment>
        )
    }
}

export default BloodTestRowForm;