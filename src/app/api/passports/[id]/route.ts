import { NextResponse } from 'next/server';
import { samplePassports } from '@/data/passports';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const passportId = decodeURIComponent(params.id).toUpperCase();
  const passport = samplePassports[passportId];

  if (!passport) {
    return NextResponse.json(
      { error: 'Passport identifier not found in RangMitti ledger' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: passport,
  });
}
