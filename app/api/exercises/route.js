import { NextResponse } from "next/server";

const RAPID_API_KEY = '7a6c3831camsh484fbde284fa1a6p15e19cjsn370e0031f2fe';
const RAPID_API_HOST = 'exercisedb.p.rapidapi.com';

export async function GET() {
  try {
    const url = 'https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': RAPID_API_HOST
      }
    };

    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error('Failed to fetch exercises from ExerciseDB');
    }

    const exercises = await response.json();
    return NextResponse.json(exercises);
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    );
  }
}
