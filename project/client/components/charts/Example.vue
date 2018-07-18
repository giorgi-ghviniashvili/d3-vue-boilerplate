<template>
  <div class="chart-wrapper">
        <svg :width="width"
             :height="height">
            <g :transform="`translate(${padding.left}, ${padding.top})`" class="chart">
            </g>
            <Tooltip :svgWidth="width"
                     :svgHeight="height"
                     :obj="tooltipObj"
                     :handleOverflow="true">
            </Tooltip>
        </svg>
  </div>
</template>

<script>
import Tooltip from './d3-assets/Tooltip'
import patternify from './d3-assets/patternify'

export default {
  props: ['dataArray'],
  data () {
    return {
      width: 0,
      height: 500,
      padding: {
        left: 15,
        right: 15,
        top: 15,
        bottom: 15
      },
      tooltipObj: {
        visible: false
      },
      chart: ''
    }
  },
  computed: {
    chartHeight () {
      return this.height - this.padding.top - this.padding.bottom
    },
    chartWidth () {
      return this.width - this.padding.left - this.padding.right
    }
  },
  methods: {
    setWidth () {
      this.width = this.$el.offsetWidth
    },
    onResize () {
      this.setWidth()
    },
    draw () {
      // append texts
      patternify({
        tag: 'text',
        selector: 'test-text',
        data: this.dataArray,
        container: this.chart
      })
      .text(d => d)
      .attr('x', 10)
      .attr('y', 20)
    }
  },
  mounted () {
    this.chart = this.$d3.select(this.$el).select('svg').select('g')
    this.$d3.select(window).on('resize', this.onResize)

    this.onResize()
    this.draw()
  }
}
</script>

<style>
  svg {
      background-color: #FAFAFA;
      .test-text {
        fill: #2C3E50;
        font-family: 'Helvatica';
      }
  }
</style>
