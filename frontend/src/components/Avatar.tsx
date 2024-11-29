export const Avatar = ({ name, size } : {name: string, size: string}) => {
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-400 rounded-full ${size=="small"? " w-7 h-7" : "w-8 h-8"}`}>
        <span className="text-xs text-white font-semibold">{name[0]}</span>
    </div>
}

