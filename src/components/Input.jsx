import { forwardRef } from "react"

import InputErrorMessage from "./InputErrorMessage"
import InputLabel from "./InputLabel"

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="placeholder:text-text-gray text- outline-primary rounded-lg border border-solid border-[#ECECEC] px-4 py-3 placeholder:text-sm"
        {...rest}
        ref={ref}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})
Input.displayName = "Input"
export default Input
