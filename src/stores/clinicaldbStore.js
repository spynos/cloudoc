import { observable, action, computed } from "mobx";
import agent from "../util/agent";
import Hangul from 'hangul-js';

class ClinicaldbStore {
    @observable isLoading = false;
    @observable registry = [];

    @computed get clinicaldbs() {
        let clinicaldbs = [];
        this.registry.forEach((article) => { clinicaldbs.push(article); });

        clinicaldbs = this._search(this.searchKeyword, clinicaldbs);
        clinicaldbs = this._filter(this.filterKeyword, clinicaldbs);
        return clinicaldbs;
    };

    _filter = (filterKeyword, items) => {
        if (filterKeyword === 'all') {
            return items;
        }
        let filterdItems = items.filter((item) => {
            return item.section === filterKeyword;
        });
        return filterdItems;
    }

    _sort = (items) => {
        let sortedItems = items.sort((prev, next) => { 
            return false;  // put sort condition here 
        });
        return sortedItems;
    }


    // 선택된 섹션버튼으로 필터링 하는 기능
    @observable filterKeyword = '';

    @action setFilterKeyword(filterKeyword) {
        this.filterKeyword = filterKeyword;
    }

    @action clearFilterKeyword() {
        this.filterKeyword = '';
    }


    // 불러온 데이터의 특정 property에 keyword가 포함되어있는지 검색하는 필터입니다.
    @observable searchKeyword = ''; //사용자가 검색창에 검색한 키워드
    @action setSearchKeyword = (searchKeyword) => { this.searchKeyword = searchKeyword; }

    _search = (searchKeyword, items) => {
        if (!searchKeyword) return [...items];
        const searcher = new Hangul.Searcher(searchKeyword.toLowerCase());
        return items.filter((item) => {
            return this._hasSearchKeywordInItem(searcher, item);
        });
    }

    _hasSearchKeywordInItem(searcher, item) {
        return (
                this._hasSearchKeywordInProperty(searcher, item.section || '') 
                || this._hasSearchKeywordInProperty(searcher, item.category || '') 
                || this._hasSearchKeywordInProperty(searcher, item.name || '') 
                || this._hasSearchKeywordInProperty(searcher, item.description || '') 
            ) ? true : false;
    }

    _hasSearchKeywordInProperty(searcher, property_string) {
        return searcher.search(property_string.toLowerCase()) >= 0 ? true : false;
    }

    @action async loadClinicaldbs() {
        this.isLoading = true;
        await agent.loadClinicaldbs()
            .then(action((response) => {
                this.registry = response.data || [];
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    };

    @action clear() {
        this.isLoading = false;
        this.registry = [];
        this.clearFilterKeyword();
        this.clearSearchKeyword();
    }
    @action clearSearchKeyword() {
        this.searchKeyword = '';
    }
}

export default new ClinicaldbStore();