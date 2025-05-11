import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Get query parameters for filtering
    const url = new URL(req.url);
    const type = url.searchParams.get('type');
    const building = url.searchParams.get('building');
    const floor = url.searchParams.get('floor');
    const search = url.searchParams.get('search');

    // Build filter object based on query parameters
    const filter: any = {};
    if (type) filter.type = type;
    if (building) filter.building = building;
    if (floor) filter.floor = floor;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { occupant: { $regex: search, $options: 'i' } }
      ];
    }

    // Get locations data from MongoDB
    const locations = await db.collection('locations').find(filter).toArray();

    return NextResponse.json(locations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Get location data from request body
    const locationData = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'building', 'floor', 'type'];
    for (const field of requiredFields) {
      if (!locationData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Additional validation based on location type
    if (locationData.type === 'classroom' || locationData.type === 'lab') {
      if (!locationData.capacity) {
        return NextResponse.json(
          { error: 'Capacity is required for classrooms and labs' },
          { status: 400 }
        );
      }
    } else if (locationData.type === 'office' && !locationData.occupant) {
      return NextResponse.json(
        { error: 'Occupant is required for offices' },
        { status: 400 }
      );
    }
    
    // Insert location into MongoDB
    const result = await db.collection('locations').insertOne({
      ...locationData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Location created successfully' 
    });
  } catch (error) {
    console.error('Error creating location:', error);
    return NextResponse.json(
      { error: 'Failed to create location' },
      { status: 500 }
    );
  }
}