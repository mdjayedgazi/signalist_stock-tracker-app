// File: D:/APPS/stock_app/lib/actions/auth.actions.ts

// Define form data types
type AuthData = {
    email: string;
    password: string;
};

// Dummy sign-in function
export const signInWithEmail = async (data: AuthData) => {
    // Replace this with real API call
    if (data.email === "test@test.com" && data.password === "password123") {
        return { success: true, message: "Signed in successfully" };
    } else {
        return { success: false, message: "Invalid email or password" };
    }
};

// Optional: dummy sign-up function (if needed later)
export const signUpWithEmail = async (data: AuthData) => {
    // Replace this with real API call
    return { success: true, message: "Account created successfully" };
};
