import React, { Component } from 'react';
import styles from './AnalyzeRecommendationTreatmentRowForm.module.scss';
import classNames from 'classnames/bind';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

@observer
class AnalyzeRecommendationTreatmentRowForm extends Component {
    render() {
        return (
            this.props.analyzeRecommendationTreatments.map((analyzeRecommendationTreatment, i) => {
                return (
                    <tr className={cx('AnalyzeRecommendationTreatmentRowForm', 'table-row')} key={i}>
                        <td>
                            <div className={cx('content', 'rank')}>
                                {this.props.analyzeRecommendationTreatments[i].rank}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'treatment-name')}>
                                {this.props.analyzeRecommendationTreatments[i].drugName}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'related-disease')}>
                                {this.props.analyzeRecommendationTreatments[i].relatedDisease}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'evidence')}>
                                {this.props.analyzeRecommendationTreatments[i].evidence}
                            </div>
                        </td>
                        <td>
                            <div className={cx('content', 'evidenceData')}>
                                <Link 
                                    className={cx('anchor')}
                                    key={i} 
                                    to={`/clinicaldb/detail/reference/link/${this.props.analyzeRecommendationTreatments[i].reference_id}`}
                                    target='_blank'
                                >
                                    상세보기
                                </Link>
                            </div>
                        </td>
                    </tr>
                )
            })
        )
    }
}

export default AnalyzeRecommendationTreatmentRowForm;