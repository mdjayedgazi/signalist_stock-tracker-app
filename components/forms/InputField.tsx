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

    // ✅ Correct strength checker
    const checkPasswordStrength = (password: string): "Weak" | "Medium" | "Strong" | "" => {
        if (!password) return "";

        // ❌ No spaces allowed
        if (/\s/.test(password)) return "Weak";

        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[^A-Za-z0-9]/.test(password);

        // Strong: 12+ chars + all 4 types
        if (password.length >= 12 && hasUpper && hasLower && hasNumber && hasSpecial) {
            return "Strong";
        }

        // Medium: 8+ chars + at least 2 types
        if (password.length >= 8 && [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length >= 2) {
            return "Medium";
        }

        // Weak: 6+ chars
        if (password.length >= 6) {
            return "Weak";
        }

        return "Weak";
    };

    useEffect(() => {
        if (type === "password" && value !== undefined) {
            setStrength(checkPasswordStrength(value));
        } else {
            setStrength("");
        }
    }, [value, type]);

    // ✅ Tailwind-safe class names
    const getColorClasses = () => {
        switch (strength) {
            case "Weak":
                return { bar: "bg-red-500", text: "text-red-500" };
            case "Medium":
                return { bar: "bg-yellow-400", text: "text-yellow-400" };
            case "Strong":
                return { bar: "bg-green-500", text: "text-green-500" };
            default:
                return { bar: "bg-gray-700", text: "text-gray-700" };
        }
    };

    const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
    const { bar, text } = getColorClasses();

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
                            className={`h-2 ${bar} transition-all duration-300`}
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
                    <p className={`text-sm font-medium mt-1 ${text}`}>{strength}</p>
                </div>
            )}

            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
