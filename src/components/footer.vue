<template>
  <footer class="footer">
    <button @click="datePickerHide">CANCEL</button>
    <button @click="datePickersure">OK</button>
  </footer>
  </div>
</template>

<script>
module.exports = {
  name: 'date-pick-footer',
  methods:{
    datePickerHide(){
      this.$dispatch('date-picker-hide')
    },
    datePickersure(){
      this.$dispatch('date-picker-sure')
    }
  }
}
</script>

<style lang="scss">
@import '../styles/_variables.scss';

.footer {
  padding: 15px 10px 10px 10px;
  text-align: right;

  button {
    border: none;
    color: red;
    color: $activeColor;
    background: transparent;
    cursor: pointer;
    padding: 8px 20px;

    &:hover {
      color: #fff;
      animation: btn-fade-in .5s ease both;
    }

    &:focus {
      outline: none;
    }
  }
}


@-webkit-keyframes btn-fade-in {
  0% {
    background: rgba(lighten(#009688, 5%), .1);
  }
  100% {
    background: rgba(lighten(#009688, 5%), .5);
  }
}

</style>
