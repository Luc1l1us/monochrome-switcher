import {unstable_PasswordToggleField as PasswordToggleField} from "radix-ui"
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

const PasswordField = ({
    name, value, onChange, placeholder
}) => (
        <PasswordToggleField.Root>
            <div className="Root">
                <PasswordToggleField.Input 
                    className="Input" 
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete="off"
                />
                <PasswordToggleField.Toggle 
                    className="Toggle"
                    aria-label="Show or hide API Key"
                >
                    <PasswordToggleField.Icon
                        visible={<EyeOpenIcon />}
                        hidden={<EyeClosedIcon />}
                    />
                </PasswordToggleField.Toggle>
            </div>
        </PasswordToggleField.Root>
)

export default PasswordField;