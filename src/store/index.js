import Vue from "vue";
import Vuex from "vuex";
import { ZOHO } from "../assets/ZohoEmbededAppSDK.min.js";

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    search_query: "",
    entity: {},
    record: {},
    grid_columns: [
      "name",
      "html_url",
      "watchers_count",
      "stargazers_count",
      "open_issues_count"
    ],
    grid_data: [],
    grid_data_count: 0,
    current_page: 1,
    per_page: 5
  },
  getters: {
    getSearchQuery: state => {
      return state.search_query;
    },
    getEntity: state => {
      return state.entity;
    },
    getRecord: state => {
      return state.record;
    },
    getGridData: state => {
      return state.grid_data;
    },
    getGridColumns: state => {
      return state.grid_columns;
    },
    getGridRowCount: state => {
      return state.grid_data_count;
    },
    getPerPage: state => {
      return state.per_page;
    },
    getCurrentPage: state => {
      return state.current_page;
    }
  },
  mutations: {
    SET_SEARCH_QUERY(state, payload) {
      state.search_query = payload;
    },
    SET_ENTITY(state, payload) {
      state.entity = payload;
    },
    SET_RECORD(state, payload) {
      state.record = payload;
    },
    SET_GRID_DATA(state, payload) {
      state.grid_data = [...payload];
    },
    SET_GRID_ROW_COUNT(state, payload) {
      state.grid_data_count = payload;
    },
    SET_CURRENT_PAGE(state, payload) {
      state.current_page = payload;
    },
    SET_ROWS_PER_PAGE(state, payload) {
      state.per_page = payload;
    }
  },
  actions: {
    async setSearchQuery({ commit }, value) {
      commit("SET_SEARCH_QUERY", value);
    },
    async setEntity({ commit }) {
      /* Fetch the Module Name (Entity) and record id (EntityId) */
      ZOHO.embeddedApp.on("PageLoad", function(data) {
        commit("SET_ENTITY", data);
      });
    },
    async setRecord({ commit, getters }) {
      /* Fetch all the record fields for the related page */
      let e = getters.getEntity;
      return ZOHO.CRM.API.getRecord({ Entity: e.Entity, RecordID: e.EntityId })
        .then(record => {
          commit("SET_RECORD", record.data[0]);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async setGridData({ commit, getters }, un) {
      /*Example tying the external api request to data stored in the CRM Module.
        You must have a field called "Github Username" on the module with a 
        value filled in for this to work. The refresh button will work regardless.

        This also requires a connection setup with Github authorization. 
      */
      let fieldUserName = getters.getRecord["Github_Username"];
      let username = un ? un : fieldUserName ? fieldUserName : "ZohoDevelopers";

      var conn_name = "github"; //must match Zoho Connection "Link Name"
      var req_data = {
        parameters: {
          type: "owner",
          sort: "updated"
        },
        headers: {
          Accept: "application/vnd.github.v3+json"
        },
        method: "GET",
        url: `https://api.github.com/users/${username}/repos`,
        param_type: 1
      };

      return ZOHO.CRM.CONNECTION.invoke(conn_name, req_data)
        .then(response => {
          let data = JSON.parse(response.details.statusMessage);
          commit("SET_GRID_DATA", data);
          commit("SET_GRID_ROW_COUNT", data.length);
        })
        .catch(error => {
          console.log(error);
        });
    },
    async setCurrentPage({ commit }, page) {
      commit("SET_CURRENT_PAGE", page);
    },
    async setRowsPerPage({ commit }, rpp) {
      commit("SET_ROWS_PER_PAGE", rpp);
    }
  }
});
