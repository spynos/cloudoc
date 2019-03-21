import { observable, action } from "mobx";

class ClinicalCreateStore {
    @observable isLoading = false;
    @observable registry = [];

    // 선택된 섹션버튼으로 필터링 하는 기능
    @observable sectionKeyword = '';

    @action setSectionKeyword(sectionKeyword) {
        this.sectionKeyword = sectionKeyword;
    }

    @action clearSectionKeyword() {
        this.sectionKeyword = '';
    }
}

export default new ClinicalCreateStore();