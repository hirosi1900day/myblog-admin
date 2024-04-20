import { NextResponse } from 'next/server';
import client from "../../../lib/api/client";

export const GET = async () => {
  try {
    const { data: { items } } = await client.get('/items');
    return NextResponse.json({ message: 'タスク取得成功', tasks: items });
  } catch {
    return NextResponse.json({ message: 'タスク取得失敗' }, { status: 500 });
  }
};

export const dynamic = 'force-dynamic';