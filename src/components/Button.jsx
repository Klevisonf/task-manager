import { tv } from "tailwind-variants"

const Button = ({
  children,
  color = "primary",
  size = "small",
  className,
  ...rest
}) => {
  const button = tv({
    base: "inter flex items-center justify-center gap-2 rounded-lg px-3 font-semibold transition hover:opacity-75",
    variants: {
      color: {
        primary: "bg-primary text-white",
        ghost: "text-dark-gray bg-transparent",
        secundary: "bg-light-gray text-text-dark-blue",
      },
      size: {
        small: "py-1 text-xs",
        large: "py-2 text-sm",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  })

  return (
    <button className={button({ color, size, className })} {...rest}>
      {children}
    </button>
  )
}
export default Button
