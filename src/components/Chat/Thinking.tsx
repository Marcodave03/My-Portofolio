import type React from "react"
// import Marco from "../../assets/Marco.svg"

interface ThinkingProps {
  isDark: boolean
}

const Thinking: React.FC<ThinkingProps> = ({ isDark }) => {
  return (
    <div className="flex items-start gap-3">
      {/* <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={Marco}
          loading="eager"
          alt="Marco"
          className="w-full h-full object-cover"
        />
        <img
          src="/9edcdf8d-d69d-402d-9c0b-e43646659ea6.jpg"
          loading="eager"
          alt="Ferdinand"
          className="w-full h-full object-cover"
        />
      </div> */}
      <div className={`flex items-center mt-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <span className="text-base">Thinking</span>
        <span className="inline-flex w-5 ml-1">
          <span className="animate-bounce">.</span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
            .
          </span>
          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
            .
          </span>
        </span>
      </div>
    </div>
  )
}

export default Thinking

