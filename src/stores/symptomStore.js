import { observable, action } from 'mobx';

class SymptomStore {
    @observable staticData = [];
    @observable editableData = [];

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });

    }

    @action handleChange(index, key, value) {
        this.editableData[index][key] = value;
    }

    @action addSymptom() {
        this.editableData = [...this.editableData, {
            rank: 0,
            category: '',
            name: '',
            onset: '',
            degree: '',
            unit: '',
            description: ''
        }];
    }

    @action deleteSymptom(selectedIndex) {
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

export default new SymptomStore()