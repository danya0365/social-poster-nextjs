import { DrizzleUserRepository } from '@/src/infrastructure/repositories/drizzle/DrizzleUserRepository';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleUserRepository();
  const { id } = await params;

  try {
    const user = await repository.getById(id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleUserRepository();
  const { id } = await params;

  try {
    const body = await req.json();
    const user = await repository.update(id, body);
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const repository = new DrizzleUserRepository();
  const { id } = await params;

  try {
    const success = await repository.delete(id);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
