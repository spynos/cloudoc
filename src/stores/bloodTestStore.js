import { observable, action, computed } from 'mobx';
import items from '../constant/bloodTestItem';

class BloodTestStore {
    @observable staticData = [];
    @observable editableData = [];
    @observable stateData = [];

    @computed get JSONeditableData() {
        const editableData = JSON.parse(JSON.stringify(this.editableData));
        return editableData;
    }

    @action setEditableData(editableData) {
        editableData.forEach((editableData) => { this.editableData.push(editableData) });
    }

    @action setState(index, state) {
        this.stateData[index] = state;
    }

    @action pushEditableData(data) {
        this.editableData.push(data);
    }

    @action handleChange(index, key, value = "") {
        this.editableData[index][key] = value;
    }

    @action getState(index, refMin, refMax, optMin, optMax, value) {
        let state;

        if (value === '' || value === 0 || value === null) {
            state = '-';
            this.setState(index, state);
            return state;
        }
        else if (value === refMin && value === optMin) {
            state = '최적'
            this.setState(index, state);
            return state;
        }
        else if (value === refMax && value === optMax) {
            state = '최적'
            this.setState(index, state);
            return state;
        }
        else if (refMin <= value && value < optMin) {
            state = '낮음';
            this.setState(index, state);
            return state;
        }
        else if (optMin <= value && value <= optMax) {
            state = '최적';
            this.setState(index, state);
            return state;
        }
        else if (optMax <= value && value <= refMax) {
            state = '높음';
            this.setState(index, state);
            return state;
        }
        else if (value < refMin) {
            state = '매우 낮음';
            this.setState(index, state);
            return state;
        }
        else if (refMax < value) {
            state = '매우 높음';
            this.setState(index, state);
            return state;
        }
    }

    @action clear() {
        this.staticData = [];
        this.editableData = [];
        this.stateData = [];
    }

    @action deleteAllInputValue() {
        items.forEach((item, i) => {
            this.editableData[i]['value'] = ''
        })
        this.stateData = [];
    }
}

export default new BloodTestStore()