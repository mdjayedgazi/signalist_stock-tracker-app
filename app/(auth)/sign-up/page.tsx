'use client'

import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";

import {
    INVESTMENT_GOALS,
    PREFERRED_INDUSTRIES,
    RISK_TOLERANCE_OPTIONS
} from "@/lib/constants";

// Define the form data type
type SignUpFormData = {
    fullName: string;
    email: string;
    password: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
};

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'BD',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        },
        mode: 'onBlur'
    });

    // Watch password value for strength meter
    const passwordValue = watch("password", "");

    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log("Form submitted:", data);
            // Add your API call or form submission logic here
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                {/* Full Name */}
                <InputField
                    name="fullName"
                    label="Full Name"
                    placeholder="Name"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: "Full Name is required",
                        minLength: { value: 4, message: "Full Name must be at least 4 characters" }
                    }}
                />

                {/* Email */}
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address"
                        },
                        minLength: { value: 8, message: "Email must be at least 8 characters" }
                    }}
                />

                {/* Password with automatic strength detection */}
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password} // only required/minLength errors
                    value={passwordValue}
                    validation={{
                        required: "Password is required",
                        minLength: { value: 6, message: "Password must be at least 6 characters" }
                    }}
                />


                {/* Country */}
                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />

                {/* Investment Goals */}
                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                {/* Risk Tolerance */}
                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                {/* Preferred Industry */}
                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="yellow-btn w-full mt-5"
                >
                    {isSubmitting ? 'Creating Account...' : 'Start Your Investing Journey'}
                </button>

                <FooterLink text="Already have an account" linkText="Sign-in" href="/sign-in" />
            </form>
        </>
    );
};

export default SignUp;
