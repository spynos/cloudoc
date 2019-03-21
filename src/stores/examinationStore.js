import { observable, action } from 'mobx';

class ExaminationStore {
    @observable staticData = [];
    @observable editableData = [];

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });

    }

    @action handleChange(index, key, value = "") {
        this.editableData[index][key] = value;
    }

    @action addExamination() {
        this.editableData = [...this.editableData, {
            rank: '',
            category: '',
            name: '',
            state: '',
            value: '',
            unit: '',
            description: ''
        }];
    }

    @action deleteExamination(selectedIndex) {
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

export default new ExaminationStore()