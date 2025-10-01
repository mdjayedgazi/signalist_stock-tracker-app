import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose"

export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({ status: "Connected to MongoDB ✅" });
    } catch (error: any) {
        return NextResponse.json(
            { status: "Failed to connect ❌", error: error.message },
            { status: 500 }
        );
    }
}
