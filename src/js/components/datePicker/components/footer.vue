<template>
  <footer class="footer">
    <button @click="datePickerHide">取消</button>
    <button @click="datePickersure">确定</button>
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
.footer {
  padding: 15px 0 10px 0;
  button {
    border: none;
    color: red;
    font-size: 16px;
    color: lighten(#40b0e7, 10%);
    background: transparent;
    cursor: pointer;
    padding: 8px 20px;
    &:hover {
      animation: btn-fade-in .5s ease both;
    }
    &:focus {
      outline: none;
    }
  }
}
</style>
