function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/10 bg-surface/95 p-8 shadow-soft backdrop-blur-xl transition-all duration-200 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
