function PanelContainer({providers}) {
    return (
        <div className="container">
            {providers.map((p, index) => (
                <Panel key={index} provider={p} />
            ))}
        </div>
    )
}