import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class ConditionDetailStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentCondition = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: '',
        editSeverity: ''
    };

    @action setEditableData(initialData) {
        const {
            name,
            description,
            category,
            severity
        } = initialData;

        this.editableData = {
            editName: name,
            editDescription: description,
            editCategory: category,
            editSeverity: severity
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

    @action loadCondition(conditionId) {
        this.isLoading = true;
        agent.loadCondition(conditionId)
            .then(action((response) => {
                this.currentCondition = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createCondition() {
        this.isLoading = true;
        
        const {
            editName,
            editCategory,
            editDescription,
            editSeverity
        } = this.editableData;

        let newConditionData = {
            name: editName,
            category: editCategory,
            section: 'condition',
            description: editDescription,
            severity: editSeverity
        };

        agent.createCondition(newConditionData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateCondition(conditionId) {
        this.isLoading = true;
        const {
            editName,
            editCategory,
            editDescription,
            editSeverity
        } = this.editableData;
        let updateConditionData = {
            name: editName,
            category: editCategory,
            description: editDescription,
            severity: editSeverity
        };
        
        agent.updateCondition(conditionId, updateConditionData)
            .then(action((response) => {
                this.loadCondition(conditionId);
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }
    
    @action deleteCondition(conditionId) {
        this.isLoading = true;
        agent.deleteCondition(conditionId)
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
        this.currentCondition = {};
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: '',
            editSeverity: ''
        }
    }

}

export default new ConditionDetailStore();