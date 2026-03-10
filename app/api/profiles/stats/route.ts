import { DrizzleProfileRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const repository = new DrizzleProfileRepository();
  try {
    const stats = await repository.getStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
