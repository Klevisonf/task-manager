const Button = ({
  children,
  variant = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const getVariantClasses = () => {
    if (variant === "primary") {
      return "bg-primary text-white"
    }
    if (variant === "ghost") {
      return "bg-transparent text-dark-gray"
    }
    if (variant === "secundary") {
      return "bg-light-gray text-text-dark-blue "
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
      className={`item-center flex justify-center gap-2 rounded-lg px-3 ${getSizeClasses()} ${getVariantClasses()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
export default Button
