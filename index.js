import UserService from './user_service';
import EventBus from './event_bus';
import axios from 'axios';

export default {
  install: (Vue, parameters) => {
    Vue.prototype.$bus = EventBus;
    if (parameters && parameters.baseURL) {
      UserService.setBaseURL(parameters.baseURL);
    }
    Vue.prototype.$auth = UserService;
    Vue.prototype.$http = axios;
  }
};