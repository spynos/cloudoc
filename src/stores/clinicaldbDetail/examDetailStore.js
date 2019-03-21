import { observable, action } from "mobx";
import agent from "../../util/agent";
import clinicaldbStore from '../clinicaldbStore';

class ExamDetailStore {
    @observable isLoading = false;
    @observable isEditing = false;
    @observable currentExam = {};
    @observable editableData = {
        editName: '',
        editDescription: '',
        editCategory: '',
        editUnit: '',
        editSex: '',
        editRefMin: "",
        editRefMax: "",
        editOptMin: "",
        editOptMax: ""
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

    @action loadExam(examId) {
        this.isLoading = true;
        agent.loadExam(examId)
            .then(action((response) => {
                this.currentExam = response.data;
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action createExam() {
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

        let newExamData = {
            name: editName,
            category: editCategory,
            section: 'exam',
            description: editDescription,
            unit: editUnit,
            sex: editSex,
            refMin: Number(editRefMin),
            refMax: Number(editRefMax),
            optMin: Number(editOptMin),
            optMax: Number(editOptMax)
        };

        agent.createExam(newExamData)
            .then(action((response) => {
                clinicaldbStore.loadClinicaldbs();
                this.isLoading = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
    }

    @action updateExam(examId) {
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
        let updateExamData = {
            name: editName,
            category: editCategory,
            description: editDescription,
            unit: editUnit,
            sex: editSex,
            refMin: editRefMin,
            refMax: editRefMax,
            optMin: editOptMin,
            optMax: editOptMax
        };
        
        agent.updateExam(examId, updateExamData)
            .then(action((response) => {
                this.loadExam(examId);
                this.isLoading = false;
                this.isEditing = false;
            }))
            .catch(action((error) => {
                this.isLoading = false;
                throw error;
            }));
        
    }

    @action deleteExam(examId) {
        this.isLoading = true;
        agent.deleteExam(examId)
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
        this.currentExam = {};
        this.editableData = {
            editName: '',
            editDescription: '',
            editCategory: '',
            editUnit: '',
            editSex: '',
            editRefMin: "",
            editRefMax: "",
            editOptMin: "",
            editOptMax: ""
        }
    }

}

export default new ExamDetailStore();