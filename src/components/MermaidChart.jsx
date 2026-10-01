import React, { useEffect, useRef, useState, useContext } from 'react';
import mermaid from 'mermaid';
import DOMPurify from 'dompurify';
import { ThemeContext } from '../context/themeContextValue';

const MermaidChart = ({ chart }) => {
  const containerRef = useRef(null);
  const [svg, setSvg] = useState('');
  const [error, setError] = useState(false);
  const themeContext = useContext(ThemeContext);
  const currentTheme = themeContext?.theme === 'dark' ? 'dark' : 'default';

  useEffect(() => {
    if (!chart || !containerRef.current) return;

    let isMounted = true;

    const renderChart = async () => {
      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: currentTheme,
          securityLevel: 'strict',
          fontFamily: 'Inter, Segoe UI, sans-serif',
        });
        const id = `mermaid-chart-${window.crypto.randomUUID()}`;
        const { svg } = await mermaid.render(id, chart);
        if (isMounted) {
          const cleanSvg = DOMPurify.sanitize(svg, {
            ADD_TAGS: ['foreignObject'],
            HTML_INTEGRATION_POINTS: { foreignobject: true },
          });
          setSvg(cleanSvg);
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
  }, [chart, currentTheme]);

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

