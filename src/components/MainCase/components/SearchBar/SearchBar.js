import React, { Component } from 'react';
import styles from './SearchBar.module.scss';
import classNames from 'classnames/bind';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject(
    'caseStore',
    'searchBarStore'
)
@observer
class SearchBar extends Component {
    componentWillUnmount() {
        this.props.searchBarStore.clearKeyword();
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
                    placeholder="증례번호 / 차트번호 / 증상 / 진단 / 처방으로 검색해 주십시요"
                    className={cx('clinicaldb-search-bar')}
                    value={keyword}
                    onChange={_handleChange}
                />
            </div>
        );
    }
}

export default SearchBar;