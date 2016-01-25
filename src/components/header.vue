<template>
  <header class="header">
    <div class="date-year">

      <h4 @click="changeYearSelect" :class="{
        'active':changeSelectType,
        'ani-up'   : turnType==='up' && modifyYear,
        'ani-down' : turnType==='down' && modifyYear}">{{selectedInfo.year}}</h4>
    </div>

    <div class="date">
      <h2 @click="changeMonthSelect" :class="{
        'active'   : !changeSelectType,
        'ani-up'   : turnType==='up',
        'ani-down' : turnType==='down'}">
        {{selectedInfo.day}}, {{selectedInfo.month}} {{selectedInfo.date}}
      </h2>
    </div>

  </header>
</template>

<script>
module.exports = {
  name : 'date-pick-header',
  props : ['changeSelectType', 'selectedInfo'],

  data () {
    return {
      turnType: null
    }
  },

  watch : {
    selectedInfo(newVal, oldVal) {
      let newValDate = [newVal.year, newVal.month, newVal.date].join(''),
          oldValDate = [oldVal.year, oldVal.month, oldVal.date].join('');

      this.modifyYear = newVal.year !== oldVal.year;

      if (newValDate > oldValDate) {
        this.turnType = 'down'
      } else {
        this.turnType = 'up'
      }
    }
  },

  ready () {
    this.animationEndFn()
  },

  methods : {
    changeYearSelect () {
      this.changeSelectType = true;
    },

    changeMonthSelect () {
      this.changeSelectType = false;
    },

    animationEndFn () {
      let $target = this.$el.querySelector('h2');

      $target.addEventListener('animationend', (event) => {
        event.target.className = '';
        this.turnType = null;
      });
    }
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.header {
  background: $activeColor;
  padding: 20px;
  color: $headerBaseColor;
  height: 72px;
  text-align: left;
  h4,
  h2 {
    cursor: pointer
  }
  h4 {
    margin: 0;
    font-weight: 400;
  }

  .date-year {
    height:16px;
    overflow:hidden;
  }

  .date {
    height: 40px;
    margin: 15px 0 0 0;
    overflow: hidden;

    h2 {
      font-size: 36px;
      margin: 0;
    }
  }
  .ani-up {
    animation: runUp .4s;
  }
  .ani-down {
    animation: runDown .4s;
  }
  .active {
    color: #fff
  }
}

@-webkit-keyframes runUp {
  0% {
    -webkit-transform: translateY(-20px)
  }
  100% {
    -webkit-transform: translateY(0)
  }
}

@-webkit-keyframes runDown {
  0% {
    -webkit-transform: translateY(20px)
  }
  100% {
    -webkit-transform: translateY(0)
  }
}
</style>
