import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import GlassContainer from './GlassContainer';

describe('GlassContainer Component', () => {
  it('renders children correctly', () => {
    render(
      <GlassContainer>
        <span data-testid="child">Test Child</span>
      </GlassContainer>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('applies default glass effect classes', () => {
    const { container } = render(<GlassContainer>Content</GlassContainer>);
    const div = container.firstChild;
    expect(div).toHaveClass('glass-effect');
    expect(div).toHaveClass('glass-card');
  });

  it('merges custom className with default classes', () => {
    const { container } = render(
      <GlassContainer className="custom-class">Content</GlassContainer>
    );
    const div = container.firstChild;
    expect(div).toHaveClass('glass-effect');
    expect(div).toHaveClass('glass-card');
    expect(div).toHaveClass('custom-class');
  });

  it('forwards additional props to the div element', () => {
    render(
      <GlassContainer id="test-id" data-testid="glass-container" title="test-title">
        Content
      </GlassContainer>
    );
    const div = screen.getByTestId('glass-container');
    expect(div).toHaveAttribute('id', 'test-id');
    expect(div).toHaveAttribute('title', 'test-title');
  });
});
