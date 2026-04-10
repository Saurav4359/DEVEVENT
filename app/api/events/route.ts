import { v2 as cloudinary } from "cloudinary";
import { Event } from "@/database";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();
    let event;
    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json({ messgae: "Invalid Json format", status: 400 });
    }
    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { message: "Images file required " },
        { status: 400 },
      );
    }

    let tags = JSON.parse(formData.get('tags') as string);
    let agenda = JSON.parse(formData.get('agenda') as string);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: "image", folder: "DevEvent" },
          (error, results) => {
            if (error) return reject(error);
            resolve(results);
          },
        )
        .end(buffer);
    });
    event.image = (uploadResult as { secure_url: string }).secure_url;
    const createdEvents = await Event.create({...event, tags :tags, agenda : agenda});


    NextResponse.json(
      { message: "Event created successfully", event: createdEvents },
      { status: 201 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Event creation Failed",
      error: e instanceof Error ? e.message : "Unknown",
    });
  }
}

export async function GET() {
    try{ 
        await connectDB();
        const events = (await Event.find()).sort();
        return NextResponse.json({message : "Events fetched successfully", events},{status : 200});

    }catch(e) {
        return NextResponse.json({message : "Events fetching failed"}, { status : 500});
    }
}