import { BaseBoxShapeUtil, HTMLContainer, RecordProps, T, TLBaseShape } from 'tldraw'
import { useEffect, useRef } from 'react'
import { useToast } from '@/hooks/use-toast'
import * as d3 from "d3"
//@ts-ignore
import * as venn from "venn.js"

type VennDataSet = {
  sets: string[]
  size: number
  label?: string
}

type IVennDiagram = TLBaseShape<
  'venn-diagram',
  {
    w: number
    h: number
    data: VennDataSet[]
  }
>

const VennDiagramComponent = ({ data, width, height }: { 
  data: VennDataSet[], 
  width: number, 
  height: number 
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (!containerRef.current) return

    // Clear previous content
    d3.select(containerRef.current).selectAll("*").remove()

    // Create SVG with a gradient definition
    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    // Add gradient definitions
    const defs = svg.append("defs")
    
    // Create gradients for each set
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1']
    colors.forEach((color, i) => {
      const gradient = defs.append("linearGradient")
        .attr("id", `gradient-${i}`)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")

      gradient.append("stop")
        .attr("offset", "0%")
        .attr("style", `stop-color:${color}; stop-opacity:0.8`)

      gradient.append("stop")
        .attr("offset", "100%")
        .attr("style", `stop-color:${color}; stop-opacity:0.4`)
    })

    // Create the Venn diagram
    const vennChart = venn.VennDiagram()
      .width(width)
      .height(height)

    // Add diagram to SVG
    const diagram = svg.datum(data).call(vennChart)

    // Enhanced styling for the circles
    diagram.selectAll("path")
      .style("fill-opacity", 0.25)
      .style("stroke-width", 2)
      .style("stroke", "#fff")
      .style("stroke-opacity", 0.8)
      .each(function(d: any, i: number) {
        d3.select(this)
          .style("fill", `url(#gradient-${i % colors.length})`)
      })

    // Add interaction with enhanced effects
    diagram.selectAll("g")
      .on("mouseover", function(this: any, event: any, d: any) {
        const selection = d3.select(this)
        
        // Enhanced highlight effect
        selection.select("path")
          .transition()
          .duration(200)
          .style("fill-opacity", 0.5)
          .style("stroke-width", 3)
          .style("stroke", "#ffffff")
        
        // Scale up the text
        selection.select("text")
          .transition()
          .duration(200)
          .style("font-size", "16px")
          .style("font-weight", "bold")

        // Show toast with details
        // toast({
        //   title: d.sets.join(" ∩ "),
        //   description: d.label || `Size: ${d.size}`,
        //   duration: 2000,
        // })
      })
      .on("mouseout", function(this: any) {
        const selection = d3.select(this)
        
        // Reset effects
        selection.select("path")
          .transition()
          .duration(200)
          .style("fill-opacity", 0.25)
          .style("stroke-width", 2)
        
        selection.select("text")
          .transition()
          .duration(200)
          .style("font-size", "14px")
          .style("font-weight", "normal")
      })

    // Enhanced label styling
    diagram.selectAll("text")
      .style("font-family", "ui-sans-serif, system-ui, -apple-system, sans-serif")
      .style("font-size", "14px")
      .style("fill", "#1a1a1a")
      .style("text-shadow", "1px 1px 2px rgba(255,255,255,0.8)")
      .style("pointer-events", "none")

    return () => {
      d3.select(containerRef.current).selectAll("*").remove()
    }
  }, [data, width, height, toast])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        pointerEvents: 'all',
      }} 
    />
  )
}

export class VennDiagramShape extends BaseBoxShapeUtil<IVennDiagram> {
  static override type = 'venn-diagram' as const
  static override props: RecordProps<IVennDiagram> = {
    w: T.number,
    h: T.number,
    data: T.arrayOf(T.object({
      sets: T.arrayOf(T.string),
      size: T.number,
      label: T.optional(T.string)
    }))
  }

  getDefaultProps(): IVennDiagram['props'] {
    return {
      w: 600,
      h: 400,
      data: []
    }
  }

  component(shape: IVennDiagram) {
    const { data, w, h } = shape.props

    return (
      <HTMLContainer
        style={{
          width: w,
          height: h,
        }}
      >
        <span className="text-xl font-bold mb-2 font-shantellSans">Venn-diagram</span>
        <VennDiagramComponent
          data={data}
          width={w - 32}
          height={h - 32}
        />
      </HTMLContainer>
    )
  }

  indicator(shape: IVennDiagram) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }
}