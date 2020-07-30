<template>
  <div class="home">
    <Introduce msg="This is a liby vue-web template."/>
  </div>
</template>

<script>
// @ is an alias to /src
import Introduce from '@/components/Introduce.vue'

export default {
  name: 'Home',
  components: {
    Introduce
  }
}
</script>
