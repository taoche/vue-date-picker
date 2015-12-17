<template>
  <div class="select-month">
    <span class="arrow arrow-left"
      @click="prevMonth"
      :class="{disabled: disableControl('prevMonth')}"></span>

    <span class="date">{{currentInfo.monthName}}  {{currentInfo.year}}</span>

    <span class="arrow arrow-right"
      @click="nextMonth"
      :class="{disabled: disableControl('nextMonth')}"></span>
  </div>
</template>

<script>
module.exports = {
  name: 'pick-month',
  props: ['currentInfo', 'minDate', 'maxDate','current'],

  methods: {

    prevMonth(event) {
      if(event.target.classList.contains('disabled')) return false;

      this.current = this.addMonth(this.current, -1);
    },

    nextMonth(event) {
      if(event.target.classList.contains('disabled')) return false;
      this.current = this.addMonth(this.current, +1);
    },

    disableControl(control) {
      let testDate    = new Date(this.current),
          addMonthNum = 0;

      if (control === 'prevMonth') addMonthNum = -1;
      if (control === 'nextMonth') addMonthNum = 1;

      return !this.checkIsEnabled(this.addMonth(testDate, addMonthNum));
    },

    checkIsEnabled(date) {
      return  date.setDate(30) > new Date(this.minDate) && date.setDate(1) < new Date(this.maxDate)
    },

    addMonth(date, number) {
      number = number || 1;
      date = new Date(date);
      return new Date(date.setMonth(date.getMonth() + number));
    }
  }
}
</script>

<style lang="scss">

.select-month {
  display: block;
  padding: 15px 0;
  display:flex;
  justify-content: center;

  .date{
    width: 77%;
  }

  .disabled {
    box-shadow: 2px -2px #dce0e5 inset;
    cursor: default;
  }
}

.arrow {
  padding: 5px;
  box-shadow: 2px -2px #4e647b inset;
  border: solid transparent;
  border-width: 0 0 5px 5px;
  cursor:pointer;
}

.arrow-right {
  transform:rotate(225deg)
}
.arrow-left  {
  transform:rotate(45deg)
}
</style>
