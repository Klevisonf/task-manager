const InputLabel = (props) => {
  return (
    <label className="text-text-dark-blue text-sm font-semibold" {...props}>
      {props.children}
    </label>
  )
}

export default InputLabel
