<template>
  <div class="graph-container"><Graph /></div>
</template>

<script>
import Graph from '../components/Graph';

export default {
  name: 'GraphContainer',
  components: {
    Graph
  }
};
</script>

<style>
.graph-container {
  width: 70%;
  height: 100%;
  box-sizing: border-box;
}
</style>
