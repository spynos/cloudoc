import { observable, action } from 'mobx';

class DiagnosisStore {
    @observable staticData = [];
    @observable editableData = [];

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });

    }

    @action handleChange(index, key, value = "") {
        this.editableData[index][key] = value;
    }

    @action addDiagnosis() {
        this.editableData = [...this.editableData, {
            category: '',
            conditionName: '',
            description: '',
            strategy: ''
        }];
    }

    @action deleteDiagnosis(selectedIndex) {
        this.editableData.splice(selectedIndex, 1);
    }

    @action clear() {
        this.staticData = [];
        this.editableData = [];
    }

    @action deleteAllInputValue() {
        this.editableData = [];
    }
}

export default new DiagnosisStore()