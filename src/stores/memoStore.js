import { observable, action } from 'mobx';

class MemoStore {
    @observable editableData = {
        memo: '',
    }

    @action initilize(memoData) {
        this.editableData.memo = memoData;
    }

    @action changeMemo = (memo) => {
        this.editableData['memo'] = memo;
    }

    @action clear() {
        this.editableData = {
            memo: '',
        }
    }

    @action deleteAllInputValue() {
        this.editableData = {
            memo: ''
        };
    }
}

export default new MemoStore()