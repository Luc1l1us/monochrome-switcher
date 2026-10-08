import "./Badge.css"
export default function ColoredBadge({children, state, numofagents}) {
    const stateColorMap = {
        single: "blue",
        multi: "brown",
    };
    const colorClass = stateColorMap[state] || "red";
    const stateColorMap2 = {
        single: "inverse-blue",
        multi: "inverse-brown",
    }
    const colorClass2 = stateColorMap2[state] || "red";
    const text = (children ?? "").toString().trim() === "" ? "NULL" : children;
    return (
        <>
            <span
                className={`badge ${colorClass}`}>
                    <span className={`numofagents ${colorClass2}`}>
                        {numofagents} {/* {numofagents === 1 ? "Agent" : "Agents"} */}
                    </span>
                    {text}
            </span>
        </>
    )
}