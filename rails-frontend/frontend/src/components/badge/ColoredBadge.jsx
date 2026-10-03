import "./Badge.css"
export default function ColoredBadge({children, state}) {
    const stateColorMap = {
        single: "blue",
        multi: "brown",
    };
    const colorClass = stateColorMap[state] || "red";
    const text = (children ?? "").toString().trim() === "" ? "NULL" : children;
    return (
        <span
            className={`badge ${colorClass}`}>
                {text}
        </span>
    )
}