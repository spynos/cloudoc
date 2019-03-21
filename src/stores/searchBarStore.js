import { observable, action } from 'mobx';

class SearchBarStore {
    @observable keyword = '';

    @action setKeyword = (keyword) => { 
        this.keyword = keyword;
    }

    @action clearKeyword() {
        this.keyword = '';
    }
}

export default new SearchBarStore();