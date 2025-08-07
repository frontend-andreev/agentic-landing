export function NeuralBackground() {
  return (
    <div className="fixed inset-0 neural-bg opacity-40 pointer-events-none">
      {/* Ultra-subtle neural network nodes */}
      <div className="absolute top-1/5 left-1/5 w-1 h-1 bg-[var(--accent-primary)]/10 rounded-full animate-pulse"></div>
      <div className="absolute top-3/5 right-1/5 w-0.5 h-0.5 bg-[var(--accent-secondary)]/10 rounded-full animate-pulse delay-500"></div>
      <div className="absolute top-1/2 left-3/5 w-1 h-1 bg-[var(--accent-primary)]/8 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-4/5 left-2/5 w-0.5 h-0.5 bg-[var(--accent-secondary)]/8 rounded-full animate-pulse delay-1500"></div>
      
      {/* Extremely subtle flowing connections */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/4 to-transparent"
           style={{ animation: 'neuralFlow 25s linear infinite' }}></div>
      <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--accent-secondary)]/3 to-transparent"
           style={{ animation: 'neuralFlow 35s linear infinite', animationDelay: '8s' }}></div>
    </div>
  );
}
