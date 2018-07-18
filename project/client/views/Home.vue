<template>
  <div class="page">
    <Example :dataArray="['hello world!']"></Example>
  </div>
</template>

<script>
import Example from '../components/charts/Example'

export default {
  components: {
    Example
  }
}
</script>
