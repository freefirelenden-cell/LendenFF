export default function LoadingSpinner({
    size = "md",
    color = "purple",
    showText = false,
    text = "Loading...",
    className = ""
}) {
    const sizeClasses = {
        sm: "h-[20px] w-[20px]",
        md: "h-[40px] w-[40px]",
        lg: "h-[60px] w-[60px]",
        xl: "h-[80px] w-[80px]"
    };

    const colorClasses = {
        purple: "border-t-[#6c47ff]",
        blue: "border-t-blue-500",
        green: "border-t-green-500",
        red: "border-t-red-500",
        yellow: "border-t-yellow-500"
    };

    return (
        <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
            <div className={`
        ${sizeClasses[size]} 
        border-2 border-gray-200 rounded-full 
        ${colorClasses[color]}
        animate-spin
      `}></div>

            {showText && (
                <p className="text-gray-600 text-sm mt-2">{text}</p>
            )}
        </div>
    );
}