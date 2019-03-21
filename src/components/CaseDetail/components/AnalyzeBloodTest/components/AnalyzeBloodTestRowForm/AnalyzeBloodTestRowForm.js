import React, { Component } from 'react';
import styles from './AnalyzeBloodTestRowForm.module.scss';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';

const cx = classNames.bind(styles);

@observer
class AnalyzeBloodTestRowForm extends Component {
    _renderMatchedItem = (items) => {
        return items.map((item, i) => {
            const {
                name,
                state
            } = item;
            return <div className={cx('item', {high: state === 'high'}, {low: state === 'low'})} key={i}>{name}</div>
        })
    }

    _renderUnmatchedItem = (items) => {
        return items.map((item, i) => {
            const {
                labName,
                state
            } = item;
            return <div className={cx('item', {high: state === 'high'}, {low: state === 'low'})} key={i}>{labName}</div>
        })
    }

    render() {
        return (
            this.props.analyzeBloodTests.map((analyzeBloodTest, i) => {
                return (
                    <tr className={cx('AnalyzeBloodTestRowForm', 'table-row')} key={i}>
                        <td>
                            <div className={cx('content', 'rank')}>
                                {this.props.analyzeBloodTests[i].rank}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'disease-name')}>
                                {this.props.analyzeBloodTests[i].conditionName}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'consistency')}>
                                {this.props.analyzeBloodTests[i].consistency}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'matchedItem')}>
                                {this._renderMatchedItem(this.props.analyzeBloodTests[i].matchedItemWithState)}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'unmatchedItem')}>
                                {this._renderUnmatchedItem(this.props.analyzeBloodTests[i].unmatchedItemWithState)}
                            </div>
                        </td>
                    </tr>
                )
            })
        )
    }
}

export default AnalyzeBloodTestRowForm;