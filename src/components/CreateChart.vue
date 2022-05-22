<template>
  <div class="app-create-chart">
    <b-button v-b-modal.modal-form>Создать график</b-button>

    <b-modal id="modal-form">'
      <template #modal-header>
        Создать график
      </template>
      <template #default>
        <b-form>
          <b-form-group label="Тип графика:">
            <b-form-select id="select-type" v-model="selectedType" :options="optionsType" @change="onSelectedTypeChanged"></b-form-select>
          </b-form-group>
          <b-form-group label="Источник данных:">
            <b-form-select id="select-src" v-model="selectedSrc" :options="dataSource"></b-form-select>
          </b-form-group>
        </b-form>
      </template>
      <template #modal-footer>
        <b-button variant="cancel" @click="$bvModal.hide('modal-form')">
          Close
        </b-button>
        <b-button variant="success" @click="onSelectedSrcChanged" :disabled="!selectedSrc">
          OK
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
  import { chartTypes } from '../chart-types.js';
  console.log('chartTypes', chartTypes);

  export default {
    name: 'CreateChartComponent',
    data() {
      return {
        selectedType: chartTypes.pie,
        optionsType: [
          {
            value: chartTypes.pie,
            text: 'Пирог'
          },
          {
            value: chartTypes.line,
            text: 'Линейный'
          },
        ],
        selectedSrc: '',
        optionsSrc: [
          {
            text: 'Source Pie 1',
            type: chartTypes.pie,
            value: 'https://run.mocky.io/v3/2699115b-8ced-40c3-8072-b7fa9faf6047'
          },
          {
            text: 'Source Linear 1',
            type: chartTypes.line,
            value: 'https://run.mocky.io/v3/92a0a266-0321-4ff5-9993-b394d03ceee2'
          },
        ],
      }
    },
    computed: {
      dataSource() {
        return this.optionsSrc.filter(x => x.type === this.selectedType);
      }
    },
    methods:{
      onSelectedTypeChanged() {
        this.selectedSrc = '';
      },
      onSelectedSrcChanged(){
        this.$bvModal.hide('modal-form');
        this.$emit('selected', {type: this.selectedType, source: this.selectedSrc});
        this.selectedSrc = '';
        this.selectedType = chartTypes.pie;
      }
    }
  }
</script>
