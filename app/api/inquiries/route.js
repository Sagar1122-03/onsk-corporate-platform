import { MongoClient, ServerApiVersion } from "mongodb";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

let clientPromise;

function getClientPromise(uri) {
  if (!clientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    clientPromise = client.connect();
  }

  return clientPromise;
}

export async function POST(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const { fullName, email, phone, company, service, message, source } =
    payload ?? {};
  if (
    typeof fullName !== "string" ||
    !fullName.trim() ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof message !== "string" ||
    !message.trim()
  ) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Please provide a full name, a valid email address, and a message.",
      },
      { status: 400 },
    );
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI is not configured; inquiry could not be saved.");
    return NextResponse.json(
      { success: false, message: "Inquiry service is not configured." },
      { status: 500 },
    );
  }

  try {
    const client = await getClientPromise(uri);
    await client.db("companyDB").collection("inquiries").insertOne({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: typeof phone === "string" ? phone : "",
      company: typeof company === "string" ? company : "",
      service: typeof service === "string" ? service : "General Inquiry",
      message: message.trim(),
      source: typeof source === "string" ? source : "Web Form",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry saved successfully.",
    });
  } catch (error) {
    console.error("API error saving inquiry:", error);
    return NextResponse.json(
      { success: false, message: "Server processing error." },
      { status: 500 },
    );
  }
}
