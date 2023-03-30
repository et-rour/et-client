<template>
  <span> {{ formatedDate }} </span>
</template>

<script>
import moment from 'moment'
export default {
  props:["date"],
  computed:{
    formatedDate(){
      return moment(this.date).format('DD / MM / YYYY')
    }
  }
}
</script>

<style>

</style>