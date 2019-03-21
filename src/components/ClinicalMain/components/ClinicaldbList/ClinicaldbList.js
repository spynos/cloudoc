import React, { Component } from 'react';
import styles from './ClinicaldbList.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import {
    Card,
    Badge
} from 'react-bootstrap';

const cx = classNames.bind(styles);

@inject(
    'clinicaldbStore'
)
@observer
class ClinicaldbList extends Component {
    componentDidMount() {
        this.props.clinicaldbStore.loadClinicaldbs();
    }
    componentWillUnmount() {
        this.props.clinicaldbStore.clear();
    }

    _renderArticleList = (articles) => {
        return articles.map((article, i) => {
            const {
                _id,
                name,
                section,
                category,
                description
            } = article;
            return (
                <Link 
                    className={cx('anchor')}
                    key={i} 
                    to={`/clinicaldb/detail/${section}/${_id}`}
                    target='_blank'
                >
                    <Card className={cx('article')}>
                        <Card.Header className={cx('article-header')}>
                            <Badge 
                                className={cx('pill', 'section')}
                                pill 
                                variant="info"
                            >
                                {section}
                            </Badge>
                            <Badge 
                                className={cx('pill', 'category')}
                                pill 
                                variant="secondary"
                            >
                                {category}
                            </Badge>
                        </Card.Header>
                        <Card.Body className={cx('article-body')}>
                            <Card.Title className={cx('title')}>{name}</Card.Title>
                            <Card.Text>
                                {description}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            )
        })
    }
    
    render() {
        const { clinicaldbs } = this.props.clinicaldbStore;
        const { isLoading } = this.props.clinicaldbStore;

        if (isLoading) {
            return (
                <div className={cx('ClinicaldbList', 'loading-container')}>
                    <div className={cx("spinner-grow")} role="status">
                        <span className={cx("sr-only")}>Loading...</span>
                    </div>
                </div>
            );
        }
        return (
            <div className={cx('ClinicaldbList')}>
                {this._renderArticleList(clinicaldbs)}
            </div>
        )
    }
}

export default ClinicaldbList;