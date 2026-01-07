import { forwardRef } from "react"

import InputLabel from "./InputLabel"

const TimeSelect = forwardRef((props, ref) => {
  return (
    <div className="flex flex-col gap-1 text-left">
      <InputLabel htmlFor="time">Horário</InputLabel>
      <select
        id="time"
        className="placeholder:text-[#9A9C9F rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
        {...props}
        ref={ref}
      >
        <option value="morning">Manhã</option>
        <option value="afternoon">Tarde</option>
        <option value="evening">Noite</option>
      </select>
      {props.errorMessage && (
        <p className="mt-2 text-left text-sm text-red-500">
          {props.errorMessage}
        </p>
      )}
    </div>
  )
})
TimeSelect.displayName = "TimeSelect"
export default TimeSelect
