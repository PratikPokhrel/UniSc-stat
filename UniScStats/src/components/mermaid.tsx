// components/Mermaid.tsx
import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

interface MermaidProps {
  chart: string;
}

const Mermaidd: React.FC<MermaidProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render('generatedDiagram', chart);
        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (err) {
        console.error('Mermaid render error:', err);
      }
    };

    renderChart();
  }, [chart]);

  return <div ref={ref} />;
};

export default Mermaidd;
