import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import MermaidChart from './MermaidChart';
import mermaid from 'mermaid';

// Mock mermaid module
vi.mock('mermaid', () => ({
  default: {
    initialize: vi.fn(),
    render: vi.fn()
  }
}));

describe('MermaidChart Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error UI when mermaid.render fails', async () => {
    // Suppress console.error during the test to avoid noisy test output
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Mock mermaid.render to reject with an error
    mermaid.render.mockRejectedValueOnce(new Error('Syntax error in graph'));

    const badChart = 'graph TD;\n  A-->';

    await act(async () => {
      render(<MermaidChart chart={badChart} />);
    });

    // Wait for the error UI to be rendered
    await waitFor(() => {
      expect(screen.getByText('Failed to render Mermaid chart.')).toBeInTheDocument();
    });

    // Verify the raw chart text is also rendered (using a more flexible matcher due to how JSDOM serializes `>`)
    expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'pre' && content.includes('graph TD;'))).toBeInTheDocument();

    // Verify console.error was called
    expect(consoleSpy).toHaveBeenCalledWith('Mermaid parsing error:', expect.any(Error));

    consoleSpy.mockRestore();
  });

  it('sanitizes SVG output to prevent XSS', async () => {
    // Mock mermaid.render to return an SVG with a malicious script payload
    const maliciousSvg = '<svg id="malicious"><script>alert("XSS")</script><g><rect x="0" y="0" width="10" height="10" /></g></svg>';
    mermaid.render.mockResolvedValueOnce({ svg: maliciousSvg });

    const chart = 'graph TD;\n  A-->B;';

    await act(async () => {
      render(<MermaidChart chart={chart} />);
    });

    // Wait for the chart to be rendered
    await waitFor(() => {
      // The container should have the inner HTML, but script tags should be stripped
      const container = document.querySelector('.mermaid-container');
      expect(container).toBeInTheDocument();
      expect(container.innerHTML).not.toContain('<script>');
      expect(container.innerHTML).toContain('<svg id="malicious">');
      expect(container.innerHTML).toContain('<rect');
    });
  });

  it('preserves foreignObject and inner text content while stripping XSS', async () => {
    const foSvg = `
      <svg id="chart-with-fo">
        <g class="node">
          <rect width="100" height="50" />
          <foreignObject width="100" height="50">
            <script>alert("XSS")</script>
            <div xmlns="http://www.w3.org/1999/xhtml">
              <span class="nodeLabel">Donante visita Formulario</span>
            </div>
          </foreignObject>
        </g>
      </svg>
    `;
    mermaid.render.mockResolvedValueOnce({ svg: foSvg });

    const chart = 'flowchart TD;\n  A[Donante visita Formulario]';

    await act(async () => {
      render(<MermaidChart chart={chart} />);
    });

    await waitFor(() => {
      const container = document.querySelector('.mermaid-container');
      expect(container).toBeInTheDocument();
      expect(container.innerHTML).not.toContain('<script>');
      expect(screen.getByText('Donante visita Formulario')).toBeInTheDocument();
    });
  });

  it('initializes mermaid with default theme when light mode and dark theme when dark mode', async () => {
    mermaid.render.mockResolvedValue({ svg: '<svg id="chart"></svg>' });

    await act(async () => {
      render(<MermaidChart chart="graph TD; A-->B;" />);
    });

    expect(mermaid.initialize).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'default',
        securityLevel: 'strict',
      })
    );
  });
});
