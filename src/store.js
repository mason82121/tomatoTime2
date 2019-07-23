import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playMode: 'work', // work 工作, break 休息
    isStart: false,
    playing: false,
    playingTime: 0,
    modeTime: {
      work: 1500,
      break: 300
    },
    todos: [{
      id: 1562918030517,
      title: 'the First thing to do today',
      isCompleted: false,
      doTimes: 3,
      remark: ''
    }, {
      id: 1562918049596,
      title: 'the second thing to do today',
      isCompleted: false,
      doTimes: 5,
      remark: ''
    }, {
      id: 1562918051424,
      title: 'the third thing to do today',
      isCompleted: false,
      doTimes: 3,
      remark: ''
    }, {
      id: 1562918068435,
      title: 'the forth thing to do today',
      isCompleted: true,
      doTimes: 4,
      remark: ''
    }, {
      id: 1562918077667,
      title: 'the five thing to do today',
      isCompleted: false,
      doTimes: 4,
      remark: ''
    }],
    nowTodoID: 1562918030517,
    dashValue: '',
    ring: {
      work: 'default',
      break: 'alert'
    }
  },
  mutations: {
    onChangeWorkRing(state, { value }) {
      state.ring.work = value;
    },
    onChangeBreakRing(state, { value }) {
      state.ring.break = value;
    },
    addTimesInMession(state) {
      if (state.playMode === 'work') {
        state.todos.forEach(todo => {
          if (todo.id === state.nowTodoID) todo.doTimes += 1;
          state.dashValue = '0%';
        });
      }
    },
    onChangeDashValue(state, { value }) {
      state.dashValue = value;
    },
    switchPlayMode(state) {
      if (state.playing === true) return;
      if (state.isStart === true) return;
      state.playMode = state.playMode === 'break' ? 'work' : 'break';
    },
    setPlayMode(state, { value }) {
      state.playMode = value;
    },
    togglePlaying(state, { value }) {
      state.playing = value;
    },
    toggleStarted(state, { value }) {
      state.isStart = value;
    },
    setPlayingTime(state, { value }) {
      state.playingTime = value;
    },
    countDownPlayingTime(state) {
      state.playingTime = state.playingTime - 1;
    },
    addTodoItem(state, { title }) {
      state.todos.push({
        id: new Date().valueOf(),
        title: title,
        isCompleted: false,
        doTimes: 0,
        remark: ''
      });
    },
    toggleItemCompleted(state, { id }) {
      state.todos.forEach(todo => {
        if (todo.id === id) todo.isCompleted = !todo.isCompleted;
      });
    },
    deleteTodoItemById(state, { id }) {
      state.todos = state.todos.filter(todo => todo.id !== id);
    },
    editTodoItemById(state, { id, text }) {
      state.todos.forEach(todo => {
        if (todo.id === id) todo.title = text;
      });
    },
    onChangeNowMession(state, { id }) {
      state.nowTodoID = id;
    }
  },
  actions: {

  }
});
