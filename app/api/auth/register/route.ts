import { ServerAuthRepository } from '@/src/infrastructure/repositories/server/ServerAuthRepository';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const repository = new ServerAuthRepository();
    const result = await repository.register(data);
    
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
