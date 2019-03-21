import React, { Component } from 'react';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject(
    'clinicaldbStore',
    'searchBarStore'
)
@observer
class SearchBar extends Component {
    componentWillUnmount() {
        this.props.clinicaldbStore.clearSearchKeyword();
    }

    _handleChange = (e) => {
        this.props.searchBarStore.setKeyword(e.target.value);
        this.props.onSearch(e.target.value);
    }
    

    render() {
        const { _handleChange } = this;
        const { keyword } = this.props.searchBarStore;
        return (
            <div className={cx('SearchBar')}>
                <input 
                    type="text"
                    name='clinicaldb-search-bar'
                    placeholder="섹션 / 구분 / 내용으로 검색해 주십시요"
                    className={cx('clinicaldb-search-bar')}
                    value={keyword}
                    onChange={_handleChange}
                />
            </div>
        );
    }
}

export default SearchBar;