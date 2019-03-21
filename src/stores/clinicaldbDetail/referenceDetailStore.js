import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class ReferenceDetailStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentReference = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: '',
        editMethod: '',
        editDoi: '',
        editYear: '',
        editPublisher: '',
        editUrl: '',
        editMemo: '',
        editMethodDetail: ''
    };
    @observable editableDataForSymptom = [];
    @observable editableDataForLab = [];
    @observable editableDataForDrug = [];

    @action setEditableDataForLinks(initialDatas) {
        const {
            symptom,
            lab,
            drug
        } = initialDatas;
        this.setEditableDataForSymptom(symptom);
        this.setEditableDataForLab(lab);
        this.setEditableDataForDrug(drug);
    }

    @action setEditableDataForSymptom(initialDatas) {
        initialDatas.forEach((initialData) => { this.editableDataForSymptom.push(initialData) });
    }
    @action setEditableDataForLab(initialDatas) {
        initialDatas.forEach((initialData) => { this.editableDataForLab.push(initialData) });
    }
    @action setEditableDataForDrug(initialDatas) {
        initialDatas.forEach((initialData) => { this.editableDataForDrug.push(initialData) });
    }

    @action handleChangeForSymptom(index, key, value) {
        this.editableDataForSymptom[index][key] = value;
    }
    @action handleChangeForLab(index, key, value) {
        this.editableDataForLab[index][key] = value;
    }
    @action handleChangeForDrug(index, key, value) {
        this.editableDataForDrug[index][key] = value;
    }

    @action addSymptom() {
        this.editableDataForSymptom = [...this.editableDataForSymptom, {
            symptomName: '',
            conditionName: '',
            description: ''
        }];
    }
    @action addLab() {
        this.editableDataForLab = [...this.editableDataForLab, {
            labName: '',
            state: '',
            conditionName: '',
            description: ''
        }];
    }
    @action addDrug() {
        this.editableDataForDrug = [...this.editableDataForDrug, {
            drugName: '',
            conditionName: '',
            description: ''
        }];
    }

    @action deleteSymptom(selectedIndex) {
        this.editableDataForSymptom.splice(selectedIndex, 1);
    }
    @action deleteLab(selectedIndex) {
        this.editableDataForLab.splice(selectedIndex, 1);
    }
    @action deleteDrug(selectedIndex) {
        this.editableDataForDrug.splice(selectedIndex, 1);
    }

    @action setEditableData(initialData) {
        const {
            name,
            category,
            method,
            doi,
            year,
            publisher,
            url,
            memo,
            description,
            methodDetail
        } = initialData;

        this.editableData = {
            editName: name,
            editDescription: description,
            editCategory: category,
            editMethod: method,
            editDoi: doi,
            editYear: year,
            editPublisher: publisher,
            editUrl: url,
            editMemo: memo,
            editMethodDetail: methodDetail
        };
    }

    @action changeEditableData(name, value) {
        this.editableData[name] = value;
    }

    @action onEditing() {
        this.isEditing = true;
    }

    @action notEditing() {
        this.isEditing = false;
    }

    @action loadReference(referenceId) {
        this.isLoading = true;
        agent.loadReference(referenceId)
            .then(action((response) => {
                this.currentReference = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action loadReferenceByLink(referenceId) {
        this.isLoading = true;
        agent.loadReferenceByLink(referenceId)
            .then(action((response) => {
                this.currentReference = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createReference() {
        this.isLoading = true;
        
        const {
            editName,
            editDescription,
            editCategory,
            editMethod,
            editDoi,
            editYear,
            editPublisher,
            editUrl,
            editMemo,
            editMethodDetail
        } = this.editableData;

        let newReferenceData = {
            name: editName,
            category: editCategory,
            section: 'reference',
            method: editMethod,
            doi: editDoi,
            year: editYear,
            publisher: editPublisher,
            url: editUrl,
            memo: editMemo,
            description: editDescription,
            methodDetail: editMethodDetail
        };

        let links = {
            symptom: this.editableDataForSymptom,
            lab: this.editableDataForLab,
            drug: this.editableDataForDrug
        };

        newReferenceData = {...newReferenceData, links};

        console.log(newReferenceData);

        agent.createReference(newReferenceData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateReference(referenceId) {
        this.isLoading = true;
        const {
            editName,
            editDescription,
            editCategory,
            editMethod,
            editDoi,
            editYear,
            editPublisher,
            editUrl,
            editMemo,
            editMethodDetail
        } = this.editableData;

        let updateReferenceData = {
            name: editName,
            category: editCategory,
            method: editMethod,
            doi: editDoi,
            year: editYear,
            publisher: editPublisher,
            url: editUrl,
            memo: editMemo,
            description: editDescription,
            methodDetail: editMethodDetail
        };

        let links = {
            symptom: this.editableDataForSymptom,
            lab: this.editableDataForLab,
            drug: this.editableDataForDrug
        };

        updateReferenceData = {...updateReferenceData, links};
        agent.updateReference(referenceId, updateReferenceData)
            .then(action((response) => {
                this.loadReference(referenceId);
                this.clearEditableDataForSymptom();
                this.clearEditableDataForLab();
                this.clearEditableDataForDrug();
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action deleteReference(referenceId) {
        this.isLoading = true;
        agent.deleteReference(referenceId)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }
    
    @action clear() {
        this.isLoading = false;
        this.isEditing = false;
        this.currentReference = {};
        this.editableDataForSymptom = [];
        this.editableDataForLab = [];
        this.editableDataForDrug = [];
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: '',
            editReference: '',
            editCaution: '',
            editGuide: '',
            editLifestyle: ''
        }
    }

    @action deleteAllInputValue() {
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: '',
            editReference: '',
            editCaution: '',
            editGuide: '',
            editLifestyle: ''
        }
        this.editableDataForSymptom = [];
        this.editableDataForLab = [];
        this.editableDataForDrug = [];
    }

    @action clearEditableDataForSymptom() {
        this.editableDataForSymptom = [];
    }
    @action clearEditableDataForLab() {
        this.editableDataForLab = [];
    }
    @action clearEditableDataForDrug() {
        this.editableDataForDrug = [];        
    }

}

export default new ReferenceDetailStore();