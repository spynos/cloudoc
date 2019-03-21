import axios from 'axios';
// import commonStore from '../stores/commonStore';
// import errorStore from '../stores/errorStore';
// import errorHelper from './errorHelper';
const API_ROOT = `${process.env.REACT_APP_API_ENDPOINT}`;

class Agent {
    constructor(baseURL = null) {
        this.axios = axios.create({ baseURL });
    }

    /** 
     * 추후 자동으로 basic end points를 생성하는 로직이 필요하다고 여겨질 때 참고
     * https://codeburst.io/how-to-call-api-in-a-smart-way-2ca572c6fe86
     */
    /* APIs */


    // ClouDoc - Case
    loadCases() {
        return this.get(`/cases`);
    }

    loadCase(caseId) {
        return this.get(`/cases/${caseId}`);
    }

    postCase(newCase) {
        return this.post(`/cases`, newCase);
    }

    updateCase(caseId, updatedCase) {
        return this.patch(`/cases/${caseId}`, updatedCase);
    }

    deleteCase(caseId) {
        return this.delete(`/cases/${caseId}`);
    }

    analyzeSymptom(referenceData) {
        return this.post(`/cases/analyzeSymptom`, referenceData);
    }

    analyzeLab(referenceData) {
        return this.post(`/cases/analyzeLab`, referenceData);
    }

    analyzeTreatment(referenceData) {
        return this.post(`/cases/analyzeTreatment`, referenceData);
    }

    addRecordToCase(caseId, newCase) {
        return this.put(`/case/${caseId}`, newCase);
    }

    deleteRecordFromCase(caseId, newCase) {
        return this.put(`/case/${caseId}`, newCase);
    }

    // Cloudoc - Clinical DB
    loadClinicaldbs() {
        return this.get(`/clinicaldb`);
    }

    // Symptom
    loadSymptom(symptomId) {
        return this.get(`/symptoms/${symptomId}`);
    }

    createSymptom(newSymptomData) {
        return this.post(`/symptom`, newSymptomData);
    }

    updateSymptom(symptomId, updateSymptomData) {
        return this.patch(`/symptoms/${symptomId}`, updateSymptomData);
    }

    deleteSymptom(symptomId) {
        return this.delete(`/symptoms/${symptomId}`);
    }

    // Lab
    loadLab(labId) {
        return this.get(`/labs/${labId}`);
    }

    createLab(newLabData) {
        return this.post(`/lab`, newLabData);
    }

    updateLab(labId, updateLabData) {
        return this.patch(`/labs/${labId}`, updateLabData);
    }

    deleteLab(labId) {
        return this.delete(`/labs/${labId}`);
    }

    // Exam
    loadExam(examId) {
        return this.get(`/exams/${examId}`);
    }

    createExam(newExamData) {
        return this.post(`/exams`, newExamData);
    }

    updateExam(examId, updateExamData) {
        return this.patch(`/exams/${examId}`, updateExamData);
    }

    deleteExam(examId) {
        return this.delete(`/exams/${examId}`);
    }

    // Condition
    loadCondition(conditionId) {
        return this.get(`/conditions/${conditionId}`);
    }

    createCondition(newConditionData) {
        return this.post(`/conditions`, newConditionData);
    }

    updateCondition(conditionId, updateConditionData) {
        return this.patch(`/conditions/${conditionId}`, updateConditionData);
    }

    deleteCondition(conditionId) {
        return this.delete(`/conditions/${conditionId}`);
    }

    // Drug
    loadDrug(drugId) {
        return this.get(`/drugs/${drugId}`);
    }

    createDrug(newDrugData) {
        return this.post(`/drugs`, newDrugData);
    }

    updateDrug(drugId, updateDrugData) {
        return this.patch(`/drugs/${drugId}`, updateDrugData);
    }

    deleteDrug(drugId) {
        return this.delete(`/drugs/${drugId}`);
    }

    // Reference
    loadReference(referenceId) {
        return this.get(`/references/${referenceId}`);
    }

    loadReferenceByLink(referenceId) {
        return this.get(`/references/link/${referenceId}`);
    }

    createReference(newReferenceData) {
        return this.post(`/references`, newReferenceData);
    }

    updateReference(referenceId, updateReferenceData) {
        return this.patch(`/references/${referenceId}`, updateReferenceData);
    }

    deleteReference(referenceId) {
        return this.delete(`/references/${referenceId}`);
    }



    // User and Auth ----------------------------------------------------------------------------
    signup(signupInfo) {
        return axios.post(`/${API_ROOT}/users/signup/`, signupInfo).catch(this._handleError);
    }

    login(loginInfo) {
        return axios.post(`/${API_ROOT}/users/login/`, loginInfo).catch(this._handleError);
    }

    logout() {
        return this.delete(`/users/logout/`);
    }

    loadUser() {
        // return this.get(`/users/${commonStore.user_uuid}/`);
    }

    validatePassword(password) {
        return axios.post(`/${API_ROOT}/users/validate_password/`, { password });
    }



    /* Base REST API method */
    get(url) {
        return this.axios
            .get(`/api/v1${url}`, this._getRequestConfig())
            .catch(this._handleError);
    }
    put(url, body) {
        return this.axios
            .put(`/api/v1${url}`, body, this._getRequestConfig())
            .catch(this._handleError);
    }
    patch(url, body) {
        return this.axios
            .patch(`/api/v1${url}`, body, this._getRequestConfig())
            .catch(this._handleError);
    }
    post(url, body) {
        return this.axios
            .post(`/api/v1${url}`, body, this._getRequestConfig())
            .catch(this._handleError);
    }
    delete(url) {
        return this.axios
            .delete(`/api/v1${url}`, this._getRequestConfig())
            .catch(this._handleError);
    }
    _getRequestConfig() {
        let requestConfig = null;
        // let accessToken = null;
        if (true) {
            requestConfig = { 
                baseURL: API_ROOT,
                // headers: { 'Authorization': `Bearer ${accessToken}` }
            };
        }
        return requestConfig;
    }


    _handleError(error) {
        if (!error.response) {
            // 서버 꺼져있을때 에러 핸들링
            throw error;
        }
        // errorHelper.handleErrorCode(error.response);
        console.log('handle error : ', error.response);
        // errorStore.setErrorInfo(error.response.data);
        // 로그아웃을 해야할 에러일때 처리.
        // if (error && error.response && error.response.status === 401) {
        //   authStore.logout();
        // }
        throw error;
    }
}

const agent = new Agent(API_ROOT);

export default agent;
