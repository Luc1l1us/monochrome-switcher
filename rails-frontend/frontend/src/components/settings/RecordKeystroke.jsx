import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";

const RecordKeystroke = ({name, value, onChange, placeholder}) => (
    <PasswordToggleField.Root
        visible="true"
    >
        <div className="pref-text">
            {name}
        </div>
        <div className="Root-keystroke">
            <PasswordToggleField.Input 
                className="Input" 
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
            />
        </div>
    </PasswordToggleField.Root>
)

export default RecordKeystroke;