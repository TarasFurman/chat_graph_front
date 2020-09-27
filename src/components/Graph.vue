<template>
  <div>
    <svg width="960" height="800"></svg>
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
      links: [],
      node: null,
      link: null,
      simulation: null,
      node_radius: 40
    };
  },
  mounted() {
    this.getAllUsers();
    this.getAllUsersConnections();

    var that = this;
    var width = 960;
    var height = 800;

    var svg = d3.select('svg');
    var g = svg.append('g');
    that.link = g.append('g').selectAll('.link');
    that.node = g.append('g').selectAll('.node');

    that.simulation = d3
      .forceSimulation(this.nodes)
      .force('center', d3.forceCenter(width / 2, height / 2)) // to the center of screen
      .force('collide', d3.forceCollide(that.node_radius + 10)) // circle not on another cirkle
      .force('charge', d3.forceManyBody().strength(-50)) // circles pushing another cirkle with force
      .force(
        'link',
        d3
          .forceLink(this.links)
          .id(function(d) {
            return d.id;
          })
          .distance(300)
      );

    that.restart(this.nodes, this.links);
  },
  computed: {
    ...mapGetters(['allUsers', 'allUsersConnections', 'newMessage'])
  },
  watch: {
    allUsersConnections: {
      handler() {
        this.nodes = this.allUsers;
        this.links = this.allUsersConnections;
        this.restart(this.nodes, this.links);
      }
    },
    newMessage: {
      handler() {
        const animateLinks = this.newMessage.usersReceive.map(item => {
          const sourceTarget = [
            this.newMessage.userSend.user_id,
            item.user.id
          ].sort();
          return {
            source: sourceTarget[0],
            target: sourceTarget[1]
          };
        });
        const newLinks = [...this.links];
        for (let i = 0; i < newLinks.length; i++) {
          for (let j = 0; j < animateLinks.length; j++) {
            if (
              newLinks[i].source.id === animateLinks[j].source &&
              newLinks[i].target.id === animateLinks[j].target
            ) {
              newLinks[i]['animated'] = true;
              break;
            } else {
              newLinks[i]['animated'] = false;
            }
          }
        }
        this.links = newLinks.sort((a, b) =>
          a.source > b.source ? 1 : b.source > a.source ? -1 : 0
        );
        this.restart(this.nodes, this.links);
      }
    }
  },
  methods: {
    ...mapActions(['getAllUsers', 'getAllUsersConnections']),
    restart(newNodes, newLinks) {
      var that = this;

      // Apply the general update pattern to the nodes.
      that.node = that.node.data(newNodes, function(d) {
        return { id: d.id, username: d.username };
      });

      that.node.exit().remove();

      that.node = that.node
        .enter()
        .append('g')
        .attr('class', 'node')
        .merge(that.node);
      that.node
        .append('circle')
        .attr('r', that.node_radius)
        .merge(that.node);
      that.node
        .append('text')
        .attr('dx', -20)
        .attr('dy', 5)
        .merge(that.node)
        .text(d => d.username);

      // Apply the general update pattern to the links.
      that.link = that.link.data(newLinks, function(d) {
        return { source: { id: d.source.id }, target: { id: d.target.id } };
      });

      that.link.exit().remove();

      that.link = that.link
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke', function(d) {
          if (d.animated) {
            return 'red';
          } else {
            return 'black';
          }
        })
        .call(enter =>
          enter
            .transition()
            .duration(3000)
            .attr('stroke', 'black')
        )
        .merge(that.link);

      // Update and restart the simulation.

      that.simulation.nodes(newNodes).on('tick', function ticked() {
        that.link
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
        that.node.attr('transform', function(d) {
          return 'translate(' + d.x + ',' + d.y + ')';
        });
      });
      that.simulation.nodes(newNodes);
      that.simulation.force('link').links(newLinks);
      that.simulation.alpha(1).restart();
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
