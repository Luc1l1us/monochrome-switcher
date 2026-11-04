import { useCallback, useEffect, useState } from "react";
import { useRecordHotkeys } from "react-hotkeys-hook";

const RecordKeystroke = ({name, shortcut, onChange}) => {
    const [keys, {start, stop, resetKeys, isRecording}] = useRecordHotkeys();
    const [recordedShortcut, setrecordedShortcut] = useState(shortcut | "")
    
    useEffect(() => {
        setrecordedShortcut(shortcut || "")
    }, [shortcut])

    const handleStart = () => {
        resetKeys();
        start();
    }

    const handleFinish = useCallback(() => {
        if (keys.size === 0) return;
        const shortcut = [...keys].join("+")
        setrecordedShortcut(shortcut)
        onChange(shortcut)
        stop();
    }, [keys, onChange, stop])

    return (
        <div>
            <div className="pref-text">
                {name}
            </div>
                <input
                    className="Root-keystroke"
                    type="text"
                    readOnly
                    value={recordedShortcut}
                    onClick={handleStart}
                    onBlur={() => {
                        if (isRecording) handleFinish();
                    }}
                />
        </div>
    )
}

export default RecordKeystroke;