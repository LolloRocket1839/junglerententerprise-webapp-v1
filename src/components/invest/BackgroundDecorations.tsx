
const BackgroundDecorations = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"
        style={{ animationDuration: '5s' }}
      />
    </div>
  );
};

export default BackgroundDecorations;
