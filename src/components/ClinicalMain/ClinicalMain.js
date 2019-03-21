import React, { Component } from 'react';
import styles from './ClinicalMain.module.scss';
import classNames from 'classnames/bind';
import SearchBar from './components/SearchBar';
import ClinicaldbList from './components/ClinicaldbList';
import _ from 'lodash';
import { inject } from 'mobx-react';
import FilterButtonGroup from './components/FilterButtonGroup';
import { Container, Row, Col } from 'react-bootstrap';

const cx = classNames.bind(styles);

@inject(
    'clinicaldbStore'
)
class ClinicalMain extends Component {
    componentWillUnmount() {
        this.props.clinicaldbStore.clear();
    }
    handleOnSearch = (searchKeyword) => {
        this.props.clinicaldbStore.setSearchKeyword(searchKeyword);
    }

    render() {
        return (
            <div className={cx('ClinicalMain')}>
                <Container>
                    <Row className={cx('title-container')}>
                        <Col>
                            <div className={cx('title')}>
                            임상정보 자료
                            </div>
                        </Col>
                    </Row>
                    <SearchBar onSearch={_.debounce(this.handleOnSearch, 300)} />
                    <FilterButtonGroup />
                    <ClinicaldbList />
                </Container>
            </div>
        );
    }
}

export default ClinicalMain;