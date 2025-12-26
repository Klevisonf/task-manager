const Button = ({ children, variant = "primary", onClick }) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white"
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
    }
  }

  return (
    <div>
      <button
        className={`item-center flex gap-2 rounded-lg bg-[#00ADB5] px-3 py-1 text-xs ${getVariantClasses()}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}

export default Button
