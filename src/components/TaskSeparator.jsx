const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-3 border-b border-solid border-[#F4F4F5] pb-2">
      {icon}
      <p className="text-text-gray text-sm">{title}</p>
    </div>
  )
}

export default TaskSeparator
