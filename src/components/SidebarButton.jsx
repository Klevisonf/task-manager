import PropTypes from "prop-types"
import { tv } from "tailwind-variants"
const SidebarButton = ({ children, color }) => {
  const sidebar = tv({
    base: "flex items-center gap-3 rounded-lg px-4 py-3 text-sm",
    variants: {
      color: {
        selected: "bg-primary/15 text-primary",
        unselected: "text-text-dark-blue hover:bg-light-gray",
      },
    },
  })

  return (
    <a href="#" className={sidebar({ color })}>
      {children}
    </a>
  )
}

export default SidebarButton
