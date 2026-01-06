import InputLabel from "./InputLabel"

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="placeholder:text-[#9A9C9F rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm"
        {...rest}
      />
      {errorMessage && (
        <p className="mt-2 text-left text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  )
}

export default Input
