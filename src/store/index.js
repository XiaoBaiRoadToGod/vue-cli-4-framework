import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )
// 自动注册模块
const files = require.context( './modules', false, /\.js$/ )
const modules = {}

files.keys().forEach( key => {
  modules[key.replace( /(\.\/|\.js)/g, '' )] = files( key ).default
} )

export default new Vuex.Store( {
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules
} )
