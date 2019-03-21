import commonStore from './commonStore';
import authStore from './authStore';
import userStore from './userStore';
import caseStore from './caseStore';
import symptomStore from './symptomStore';
import examinationStore from './examinationStore';
import bloodTestStore from './bloodTestStore';
import analyzeSymptomStore from './analyzeSymptomStore';
import analyzeBloodTestStore from './analyzeBloodTestStore';
import diagnosisStore from './diagnosisStore';
import analyzeRecommendationTreatmentStore from './analyzeRecommendationTreatmentStore';
import treatmentStore from './treatmentStore';
import memoStore from './memoStore';
import patientInfoStore from './patientInfoStore';
import clinicaldbStore from './clinicaldbStore';
import searchBarStore from './searchBarStore';
import symptomDetailStore from './clinicaldbDetail/symptomDetailStore';
import bloodTestDetailStore from './clinicaldbDetail/bloodTestDetailStore';
import examDetailStore from './clinicaldbDetail/examDetailStore';
import conditionDetailStore from './clinicaldbDetail/conditionDetailStore';
import drugDetailStore from './clinicaldbDetail/drugDetailStore';
import referenceDetailStore from './clinicaldbDetail/referenceDetailStore';
import clinicalCreateStore from './clinicalCreateStore';

const stores = {
    commonStore,
    authStore,
    userStore,
    caseStore,
    symptomStore,
    examinationStore,
    bloodTestStore,
    analyzeSymptomStore,
    analyzeBloodTestStore,
    diagnosisStore,
    analyzeRecommendationTreatmentStore,
    treatmentStore,
    memoStore,
    patientInfoStore,
    clinicaldbStore,
    searchBarStore,
    symptomDetailStore,
    bloodTestDetailStore,
    examDetailStore,
    conditionDetailStore,
    drugDetailStore,
    referenceDetailStore,
    clinicalCreateStore
}
export default stores;