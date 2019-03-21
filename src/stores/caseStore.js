import { observable, action, computed } from 'mobx';
import analyzeSymptomStore from './analyzeSymptomStore';
import analyzeBloodTestStore from './analyzeBloodTestStore';
import analyzeRecommendationTreatmentStore from './analyzeRecommendationTreatmentStore';
import agent from '../util/agent';
import momentHelper from '../util/momentHelper';
import Hangul from 'hangul-js';

class CaseStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable isShowingTopbar = false;
    @observable referenceForIsShowingTopbar = 0;

    @observable registry = [];
    @observable currentCaseRecordDate = '';
    @observable currentCaseRecord = [];
    @observable currentCasePatient = [];
    @observable currentCaseDetail = [];
    @observable currentCase = {};
    @observable lastestCaseRecordData = {};
    @observable numberOfCases = null;

    @observable currentCaseIndex = '';

    @computed get cases() {
        let cases = [];
        this.registry.forEach((Case) => { cases.push(Case); });

        cases = this._search(this.searchKeyword, cases);

        return cases;
    };

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
        return (this._whichHasSearchKeywordInProperty(this.filterKeyword, searcher, item)) ? true : false;
    }

    _whichHasSearchKeywordInProperty = (filterKeyword, searcher, item) => {
        const latestRecordIndex = item.record.length - 1;
        const { treatment } = item.record[latestRecordIndex]; 

        switch(filterKeyword) {
            case 'chart_id':
                return this._hasSearchKeywordInProperty(searcher, item.patient['chart_id'] || '');
            case 'symptom':
                return this._hasSearchKeywordInProperty(searcher, this._getRecordLatestData(item, 'symptom') || '');
            case 'condition':
                return this._hasSearchKeywordInProperty(searcher, this._getRecordLatestData(item, 'diagnosis') || ''); 
            case 'drug':
                return this._hasSearchKeywordInProperty(searcher, treatment.drugName || '');
            default:
                return (
                    this._hasSearchKeywordInProperty(searcher, item.patient['chart_id'] || '') 
                    || this._hasSearchKeywordInProperty(searcher, this._getRecordLatestData(item, 'symptom') || '') 
                    || this._hasSearchKeywordInProperty(searcher, this._getRecordLatestData(item, 'diagnosis') || '') 
                    || this._hasSearchKeywordInProperty(searcher, treatment.drugName || '') 
                )
        }
    }

    _getRecordLatestData = (item, type) => {
        const latestRecordIndex = item.record.length - 1;
        const { symptom, diagnosis } = item.record[latestRecordIndex]; 
        let items = [];
        
        if (type === 'symptom') {
            symptom.map((symptom, i) => {
                return items.push(symptom.name);
            });
            return items;
        }
        if (type === 'diagnosis') {
            diagnosis.map((diagnosis, i) => {
                return items.push(diagnosis.conditionName);
            });
            return items;
        }
    }

    _hasSearchKeywordInProperty(searcher, property_string) {
        if (typeof property_string === 'string') {
            return searcher.search(property_string.toLowerCase()) >= 0 ? true : false;
        }
        if (Array.isArray(property_string)) {
            let a = [];
            property_string.forEach((word) => {
                a.push(searcher.search(word.toLowerCase()) >= 0);
            });
            return a.find(str => str === true);
        }
    }

    @action toggleIsEditing() {
        this.isEditing = !this.isEditing;
    }

    @action setIsShowingTopbar(state) {
        this.isShowingTopbar = state;
    }

    @action setReferenceForIsShowingTopbar(reference) {
        this.referenceForIsShowingTopbar = reference * 2.5;
    }

    @action loadCases() {
        this.isLoading = true;
        return agent.loadCases()
                .then(action((response) => {
                    this.isLoading = false;
                    this.registry = response.data.cases;
                    this.numberOfCases = this.registry.length;
                }))
                .catch(error => {
                    console.log(error);
                });
    }

    @action postCase(newCase) {
        this.isLoading = true;
        return agent.postCase(newCase)
            .then(action((response) => {
                this.isLoading = false;
                this.loadCases();
            }))
    }

    @action updateCase(dateIndex, caseId, updatedCase) {

        let reversedRecords = [];
        if (this.currentCase.record.length > 1) {
            reversedRecords = this.currentCase.record.slice().reverse();
            
            let willBeUpdatedRecords = JSON.parse(JSON.stringify(reversedRecords));
            willBeUpdatedRecords.splice(dateIndex, 1, updatedCase.record[0]);
            let reversedUpdatedRecords = willBeUpdatedRecords.slice().reverse();
            updatedCase = { ...updatedCase, record: reversedUpdatedRecords }
        }
        
        this.isLoading = true;

        return agent.updateCase(caseId ,updatedCase)
            .then(action((response) => {
                this.isLoading = false;
                
                this.setCurrentCase(caseId, dateIndex);
                this.toggleIsEditing();
            }));
    }

    @action deleteCase(id) {
        this.isLoading = true;
        return agent.deleteCase(id)
            .then(action((response) => {
                this.isLoading = false;
            }))
    }

    @action async setCurrentCase(caseId, dateIndex) {
        this.isLoading = true;
        return await agent.loadCase(caseId)
            .then(action((response) => {

                this.currentCase = response.data.case;
                this.currentCasePatient = response.data.case.patient;

                let reversedDetail = response.data.case.record.slice().reverse();
                this.currentCaseDetail = reversedDetail[dateIndex];

                let recordDates = [];
                response.data.case.record.forEach((record) => { recordDates.push(record.createdDate) });
                this.currentCaseRecord = recordDates.slice().reverse();
                
                this.currentCaseRecordDate = this.currentCaseRecord[dateIndex];

                this.isLoading = false;
            }))

    }
        
    @action addNewRecordToCase(currentCaseIndex, caseId) {
        const lengthOfRecord = this.cases[currentCaseIndex].record.length;
        const lastDate = this.cases[currentCaseIndex].record[lengthOfRecord - 1].createdDate;
        let createdDate =  momentHelper.getLocaleDateWithYYYY(new Date());

        const id = caseId;

        if (createdDate !== lastDate) {
            let oldCases = JSON.parse(JSON.stringify(this.cases));
            let latestRecord = oldCases[currentCaseIndex].record.splice(lengthOfRecord - 1, 1);
            let newCase = JSON.parse(JSON.stringify(this.currentCase));

            latestRecord[0].createdDate = createdDate;
            newCase.record.push(latestRecord[0]);

            return agent.addRecordToCase(id, newCase)
                .then(action((response) => {
                    const recordDates = [];
                    response.data.record.forEach((record) => {
                        recordDates.push(record.createdDate)
                    });
                    this.currentCaseRecord = recordDates.reverse();
                    this.toggleIsEditing();
                }));
        }
    }

    @action deleteRecordFromCase(currentCaseIndex, caseId) {
        const id = caseId;
        const willBeDeletedRecordDate = this.currentCaseRecordDate;
        
        let newCase = JSON.parse(JSON.stringify(this.cases[currentCaseIndex]));

        let recordDates = [];
        newCase.record.forEach((record) => { recordDates.push(record.createdDate) });
        const willBeDeletedRecordDateIndex = recordDates.indexOf(willBeDeletedRecordDate);

        if (recordDates.length > 1) {
            newCase.record.splice(willBeDeletedRecordDateIndex, 1);
            return agent.deleteRecordFromCase(id, newCase)
                .then(action((response) => {
                    const recordDates = [];
                    response.data.record.forEach((record) => {
                        recordDates.push(record.createdDate);
                    });
                    this.currentCaseRecord = recordDates.reverse();
                    if (this.isEditing === true) {
                        this.toggleIsEditing();
                    }
                }));
        }
    }

    @action analyzeSymptom(referenceData = {}) {
        return agent.analyzeSymptom({ referenceData })
            .then(action((response) => {
                analyzeSymptomStore.setEditableData(response.data.result);
            }))
            .catch(err => {
                throw(err);
            })
    }

    @action analyzeLab(referenceData = {}) {
        return agent.analyzeLab({ referenceData })
            .then(action((response) => {
                analyzeBloodTestStore.setEditableData(response.data.result);
            }))
            .catch(err => {
                throw(err);
            })
    }

    @action analyzeTreatment(referenceData = {}) {
        return agent.analyzeTreatment({ referenceData })
            .then(action((response) => {
                analyzeRecommendationTreatmentStore.setEditableData(response.data.result);
            }))
            .catch(err => {
                throw(err);
            })
    }

    @action clear() {
        this.isLoading = false;
        
        this.registry = observable.array();
        this.currentCaseRecordDate = '';
        this.currentCaseRecord = [];
        this.currentCasePatient = [];
        this.currentCaseDetail = [];
        this.currentCase = {};
        this.lastestCaseRecordData = {};

        this.referenceForIsShowingTopbar = 0;

        this.clearIsShowingTopbar();
        this.clearIsEditing();
    }

    @action clearIsShowingTopbar() {
        this.isShowingTopbar = false;
    }

    @action clearIsEditing() {
        this.isEditing = false;
    }

    @action clearSearchKeyword() {
        console.log('csk')
        this.searchKeyword = '';
    }
}
    
export default new CaseStore()