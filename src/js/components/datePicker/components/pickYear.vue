<template>
  <div class="select-year">
    <ol>
      <li v-for="year in yearArr"
        track-by="$index"
        :class="{'active' : year === selectedYear}"
        @click="changeActiveYear(year)">{{year}} </li>
    </ol>
  </div>
</template>

<script>
module.exports = {
  name: 'pick-year',
  props: ['yearArr','selectedDate'],

  computed:{
    selectedYear(){
      return this.selectedDate.getFullYear()
    }
  },
  watch:{
    selectedDate(){
      this.$nextTick(() => {
       this.positionActive();
      })
    }
  },

  ready(){
    this.positionActive();
  },

  methods:{

    changeActiveYear(year){
      this.selectedDate = new Date(this.selectedDate.setYear(year))
    },

    positionActive(){
      let $target = this.$el.querySelector('.active');
      this.$el.scrollTop = ($target.offsetTop-this.$el.offsetTop)-$target.offsetHeight*3;
    }
  }
}
</script>

<style lang="scss">
.select-year {
  overflow: hidden;
  height: 290px;
  padding-top:10px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      font-size: 18px;
      padding: 10px 0;
      cursor:pointer;

      &.active{
        font-size:22px;
        color:#009485;
        font-weight:800;
        margin:10px 0;
      }
    }
  }
}
</style>
