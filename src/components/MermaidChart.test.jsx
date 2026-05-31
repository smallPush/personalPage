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

  it('renders successfully when chart is valid', async () => {
    const mockSvg = '<svg><g>chart content</g></svg>';
    mermaid.render.mockResolvedValueOnce({ svg: mockSvg });

    const goodChart = 'graph TD;\n  A-->B';

    let renderedContainer;
    await act(async () => {
      const { container } = render(<MermaidChart chart={goodChart} />);
      renderedContainer = container;
    });

    await waitFor(() => {
      expect(mermaid.render).toHaveBeenCalledWith(expect.stringMatching(/^mermaid-chart-/), goodChart);
    });

    expect(renderedContainer.querySelector('.mermaid-container').innerHTML).toBe(mockSvg);
  });

  it('does not call mermaid.render if chart prop is empty', async () => {
    await act(async () => {
      render(<MermaidChart chart="" />);
    });

    expect(mermaid.render).not.toHaveBeenCalled();
  });

  it('does not update state if unmounted before render finishes', async () => {
    let resolveRender;
    const renderPromise = new Promise(resolve => {
      resolveRender = resolve;
    });
    mermaid.render.mockReturnValueOnce(renderPromise);

    const chart = 'graph TD;\n  A-->B';

    let unmountFunc;
    await act(async () => {
      const { unmount } = render(<MermaidChart chart={chart} />);
      unmountFunc = unmount;
    });

    expect(mermaid.render).toHaveBeenCalled();

    // unmount before resolve
    await act(async () => {
      unmountFunc();
    });

    // resolve render
    await act(async () => {
      resolveRender({ svg: '<svg>test</svg>' });
    });

    // Test passes if no state update warnings are thrown after unmount
  });
});
