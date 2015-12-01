<template>
  <div class="demo">

    <input v-model="selectedDate" @focus="toggleShow" class="form-control">

    <date-picker v-if="datePickerShow" max-date="2016-01-20" min-date="2015-11-15" :date-picker-show.sync="datePickerShow" :selected-date-props.sync="selectedDate"></date-picker>

  </div>
</template>

<script>
module.exports = {
  el(){
    return '#app'
  },
  data(){
    return{
      selectedDate   : '2015-12-02',
      datePickerShow : false
    }
  },
  methods:{
    toggleShow(){
      this.datePickerShow = !this.datePickerShow
    },
  },
  components: {
    'date-picker': require('./components/datePicker/datePicker.vue')
  }
}
</script>

<style lang="scss" scoped>
  h2{
      color: blue;
  }
</style>
