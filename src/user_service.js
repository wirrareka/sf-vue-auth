const axios = require('axios');
const User = require('./user');
const EventBus = require('./event_bus').default;

let instance = null;

class UserService {
  constructor(baseURL) {
    if (!instance) {
      instance = this;
    }
    this._cache = {};
    this.current = null;    
    this.restore();
    return instance;
  }  

  get(user_id, force) {
    if (this._cache[user_id] && !force) {
      return new Promise((resolve, reject) => {
        resolve(this._cache[user_id]);
      });
    } else {
      return axios.get('/user/' + user_id + '.json')
        .then((response) => {
          return new User(response.data.result);
        });
    }
  }

  cache(user) {
    this._cache[user.id] = user;
  }

  cacheAll(users) {
    const self = this;
    users.forEach((user) => {
      self._cache[user.id] = user;
    });
  }

  isLoggedIn() {    
    return this.current && this.token;
  }

  restore() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this.current = new User(JSON.parse(user));
      this.token = token;
      EventBus.$emit('auth:logged_in', this.current);
    }

    if (this.token) {
      axios.defaults.headers.common['Authentication'] = this.token;
    }    
  }

  persist() {
    localStorage.setItem('user', JSON.stringify(this.current.data));
    localStorage.setItem('token', this.token);
  }

  setCurrentUser(user, token) {
    this.current = new User(user);
    this.token = token;
    axios.defaults.headers.common['Authentication'] = this.token;
    this.persist();    
    EventBus.$emit('auth:logged_in', this.current);
  }

  login(email, password) {
    const self = this;
    return axios.post('/auth/login', {
      email: email,
      password: password
    }).then((response) => {
      const result = response.data;
      if (result) {
        self.setCurrentUser(result.user, result.token);
      }      
      return self.current;
    }).catch((error) => {
      EventBus.$emit('auth:login_failure', {});
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');     
    EventBus.$emit('auth:logged_out');    
    console.log('should be logged out');
  }

  static setBaseURL(baseURL) {
    axios.defaults.baseURL = baseURL;
  }
}

const _instance = new UserService();

module.exports = _instance;
