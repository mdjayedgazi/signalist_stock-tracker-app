import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

interface FormInputProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    register?: any;
    validation?: any;
    error?: { message: string };
    disabled?: boolean;
    value?: string;
}

const InputField = ({
                        name,
                        label,
                        placeholder,
                        type = "text",
                        register,
                        error,
                        validation,
                        disabled,
                        value,
                    }: FormInputProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong" | "">("");

    const checkPasswordStrength = (password: string): "Weak" | "Medium" | "Strong" | "" => {
        if (!password) return "";

        if (/\s/.test(password)) return "Weak";

        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=(?:.*[@$!%*?&].*){2,}).{12,}$/;
        const mediumRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        const weakRegex = /^.{6,}$/;

        if (strongRegex.test(password)) return "Strong";
        if (mediumRegex.test(password)) return "Medium";
        if (weakRegex.test(password)) return "Weak";
        return "Weak";
    };

    useEffect(() => {
        if (type === "password" && value) {
            setStrength(checkPasswordStrength(value));
        } else {
            setStrength("");
        }
    }, [value, type]);

    const getColor = () => {
        switch (strength) {
            case "Weak": return "red-500";
            case "Medium": return "yellow-400";
            case "Strong": return "green-500";
            default: return "gray-700";
        }
    };

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;

    return (
        <div className="space-y-2 relative">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>

            <Input
                id={name}
                type={inputType}
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                className={cn("form-input-field", {
                    "opacity-50 cursor-not-allowed": disabled,
                    "pr-10": type === "password",
                })}
                {...register(name, validation)}
            />

            {type === "password" && (
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-10 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}

            {/* Password Strength Bar */}
            {strength && (
                <div className="mt-1">
                    <div className="h-2 w-full rounded-lg bg-gray-700 overflow-hidden">
                        <div
                            className={`h-2 bg-${getColor()} transition-all duration-300`}
                            style={{
                                width:
                                    strength === "Weak"
                                        ? "33%"
                                        : strength === "Medium"
                                            ? "66%"
                                            : "100%",
                            }}
                        />
                    </div>
                    <p className={`text-sm font-medium mt-1 text-${getColor()}`}>
                        {strength}
                    </p>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
