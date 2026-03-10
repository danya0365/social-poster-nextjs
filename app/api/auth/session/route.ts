import { SessionService } from '@/src/application/use-cases/auth/SessionService';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const session = await SessionService.getSession();
    if (!session) {
      return NextResponse.json(null);
    }
    return NextResponse.json(session);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
