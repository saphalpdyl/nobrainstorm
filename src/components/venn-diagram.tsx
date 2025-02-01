import { useEffect, useRef } from 'react';
import { vennData } from '@/components/lib/venn-data';
import { useToast } from '@/components/utils/use-toast'; 


declare global {
  interface Window {
    d3: any;
    venn: any;
  }
}

export default function VennDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!containerRef.current) return;
    if (!window.d3 || !window.venn) {
      console.error('Required libraries not loaded');
      return;
    }

    const { d3, venn } = window;

    // Clear previous content
    d3.select(containerRef.current).selectAll("*").remove();

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create SVG
    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create the Venn diagram
    const vennChart = venn.VennDiagram()
      .width(width)
      .height(height);

    // Add diagram to SVG
    const diagram = svg.datum(vennData).call(vennChart);

    // Add interaction
    diagram.selectAll("g")
      .on("mouseover", function(this: any, event: any, d: any) {
        // Highlight the hovered region
        d3.select(this)
          .transition()
          .style("fill-opacity", 0.5);

        // Show toast with details
        toast({
          title: d.sets.join(" ∩ "),
          description: d.label || `Size: ${d.size}`,
          duration: 2000,
        });
      })
      .on("mouseout", function(this: any) {
        // Reset opacity
        d3.select(this)
          .transition()
          .style("fill-opacity", 0.25);
      });

    // Add labels with better positioning
    diagram.selectAll("text")
      .style("font-family", "ui-sans-serif, system-ui, sans-serif")
      .style("font-size", "14px")
      .style("fill", "currentColor");

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;

      svg.attr("width", newWidth)
         .attr("height", newHeight);

      vennChart.width(newWidth)
               .height(newHeight);

      diagram.call(vennChart);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full" />
  );
}
