<template>
  <table class="select-date">
    <thead>
      <tr class="weekHeader">
        <td v-for="header in weekHeader" track-by="$index">{{ header }}</td>
      </tr>
    </thead>

    <tbody :class="{
      'date-left'  : dateTransitionType == 'left',
      'date-right' : dateTransitionType == 'right'}">

      <tr v-for="week in calendar" transition="date">
        <td v-for="day in week"
          @click="selectDate(day.date)"
          :class="{'today'    : day.is_today,
          'disabled'          : day.is_disabled,
          'selected'          : isSelected(day.date),
          'not-current-month' : !day.this_month}">{{ day.day }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
module.exports = {
  name : 'pick-date',
  props : ['selectedDate', 'minDate', 'maxDate','current'],

  data () {
    return {
      dateTransitionType : false,
      weekMask           : [0, 1, 2, 3, 4, 5, 6],
      weekHeader         : ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    }
  },

  watch : {
    current (newVal, oldVal) {
      this.dateTransitionType = newVal > oldVal ? 'right' : 'left';
    }
  },

  computed : {
    calendar () {
      return this.updateCalendar();
    }
  },

  methods: {

    /**
     * [生成 7*6 日期信息]
     */
    updateCalendar () {
      let current     = new Date(this.current),
          now         = new Date(),
          beginDay    = this.firstDayOfMonth(current),
          week        = [],
          calendar    = [];

      //获取当月第一天 是 星期几
      let dayMask = this.weekMask.indexOf(beginDay.getDay())

      beginDay.setDate(beginDay.getDate() - dayMask)

      //填充一个月时间
      for (let nbWeek = 0; nbWeek < 6; nbWeek++) {

        week = []

        for (let nbDays = 0; nbDays < 7; nbDays++) {
          week.push({
            day         : beginDay.getDate(),
            this_month  : current.getMonth() === beginDay.getMonth(),
            is_today    : beginDay.toDateString() == now.toDateString(),
            is_disabled : !this.checkIsEnabled(beginDay),
            date        : new Date(beginDay)
          });

          //天数步进
          beginDay.setDate(beginDay.getDate() + 1)
        }

        calendar.push(week)
      }

      return calendar
    },

    selectDate(date) {
      if (this.checkIsEnabled(date)) {
        this.dateTransitionType =false
        this.selectedDate = date
      }
    },

    checkIsEnabled (date) {
      let minDate =  new Date(this.minDate),
          maxDate = new Date(this.maxDate);

      return (() => {
        return date >= minDate && date <= maxDate
      })()
    },

    isSelected (date) {
      return date.toDateString() === this.selectedDate.toDateString()
    },

    firstDayOfMonth (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1)
    }
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';
.select-date {
  width: inherit;
  border-collapse: collapse;
  border-spacing: 0;
  color: $defaultColorPrimary;
  width: 300px;
  margin: 0 auto;
  text-align: center;
  .weekHeader {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
    font-size: 12px;
  }
  tbody {
    display: block;
    width: inherit;
    margin-top: 10px;
    tr {
      display: flex;
      justify-content: space-around;
      .not-current-month {
        color: #a7b2bd;
        opacity: 0;
        height: 0;
        cursor: default;
      }
      td {
        width: 36px;
        height: 36px;
        margin: 2px 0;
        display: inline-block;
        line-height: 36px;
        border-radius: 50%;
        font-size: 12px;
        cursor: pointer;
        &.disabled {
          color: $defaultColorDisabled;
          cursor: default;
        }
        &.today {
          color: $activeColor;
          font-weight: bold;
        }
        &.selected {
          background: $activeColor;
          color: #fff;
        }
        &:not(.selected):not(.disabled):hover {
          color: #fff;
          position: relative;
          z-index: 1;
        }
        &:not(.selected):not(.disabled):hover::after {
          content: '';
          display: block;
          animation: dateBackground .3s;
          position: absolute;
          background: rgba(#009688, .7);
          width: 36px;
          height: 36px;
          transform: translate3d(0, 0, 0);
          border-radius: 50%;
          z-index: -1;
          top: 0;
        }
      }
    }
  }
}

// -------------------------------------
//   Animation
// -------------------------------------
.date-right,
.date-left {
  overflow: hidden;
}

.date-right {
  .date-enter {
    animation: dateRight .5s;
  }
}

.date-left {
  .date-enter {
    animation: dateLeft .5s;
  }
}

@-webkit-keyframes dateLeft {
  0% {
    -webkit-transform: translateX(-40px)
  }
  100% {
    -webkit-transform: translateX(0)
  }
}

@-webkit-keyframes dateBackground {
  0% {
    transform: scale(.2)
  }
  100% {
    transform: scale(1)
  }
}

@-webkit-keyframes dateRight {
  0% {
    -webkit-transform: translateX(40px)
  }
  100% {
    -webkit-transform: translateX(0)
  }
}
</style>
