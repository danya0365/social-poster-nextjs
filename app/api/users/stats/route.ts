import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';
import { NextResponse } from 'next/server';

export async function GET() {
  const repository = new DrizzleUserRepository();
  try {
    const stats = await repository.getStats();
    return NextResponse.json(stats);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
