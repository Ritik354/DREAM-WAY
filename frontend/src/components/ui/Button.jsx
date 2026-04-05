function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = {
    primary:
      "bg-gradient-to-r from-[#6366f1] to-[#5859d9] text-white shadow-soft hover:shadow-lg hover:from-[#5859d9] hover:to-[#4f52c7] focus-visible:ring-2 focus-visible:ring-[#6366f1]/40 transform hover:scale-[1.02] transition-all duration-200",
    secondary:
      "bg-white/10 text-text border border-white/20 hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-[#6366f1]/20 backdrop-blur-sm",
    ghost:
      "bg-transparent text-text hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/10",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold transition-all duration-200 ease-in-out ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
