import React, { Component } from 'react';
import styles from './TitleForClinicaldb.module.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

@withRouter
class TitleForClinicaldb extends Component {

    render() {
        const { title } = this.props;
        return (
            <div className={cx('TitleForClinicaldb')}>
                <div className={cx('container')}>
                    <div className={cx("title")}>
                        {title}
                    </div>
                    <div className={cx("go-back-button")}>
                        <div 
                            className={cx('button')}
                            onClick={() => {
                            this.props.history.push(`/clinicaldb`);
                            }}
                        >
                            <FontAwesomeIcon className={cx('icon')} icon={faUndoAlt} />
                            <div className={cx('label')}>목록으로</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default TitleForClinicaldb;