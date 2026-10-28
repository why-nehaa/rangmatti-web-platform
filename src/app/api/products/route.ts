import { NextResponse } from 'next/server';
import { sampleProducts } from '@/data/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const collection = searchParams.get('collection');

  let results = sampleProducts;
  if (category && category !== 'All') {
    results = results.filter((p) => p.category === category);
  }
  if (collection && collection !== 'All') {
    results = results.filter((p) => p.collection === collection);
  }

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results,
  });
}
