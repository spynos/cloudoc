import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class DrugDetailStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentDrug = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: '',
        editReference: '',
        editCaution: '',
        editGuide: '',
        editLifestyle: ''
    };
    @observable editableDataForHerb = [];

    @action setEditableDataForHerb(initialDatas) {
        initialDatas.forEach((initialData) => { this.editableDataForHerb.push(initialData) });
    }

    @action handleChangeForHerb(index, key, value) {
        this.editableDataForHerb[index][key] = value;
    }

    @action addHerb() {
        this.editableDataForHerb = [...this.editableDataForHerb, {
            herbName: '',
            dose: ''
        }];
    }

    @action deleteHerb(selectedIndex) {
        this.editableDataForHerb.splice(selectedIndex, 1);
    }

    @action setEditableData(initialData) {
        const {
            name,
            description,
            category,
            reference,
            caution,
            guide,
            lifestyle
        } = initialData;

        this.editableData = {
            editName: name,
            editDescription: description,
            editCategory: category,
            editReference: reference,
            editCaution: caution,
            editGuide: guide,
            editLifestyle: lifestyle
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

    @action loadDrug(drugId) {
        this.isLoading = true;
        agent.loadDrug(drugId)
            .then(action((response) => {
                this.currentDrug = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createDrug() {
        this.isLoading = true;
        
        const {
            editName,
            editCategory,
            editDescription,
            editReference,
            editCaution,
            editGuide,
            editLifestyle
        } = this.editableData;

        let newDrugData = {
            name: editName,
            category: editCategory,
            section: 'drug',
            description: editDescription,
            reference: editReference,
            caution: editCaution,
            guide: editGuide,
            lifestyle: editLifestyle
        };

        let formula = this.editableDataForHerb;

        newDrugData = {...newDrugData, formula};

        agent.createDrug(newDrugData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateDrug(drugId) {
        this.isLoading = true;
        const {
            editName,
            editCategory,
            editDescription,
            editReference,
            editCaution,
            editGuide,
            editLifestyle
        } = this.editableData;

        let updateDrugData = {
            name: editName,
            category: editCategory,
            description: editDescription,
            reference: editReference,
            caution: editCaution,
            guide: editGuide,
            lifestyle: editLifestyle
        };

        let formula = this.editableDataForHerb;

        updateDrugData = {...updateDrugData, formula};
        
        agent.updateDrug(drugId, updateDrugData)
            .then(action((response) => {
                this.loadDrug(drugId);
                this.clearEditableDataForHerb();
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
        
    }

    @action deleteDrug(drugId) {
        this.isLoading = true;
        agent.deleteDrug(drugId)
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
        this.currentDrug = {};
        this.editableDataForHerb = [];
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
        this.editableDataForHerb = [];
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

    @action clearEditableDataForHerb() {
        this.editableDataForHerb = [];
    }

}

export default new DrugDetailStore();