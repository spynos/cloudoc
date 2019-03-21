import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class BloodTestDetailStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentLab = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: '',
        editUnit: '',
        editSex: '',
        editRefMin: '',
        editRefMax: '',
        editOptMin: '',
        editOptMax: ''
    };

    @action setEditableData(initialData) {
        const {
            name,
            description,
            category,
            unit,
            sex,
            refMin,
            refMax,
            optMin,
            optMax
        } = initialData;

        this.editableData = {
            editName: name,
            editDescription: description,
            editCategory: category,
            editUnit: unit,
            editSex: sex,
            editRefMin: refMin,
            editRefMax: refMax,
            editOptMin: optMin,
            editOptMax: optMax
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

    @action loadLab(labId) {
        this.isLoading = true;
        agent.loadLab(labId)
            .then(action((response) => {
                this.currentLab = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createLab() {
        this.isLoading = true;
        
        const {
            editName,
            editCategory,
            editDescription,
            editUnit,
            editSex,
            editRefMin,
            editRefMax,
            editOptMin,
            editOptMax
        } = this.editableData;

        let newLabData = {
            name: editName,
            category: editCategory,
            description: editDescription,
            unit: editUnit,
            sex: editSex,
            refMin: Number(editRefMin),
            refMax: Number(editRefMax),
            optMin: Number(editOptMin),
            optMax: Number(editOptMax)
        };

        agent.createLab(newLabData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateLab(labId) {
        this.isLoading = true;
        const {
            editName,
            editCategory,
            editDescription,
            editUnit,
            editSex,
            editRefMin,
            editRefMax,
            editOptMin,
            editOptMax
        } = this.editableData;
        let updateLabData = {
            name: editName,
            category: editCategory,
            section: 'lab',
            description: editDescription,
            unit: editUnit,
            sex: editSex,
            refMin: editRefMin,
            refMax: editRefMax,
            optMin: editOptMin,
            optMax: editOptMax
        };
        
        agent.updateLab(labId, updateLabData)
            .then(action((response) => {
                this.loadLab(labId);
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
        
    }

    @action deleteLab(labId) {
        this.isLoading = true;
        agent.deleteLab(labId)
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
        this.currentLab = {};
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: '',
            editUnit: '',
            editSex: '',
            editRefMin: '',
            editRefMax: '',
            editOptMin: '',
            editOptMax: ''
        }
    }

}

export default new BloodTestDetailStore();