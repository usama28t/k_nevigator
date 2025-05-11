import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Course } from '@/lib/models/course';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get query parameters for filtering
    const url = new URL(req.url);
    const degreeCode = url.searchParams.get('degree');
    const semester = url.searchParams.get('semester');
    const type = url.searchParams.get('type');

    // Build filter object based on query parameters
    const filter: any = {};
    if (degreeCode) filter.degreeCode = degreeCode;
    if (semester) filter.semester = parseInt(semester);
    if (type) filter.type = type;

    // Get courses data from MongoDB
    const courses = await db.collection('courses').find(filter).toArray();

    return NextResponse.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Get course data from request body
    const courseData = await req.json();
    
    // Validate required fields
    const requiredFields = ['code', 'title', 'creditHours', 'degreeCode', 'semester', 'type'];
    for (const field of requiredFields) {
      if (!courseData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Check if course code already exists
    const existingCourse = await db.collection('courses').findOne({ code: courseData.code });
    if (existingCourse) {
      return NextResponse.json(
        { error: 'A course with this code already exists' },
        { status: 400 }
      );
    }
    
    // Insert course into MongoDB
    const result = await db.collection('courses').insertOne({
      ...courseData,
      prerequisites: courseData.prerequisites || [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Course created successfully' 
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}