import React, { Component } from 'react';
import styles from './AnalyzeSymptomRowForm.module.scss';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';

const cx = classNames.bind(styles);

@observer
class AnalyzeSymptomRowForm extends Component {
    _renderItem = (items) => {
        return items.map((item, i) => {
            return <div key={i}>{item}</div>
        })
    }
    
    render() {
        return (
            this.props.analyzeSymptoms.map((analyzeSymptom, i) => {
                return (
                    <tr className={cx('AnalyzeSymptomRowForm', 'table-row')} key={i}>
                        <td>
                            <div className={cx('content', 'rank')}>
                                {this.props.analyzeSymptoms[i].rank}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'disease-name')}>
                                {this.props.analyzeSymptoms[i].conditionName}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'consistency')}>
                                {this.props.analyzeSymptoms[i].consistency}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'matchedItem')}>
                            {this._renderItem(this.props.analyzeSymptoms[i].matchedItem)}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'unmatchedItem')}>
                                {this._renderItem(this.props.analyzeSymptoms[i].unmatchedItem)}
                            </div>
                        </td>
                    </tr>
                )
            })
        )
    }
}

export default AnalyzeSymptomRowForm;