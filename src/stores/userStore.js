import { observable, action, computed } from 'mobx';

class UserStore {
    @observable loginUser = null;
    @observable isLoggedIn = false;

    @computed get getLoginUser() {
        return this.loginUser;
    }

    @computed get getIsLoggedIn() {
        return this.isLoggedIn;
    }

    setUserToSessionStorage() {
        const user = {
            id: 'Dr.Kim',
            email: 'koreaDoctor@gmail.com'
        }
        sessionStorage.setItem('user', JSON.stringify(user));
    }

    @action setLoginUser() {
        if (sessionStorage.user) {
            let id, email;
            id = JSON.parse(sessionStorage.getItem('user')).id;
            email = JSON.parse(sessionStorage.getItem('user')).email;
            
            this.loginUser = {
                id: id,
                email: email,
            };
            this.isLoggedIn = true;
        } else {
            return null;
        }   
    }

    @action logout() {
        sessionStorage.clear();
        this.clearUser();
    }

    @action clearUser() {
        this.loginUser = null;
        this.isLoggedIn = false;
    }
}

export default new UserStore()