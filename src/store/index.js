import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
import { setToken,getToken } from '../utils/auth'
import getters from './getters'
import { getdoctor } from '../api/doctor'
import { getcalendar } from '../api/calendar'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   doctor:[],
   calendar:[],
   department:[]
  },
  mutations: {
    UPDATE_DOCTOR(state,doctor){
      state.doctor=doctor
    },
    UPDATE_CALENDARS(state,calendar){
      state.calendar = calendar
    },
    UPDATE_DEPARTMENT(state,department){
      state.department = department
    }
  },
  actions: {
    updateDoctor({commit},doctor){
      return new Promise((reslove, reject)=>{
        getdoctor().then(res=>{
          commit('UPDATE_DOCTOR',res.data)
          reslove(res.data)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    updateCalendar({commit},calendar){
      return new Promise((reslove,reject)=>{
        if(calendar!=undefined){
          getcalendar(calendar).then(res=>{
            reslove(res)
          }).catch(err=>{
            reject(err)
          })
        }else{
          getcalendar().then(res=>{
            reslove(res)
          }).catch(err=>{
            reject(err)
          })
        }
        
      })
    },
    updateCalendars({commit,calendar}){
      return new Promise((reslove,reject)=>{
        getcalendar().then(res=>{
          commit('UPDATE_CALENDARS',res.data)
          reslove(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    updatedepartment({commit},department){
      commit('UPDATE_DEPARTMENT',department)
    }
  },
  getters,
  plugins: [createPersistedState()]
})
