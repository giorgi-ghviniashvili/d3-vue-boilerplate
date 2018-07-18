<template>
    <foreignObject class="tooltipForeign"
        :id="`${obj.id ? obj.id : ''}`"
        :visibility="obj.visible ? 'visible' : 'hidden'"
        @mouseover="mouseover"
        @mouseout="mouseout">
        <div class="tooltip-container" v-html="obj.html">
        </div>
    </foreignObject>
</template>


<script>
export default {
    props: [
        'obj',
        'svgWidth',
        'svgHeight',
        'handleOverflow'
    ],
    data () {
        return {
            animationTime: 500
        }
    },
    methods: {
        linkclick () {
            this.$emit('linkclick', '')
        },
        mouseover () {
            this.obj.visible = true
        },
        mouseout () {
            this.obj.visible = false
        }
    },
    watch: {
        obj () {
            let tooltip = this.$d3.select(this.$el)
            
            let x = this.obj.x;
            let y = this.obj.y;
            if (this.handleOverflow) {
                let el = this.$d3.select("body")
                        .selectAll('div.hiddentooltip')
                        .data(['hiddentooltip'])
                el = el.enter()
                    .append("div")
                    .attr('class', 'hiddentooltip')
                    .style('visibility', 'hidden')
                    .style('position', 'absolute')
                    .merge(el)
                
                el.html(this.obj.html)
                let bound = el.select("div").node().getBoundingClientRect()
                let width = bound.width
                let height = bound.height
                
                if (x + width > this.svgWidth) {
                    x -= width
                }
                if (y + height > this.svgHeight) {
                    y -= height
                }
            }
            
            tooltip.transition()
                .duration(this.animationTime)
                .attr('transform', `translate(${x}, ${y})`)
        }
    },
    mounted () {
        this.$el.addEventListener('click', function(e){
            if(e.target && e.target.classList.contains('link')){
                this.linkclick();
            }
        }.bind(this))
        let tooltip = this.$d3.select(this.$el)
        tooltip.attr('transform', `translate(${this.svgWidth / 2}, ${this.svgHeight / 2})`)
    }
}
</script>

<style>
    .tooltipForeign {
        .tooltip-container {
            position: absolute;
            min-width: 100px;
            white-space: nowrap; 
            height: auto;
            border-radius: 2px;
            text-align: center;
            line-height: 1.3;
            color: #fff;
            box-shadow: 0px 3px 9px rgba(0, 0, 0, .15);
        }
        .link {
            pointer-events: all;
            cursor: pointer;
        }
    }
</style>