import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'strict',
});

const MermaidChart = ({ chart }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    let isMounted = true;

    const renderChart = async () => {
      try {
        const id = `mermaid-chart-${window.crypto.randomUUID()}`;
        const { svg } = await mermaid.render(id, chart);
        if (isMounted) {
          setSvg(svg);
          setError(false);
        }
      } catch (e) {
        console.error("Mermaid parsing error:", e);
        if (isMounted) {
          setError(true);
        }
      }
    };

    renderChart();

    return () => {
      isMounted = false;
    };
  }, [chart]);

  if (error) {
    return (
      <div className="mermaid-error text-danger p-3 border border-danger rounded bg-dark bg-opacity-50">
        <p className="mb-2 fw-bold">Failed to render Mermaid chart.</p>
        <pre className="text-muted small mb-0">{chart}</pre>
      </div>
    );
  }

  return (
    <div
      className="mermaid-container d-flex justify-content-center py-4 overflow-auto"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default MermaidChart;
