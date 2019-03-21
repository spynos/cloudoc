import _ from 'lodash';
import React, { Component } from 'react';
import styles from './SearchForClinicaldb.module.scss';
import classNames from 'classnames/bind';
import SearchBar from '../SearchBar/SearchBar';
import ClinicaldbList from '../ClinicaldbList/ClinicaldbList';
import FilterButtonGroup from '../FilterButtonGroup/FilterButtonGroup';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('clinicaldbStore')
@observer
class SearchForClinicaldb  extends Component {
    handleOnSearch = (searchKeyword) => {
        this.props.clinicaldbStore.setSearchKeyword(searchKeyword);
    }

    render() {
        return (
            <div className={cx('SearchForClinicaldb')}>
                <SearchBar onSearch={_.debounce(this.handleOnSearch, 300)} />
                <FilterButtonGroup />
                <ClinicaldbList />
            </div>
        );
    }
}

export default SearchForClinicaldb;