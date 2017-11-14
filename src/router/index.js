import Vue from 'vue';
import Router from 'vue-router';
import RecordList from '../components/RecordList';
import RecordDetail from '../components/RecordDetail';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/record/:id', name: 'record', component: RecordDetail, props: true },
    { path: '/:sort?', name: 'record-list', component: RecordList, props: true },
  ],
});
