import { observable, action } from 'mobx';

class TreatmentStore {
    @observable isLoading = false;
    @observable staticData = [];
    @observable editableData = [];
    @observable editableDataForTreatment = {
        drugName: '',
        guide: '',
        caution: '',
        lifestyle: ''
    }

    @action initilize(treatmentData) {
        const {
            drugName,
            guide,
            caution,
            lifestyle
        } = treatmentData;

        this.editableDataForTreatment.drugName = drugName;
        this.editableDataForTreatment.guide = guide;
        this.editableDataForTreatment.caution = caution;
        this.editableDataForTreatment.lifestyle = lifestyle;
    }

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });
    }

    @action handleChange(index, key, value) {
        this.editableData[index][key] = value;
    }

    @action addTreatment() {
        this.editableData = [...this.editableData, {
            herbName: '',
            dose: ''
        }];
    }

    @action deleteTreatment(selectedIndex) {
        this.editableData.splice(selectedIndex, 1);
    }

    @action clear() {
        this.staticData = [];
        this.editableData = [];
        this.editableDataForTreatment = {
            drugName: '',
            guide: '',
            caution: '',
            lifestyle: ''
        }
    }

    @action deleteAllInputValue() {
        this.editableData = [];
        this.editableDataForTreatment = {
            drugName: '',
            guide: '',
            caution: '',
            lifestyle: ''
        }
    }
}

export default new TreatmentStore()