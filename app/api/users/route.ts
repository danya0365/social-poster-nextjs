import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const repository = new DrizzleUserRepository();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    if (email) {
      const user = await repository.getByEmail(email);
      if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
      return NextResponse.json(user);
    }

    const users = await repository.getAll();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const repository = new DrizzleUserRepository();
  try {
    const body = await req.json();
    const user = await repository.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
