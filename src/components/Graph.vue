<template>
  <div>
    <div id="graph"></div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Graph',
  data() {
    return {
      nodes: [],
      links: []
    };
  },
  mounted() {
    this.getAllUsers();
    this.getAllUsersConnections();
  },
  computed: {
    ...mapGetters(['allUsers', 'allUsersConnections'])
  },
  watch: {
    allUsersConnections: {
      deep: true,
      handler() {
        this.nodes = this.allUsers;
        this.links = this.allUsersConnections;
      }
    },
    links: {
      deep: true,
      immediate: true,
      handler() {
        this.renderGraph();
      }
    }
  },
  methods: {
    ...mapActions(['getAllUsers', 'getAllUsersConnections']),
    renderGraph() {
      d3.select('svg').remove();
      var width = 960;
      var height = 800;
      var node_radius = 40;

      var svg = d3
        .select('#graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      var simulation = d3
        .forceSimulation()
        .force('x', d3.forceX(width / 2)) // to the center of screen
        .force('y', d3.forceY(height / 2))
        .force('collide', d3.forceCollide(node_radius + 20)) // circle not on another cirkle
        .force('charge', d3.forceManyBody().strength(-500)) //circles pushing another cirkle with force
        .force(
          'link',
          d3
            .forceLink()
            .id(function(d) {
              return d.id;
            })
            .distance(300)
        )
        .on('tick', ticked);

      var link = svg.selectAll('.link');
      var node = svg.selectAll('.node');

      simulation.nodes(this.nodes);
      simulation.force('link').links(this.links);

      link = link
        .data(this.links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', 'black');

      // link
      //   .attr('stroke-dasharray', 10 + ' ' + 10)
      //   .attr('stroke-dashoffset', 500)
      //   .transition()
      //   .duration(2000)
      //   .ease('linear')
      //   .attr('stroke-dashoffset', 0);

      node = node
        .data(this.nodes)
        .enter()
        .append('g')
        .attr('class', 'node');
      node.append('circle').attr('r', node_radius);
      node
        .append('text')
        .attr('dx', -20)
        .attr('dy', 5)
        .text(function(d) {
          return d.username;
        });

      function ticked() {
        link
          .attr('x1', function(d) {
            return d.source.x;
          })
          .attr('y1', function(d) {
            return d.source.y;
          })
          .attr('x2', function(d) {
            return d.target.x;
          })
          .attr('y2', function(d) {
            return d.target.y;
          });
        node.attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      }
    }
  }
};
</script>

<style>
#graph {
  width: 100%;
  height: 100%;
}
.node {
  cursor: pointer;
}
circle {
  stroke: #ffffff;
  fill: #4884ff;
}
text {
  font-size: 14px;
  fill: white;
}
.link {
  background-color: black;
  color: black;
}
</style>
