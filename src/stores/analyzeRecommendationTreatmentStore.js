import { observable, action } from 'mobx';

class AnalyzeRecommendationTreatmentStore {
    @observable staticData = [];
    @observable editableData = [];

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });
    }

    @action handleChange(index, key, value) {
        this.editableData[index][key] = value;
    }

    @action clear() {
        this.staticData = [];
        this.editableData = [];
    }
}

export default new AnalyzeRecommendationTreatmentStore()