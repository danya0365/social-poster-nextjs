import { DrizzleProfileRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleProfileRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleProfileRepository();
  const { id } = await params;

  try {
    const profile = await repository.getById(id);
    if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleProfileRepository();
  const { id } = await params;

  try {
    const body = await req.json();
    const profile = await repository.update(id, body);
    return NextResponse.json(profile);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleProfileRepository();
  const { id } = await params;

  try {
    const success = await repository.delete(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
