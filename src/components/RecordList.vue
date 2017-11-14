<template>
  <div>
    <ae-filter-list>
      <ae-filter-item
        v-for="s in Object.keys(sorts)"
        :key="s"
        :active="currentSort === s"
        :to="{ name: 'record-list', params: { sort: s } }"
      >
        {{s}}
      </ae-filter-item>
    </ae-filter-list>

    <record-list-item
      v-for="record in records"
      :key="record.id"
      :record="record"
    />
  </div>
</template>

<script>
  import { AeFilterList, AeFilterItem } from '@aeternity/aepp-components';
  import RecordListItem from './RecordListItem';

  export default {
    components: { AeFilterList, AeFilterItem, RecordListItem },
    data() {
      return {
        sorts: {
          newest: (a, b) => b.createdAt - a.createdAt,
          'highest revenue': (a, b) => b.revenue - a.revenue,
          'most supporters': (a, b) => b.supporters - a.supporters,
        },
      };
    },
    computed: {
      currentSort() {
        return this.$route.params.sort || Object.keys(this.sorts)[0];
      },
      records() {
        const records = this.$store.state.wall.records;
        return Object.keys(records).map(id => ({ ...records[id], id }))
          .sort(this.sorts[this.currentSort]);
      },
    },
  };
</script>
