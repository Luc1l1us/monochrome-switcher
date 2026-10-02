import "./Badge.css"
export default function ColoredBadge({children, color, state}) {
    const colorClass = color === state ? "brown" : "blue"
    return (
        <span
            className={`badge ${colorClass}`}>
                {children}
        </span>
    )
}