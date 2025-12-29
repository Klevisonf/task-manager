const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white"
    }
    if (variant === "ghost") {
      return "bg-transparent text-[#818181]"
    }
    if (variant === "secundary") {
      return "bg-[#EEEEEE] text-[#35383E] "
    }
  }

  const getSizeClasses = () => {
    if (size === "small") {
      return "  py-1 text-xs"
    }
    if (size === "large") {
      return "  py-2 text-sm"
    }
  }

  return (
    <button
      className={`item-center flex justify-center gap-2 rounded-lg bg-[#00ADB5] px-3 ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
export default Button
