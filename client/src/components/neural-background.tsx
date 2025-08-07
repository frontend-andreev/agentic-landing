export function NeuralBackground() {
  return (
    <div className="fixed inset-0 neural-bg opacity-30 pointer-events-none">
      {/* Additional animated elements for neural network effect */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/20 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-400/15 rounded-full animate-pulse delay-700"></div>
      
      {/* Flowing neural connections */}
      <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/10 to-transparent"
           style={{ animation: 'neuralFlow 15s linear infinite' }}></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/10 to-transparent"
           style={{ animation: 'neuralFlow 20s linear infinite', animationDelay: '5s' }}></div>
    </div>
  );
}
