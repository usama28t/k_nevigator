import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get query parameters for filtering
    const url = new URL(req.url);
    const day = url.searchParams.get('day');
    const semester = url.searchParams.get('semester');
    const teacher = url.searchParams.get('teacher');
    const room = url.searchParams.get('room');

    // Build filter object based on query parameters
    const filter: any = {};
    if (day) filter.day = day;
    if (semester) filter.semester = parseInt(semester);
    if (teacher) filter.teacher = { $regex: teacher, $options: 'i' };
    if (room) filter.room = { $regex: room, $options: 'i' };

    // Get timetable data from MongoDB
    const timetables = await db.collection('timetables').find(filter).toArray();

    return NextResponse.json(timetables);
  } catch (error) {
    console.error('Error fetching timetable:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timetable data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Get timetable data from request body
    const timetableData = await req.json();
    
    // Validate required fields
    const requiredFields = ['course', 'title', 'day', 'time', 'room', 'teacher', 'semester'];
    for (const field of requiredFields) {
      if (!timetableData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Insert timetable entry into MongoDB
    const result = await db.collection('timetables').insertOne({
      ...timetableData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Timetable entry created successfully' 
    });
  } catch (error) {
    console.error('Error creating timetable entry:', error);
    return NextResponse.json(
      { error: 'Failed to create timetable entry' },
      { status: 500 }
    );
  }
}