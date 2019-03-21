import { observable, action } from 'mobx';

class PatientInfoStore {
    @observable editableData = {
        chart_id: '',
        gender: '',
        age: '',
        pastHistory: '',
        familyHistory: '',
        socialHistory: '',
        memo: ''
    }

    @action initialize(patientInfoData) {
        const {
            chart_id,
            gender,
            age,
            pastHistory,
            familyHistory,
            socialHistory,
            memo
        } = patientInfoData;

        this.editableData.chart_id = chart_id;
        this.editableData.gender = gender;
        this.editableData.age = age;
        this.editableData.pastHistory = pastHistory;
        this.editableData.familyHistory = familyHistory;
        this.editableData.socialHistory = socialHistory;
        this.editableData.memo = memo;
    }

    @action changeEditableData = (type, value) => {
        this.editableData[type] = value;
    }

    @action clear() {
        this.editableData = {
            chart_id: '',
            gender: '',
            age: '',
            pastHistory: '',
            familyHistory: '',
            socialHistory: '',
            memo: ''
        }
    }

    @action deleteAllInputValue() {
        this.editableData = {
            age: '',
            pastHistory: '',
            familyHistory: '',
            socialHistory: '',
            memo: ''
        }
    }
}

export default new PatientInfoStore()