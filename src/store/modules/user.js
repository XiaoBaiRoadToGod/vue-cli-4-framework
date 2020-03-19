import user from '@apis/user'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken ( state, data ) {
      state.token = data
    }
  },
  actions: {
    login ( { commit, state }, data ) {
      return new Promise( ( resolve, reject ) => {
        if ( data ) {
          console.log( data )
          commit( 'setToken', data )
          resolve( state )
        } else {
          reject()
        }
      } )
    },
    getUserInfo ( { commit }, par ) {
      return new Promise( ( resolve, reject ) => {
        try {
          const res = user.getUserInfo( par )
          resolve( res )
        } catch ( e ) {
          reject( e )
        }
      } )
    }
  },
  getters: {
    token ( state ) {
      return state.token
    }
  }
}
