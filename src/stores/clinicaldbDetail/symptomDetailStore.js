import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class SymptomDetail {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentSymptom = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: ''
    };

    @action setEditableData(initialData) {
        const {
            name,
            description,
            category
        } = initialData;

        this.editableData = {
            editName: name,
            editDescription: description,
            editCategory: category
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

    @action loadSymptom(symptomId) {
        this.isLoading = true;
        agent.loadSymptom(symptomId)
            .then(action((response) => {
                this.currentSymptom = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createSymptom() {
        this.isLoading = true;
        
        const {
            editName,
            editCategory,
            editDescription
        } = this.editableData;

        let newSymptomData = {
            name: editName,
            category: editCategory,
            section: 'symptom',
            description: editDescription
        };

        agent.createSymptom(newSymptomData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateSymptom(symptomId) {
        this.isLoading = true;
        const {
            editName,
            editCategory,
            editDescription
        } = this.editableData;
        let updateSymptomData = {
            name: editName,
            category: editCategory,
            description: editDescription
        };
        
        agent.updateSymptom(symptomId, updateSymptomData)
            .then(action((response) => {
                this.loadSymptom(symptomId);
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action deleteSymptom(symptomId) {
        this.isLoading = true;
        agent.deleteSymptom(symptomId)
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
        this.currentSymptom = {};
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: ''
        }
    }

}

export default new SymptomDetail();