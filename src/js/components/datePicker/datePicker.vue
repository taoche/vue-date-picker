<template>
  <div class="date-picker" v-if="show" transition="date">

    <div class="date-picker-wrapper">
      <div class="date-picker-container">

        <!-- DatePick header -->
        <date-header
          :change-select-type.sync="toSelectYear"
          :selected-info="selectedInfo"></date-header>

        <!-- DatePick main select month and date -->
        <div class="main" v-if="!toSelectYear">
          <pick-month
          :min-date="minDate"
          :max-date="maxDate"
          :current-info.sync="currentInfo"
          :current.sync="currentDate"></pick-month>

          <pick-date
            :min-date="minDate"
            :max-date="maxDate"
            :current.sync="currentDate"
            :selected-date.sync="selectedDate"></pick-date>
        </div>

        <!--  select year -->
        <pick-year
          v-if="toSelectYear"
          :year-arr="yearArr"
          :current.sync="currentDate"
          :selected-date.sync="selectedDate"></pick-year>

        <!-- DatePick footer -->
        <date-footer> </date-footer>
      </div>
    <div>
  </div>
</template>

<script>
module.exports = {
  props: {
    selectedDateProps: {
      type: Date | String
    },

    minDate: {
      type: String,
      default () {
        return '1900-01-01'
      }
    },

    maxDate: {
      type: String,
      default () {
        return '2115-01-01'
      }
    },
    show : {
      type:Boolean,
      required: true
    }
  },

  data() {
    return {
      selectedDate : !(this.selectedDateProps instanceof Date) ? new Date(this.selectedDateProps):this.selectedDateProps,
      currentDate  : new Date(),
      toSelectYear : false
    }
  },

  computed: {

    selectedYear(){
      return new Date(this.selectedDate).getFullYear()
    },

    selectedInfo() {
      let dateArr = new Date(this.selectedDate).toDateString().split(' ');

      return {
        day   : dateArr[0],
        month : dateArr[1],
        date  : dateArr[2],
        year  : dateArr[3]
      }
    },

    currentInfo() {
      return {
        monthName : this.getMonthName(this.currentDate.getMonth()),
        year      : this.currentDate.getFullYear()
      }
    },

    yearArr() {
      return this.getYearArr()
    }
  },

  events:{
    'date-picker-hide':function(){
      this.show = false;
    },

    'date-picker-sure':function(){
      this.selectedDateProps = this.dateFormat(this.selectedDate);
      this.show = false
    }
  },

  methods: {

    firstDayOfMonth(date) {
      if (!(date instanceof Date)) date = new Date(date);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    getYearArr(){
      let miniYear = new Date(this.minDate).getFullYear(),
          maxYear  = new Date(this.maxDate).getFullYear();

      let yearArr = [];

      for (var i = 0, len = maxYear - miniYear + 1; i < len; i++) {
        yearArr.push(miniYear + i)
      }

      return yearArr;
    },

    dateFormat(date) {
      return new Date(date).toLocaleDateString().split('/').map(function(item){
        if(item < 10){
          item  = '0' + item
        }
        return item;
      }).join('-')
    },

    getMonthName(month) {
      var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];

      return monthNames[month];
    }
  },

  components: {
    'date-header' : require('./components/header.vue'),
    'date-footer' : require('./components/footer.vue'),
    'pick-month'  : require('./components/pickMonth.vue'),
    'pick-date'   : require('./components/pickDate.vue'),
    'pick-year'   : require('./components/pickYear.vue')
  }
}
</script>

<style lang="scss">

@import '../../../styles/normalize.scss';

.date-picker {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;

  .date-picker-wrapper {
    display: table-cell;
    vertical-align: middle;

    .date-picker-container {
      margin: 0 auto;
      z-index: 999;
      width: 320px;
      outline: none;
      text-align: center;
      background: white;
      -webkit-touch-callout: none;
      user-select: none;
      //font-smoothing: antialiased;
      transition: all .3s ease;
      box-shadow: 0 14px 45px rgba(0, 0, 0, 0.25), 0 10px 18px rgba(0, 0, 0, 0.22);
      border-radius: 2px;
    }
  }

  &.date-enter,
  &.date-leave {
    opacity: 0;

    .date-picker-container {
      transform: scale(1.1);
    }
  }
}
</style>
