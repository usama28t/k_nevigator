// Connect to the k_navigator database
db = db.getSiblingDB('k_navigator');

// Drop existing collections if they exist
db.users.drop();
db.courses.drop();
db.teachers.drop();
db.locations.drop();
db.timetable.drop();

// Create admin user with hashed password (kashmala123)
db.users.insertOne({
  username: 'kashmala',
  // Password is hashed using bcrypt with salt rounds of 10
  password: '$2a$10$8F9RPyQHKtgXGGWoqO3Dw.YHKhGdwXV5E3Vvr1mZzKxrRQLkLbXRO',
  name: 'Kashmala',
  email: 'admin@k-navigator.com',
  role: 'admin',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create collections with validation
db.createCollection('courses', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['code', 'title', 'creditHours', 'degreeCode', 'semester', 'type'],
      properties: {
        code: { bsonType: 'string' },
        title: { bsonType: 'string' },
        creditHours: { bsonType: 'number' },
        prerequisites: { bsonType: 'array' },
        degreeCode: { bsonType: 'string' },
        semester: { bsonType: 'number' },
        type: { bsonType: 'string' }
      }
    }
  }
});

db.createCollection('teachers', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'designation', 'department', 'subjects', 'email', 'office', 'officeHours'],
      properties: {
        name: { bsonType: 'string' },
        designation: { bsonType: 'string' },
        department: { bsonType: 'string' },
        subjects: { bsonType: 'array' },
        email: { bsonType: 'string' },
        office: { bsonType: 'string' },
        officeHours: { bsonType: 'string' }
      }
    }
  }
});

db.createCollection('locations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'building', 'floor', 'type'],
      properties: {
        name: { bsonType: 'string' },
        building: { bsonType: 'string' },
        floor: { bsonType: 'string' },
        type: { bsonType: 'string' },
        capacity: { bsonType: 'number' },
        facilities: { bsonType: 'string' },
        occupant: { bsonType: 'string' }
      }
    }
  }
});

db.createCollection('timetable', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['course', 'title', 'day', 'time', 'room', 'teacher', 'semester'],
      properties: {
        course: { bsonType: 'string' },
        title: { bsonType: 'string' },
        day: { bsonType: 'string' },
        time: { bsonType: 'string' },
        room: { bsonType: 'string' },
        teacher: { bsonType: 'string' },
        semester: { bsonType: 'number' }
      }
    }
  }
});

// Create indexes
db.courses.createIndex({ code: 1 }, { unique: true });
db.teachers.createIndex({ email: 1 }, { unique: true });
db.locations.createIndex({ name: 1 });
db.timetable.createIndex({ course: 1, day: 1, time: 1 });

print('Database initialization completed successfully');