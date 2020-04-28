<template>
  <b-container id="grid" fluid>
    <b-form id="search">
      <b-row class="mt-1 mb-1" align-v="center" align-h="start">
        <b-col cols="3">
          <b-form-input
            id="query"
            v-model="searchQuery"
            type="text"
            placeholder="Search for term..."
          ></b-form-input>
        </b-col>
        <b-col cols="6" class="text-center">
          <b-button
            size="med"
            variant="primary"
            v-on:click.prevent="refreshData"
            >Refresh</b-button
          >
        </b-col>
        <b-col cols="3" class="text-right">
          <b-form-select
            class="per-page-dropdown"
            sm
            v-model="perPage"
            :options="options"
          >
          </b-form-select>
          <span> rows per page</span>
        </b-col>
      </b-row>
    </b-form>
    <b-table
      id="grid-table"
      small
      hover
      :items="getGridData"
      :fields="getGridColumns"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="searchQuery"
      :filter-included-fields="getGridColumns"
    ></b-table>
    <b-row>
      <b-col>
        <b-button
          size="sm"
          variant="outline-info"
          pill
          v-b-tooltip.hover
          :title="prettyEntity"
          >Entity</b-button
        >
        <b-button
          size="sm"
          variant="outline-info"
          pill
          v-b-tooltip.hover
          :title="prettyRecord"
          >Record</b-button
        >
      </b-col>
      <b-col>
        <b-pagination
          aria-controls="grid-table"
          v-model="currentPage"
          :total-rows="getGridRowCount"
          :per-page="perPage"
          align="right"
          last-number
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import "../assets/ZohoEmbededAppSDK.min.js";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GridView",
  template: "#grid-template",
  data: function() {
    return {
      options: [5, 10, 25, 50]
    };
  },
  computed: {
    ...mapGetters([
      "getSearchQuery",
      "getGridData",
      "getGridColumns",
      "getEntity",
      "getRecord",
      "getGridRowCount",
      "getPerPage",
      "getCurrentPage"
    ]),
    //need get/set for any 2-way Computed properties
    searchQuery: {
      get() {
        return this.getSearchQuery;
      },
      set(value) {
        this.$store.dispatch("setSearchQuery", value);
      }
    },
    perPage: {
      get() {
        return this.getPerPage;
      },
      set(value) {
        this.$store.dispatch("setRowsPerPage", value);
      }
    },
    currentPage: {
      get() {
        return this.getCurrentPage;
      },
      set(value) {
        this.$store.dispatch("setCurrentPage", value);
      }
    },
    rowsPerPage: function() {
      return this.options;
    },
    prettyEntity: function() {
      return JSON.stringify(this.getEntity, null, 2);
    },
    prettyRecord: function() {
      return JSON.stringify(this.getRecord, null, 2);
    }
  },
  watch: {
    getEntity() {
      this.$store.dispatch("setRecord");
    },
    getRecord() {
      this.$store.dispatch("setGridData");
    }
  },
  methods: {
    ...mapActions(["setRecord", "setGridData", "setRowsPerPage"]),
    refreshData: function() {
      this.setGridData("ZohoDevelopers");
    }
  }
};
</script>

<style scoped>
.per-page-dropdown {
  width: fit-content;
}
</style>
