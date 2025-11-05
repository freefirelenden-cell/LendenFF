export default function Progress({ 
  size = "md", 
  showText = false,
  text = "Processing...",
  progress = 0, // 0 to 100
  className = ""
}) {
  const sizeClasses = {
    sm: "h-2",
    md: "h-3", 
    lg: "h-4",
    xl: "h-5"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base", 
    xl: "text-lg"
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Progress Bar */}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div 
          className={`bg-blue-600 rounded-full ${sizeClasses[size]} transition-all duration-300`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Progress Text */}
      {showText && (
        <div className="flex justify-between items-center">
          <span className={`text-gray-600 ${textSizes[size]}`}>
            {text}
          </span>
          <span className={`font-bold text-blue-600 ${textSizes[size]}`}>
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
}