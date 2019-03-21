import React, { Component } from 'react';
import styles from './ClinicalSubSidebar.module.scss';
import classNames from 'classnames/bind';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

class ClinicalSubSidebar extends Component {
    render() {
        return (
            <div className={cx('ClinicalSubSidebar')}>
                <div className={cx('container')}>
                    <div className={cx('title')}>
                        임상정보 DB
                    </div>
                    <div className={cx('clinicaldb-button')}>
                        <Link to={`/clinicaldb`}>
                            <Button>
                                임상정보 목록
                            </Button>
                        </Link>
                    </div>
                    <div className={cx('clinicaldb-button')}>
                        <Link to={`/clinicaldb/create`}>
                            <Button>
                                새 항목 생성
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClinicalSubSidebar;