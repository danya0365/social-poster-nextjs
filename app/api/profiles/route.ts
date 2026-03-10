import { DrizzleProfileRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const repository = new DrizzleProfileRepository();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  try {
    if (userId) {
      const profiles = await repository.getByUserId(userId);
      return NextResponse.json(profiles);
    }

    const profiles = await repository.getAll();
    return NextResponse.json(profiles);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const repository = new DrizzleProfileRepository();
  try {
    const body = await req.json();
    const profile = await repository.create(body);
    return NextResponse.json(profile, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const repository = new DrizzleProfileRepository();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'userId is required for bulk delete' }, { status: 400 });
  }

  try {
    const success = await repository.deleteByUserId(userId);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
