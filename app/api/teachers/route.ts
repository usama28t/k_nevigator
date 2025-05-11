import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get query parameters for filtering
    const url = new URL(req.url);
    const designation = url.searchParams.get('designation');
    const subject = url.searchParams.get('subject');
    const search = url.searchParams.get('search');

    // Build filter object based on query parameters
    const filter: any = {};
    if (designation) filter.designation = designation;
    if (subject) filter.subjects = { $in: [subject] };
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    // Get teachers data from MongoDB
    const teachers = await db.collection('teachers').find(filter).toArray();

    return NextResponse.json(teachers);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch teachers data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Get teacher data from request body
    const teacherData = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'designation', 'department', 'subjects', 'email', 'office', 'officeHours'];
    for (const field of requiredFields) {
      if (!teacherData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Ensure subjects is an array
    if (!Array.isArray(teacherData.subjects)) {
      teacherData.subjects = [teacherData.subjects];
    }
    
    // Check if a teacher with the same email already exists
    const existingTeacher = await db.collection('teachers').findOne({ email: teacherData.email });
    if (existingTeacher) {
      return NextResponse.json(
        { error: 'A teacher with this email already exists' },
        { status: 400 }
      );
    }
    
    // Insert teacher into MongoDB
    const result = await db.collection('teachers').insertOne({
      ...teacherData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Teacher created successfully' 
    });
  } catch (error) {
    console.error('Error creating teacher:', error);
    return NextResponse.json(
      { error: 'Failed to create teacher' },
      { status: 500 }
    );
  }
}