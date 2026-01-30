import PropTypes from "prop-types"
import { NavLink } from "react-router-dom"
import { tv } from "tailwind-variants"
const SidebarButton = ({ children, to }) => {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? "selected" : "unselected" })
      }
    >
      {children}
    </NavLink>
  )
}

export default SidebarButton
