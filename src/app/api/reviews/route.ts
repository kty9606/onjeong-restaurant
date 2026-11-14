import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import crypto from 'crypto';

function hashPassword(pin: string): string {
  return crypto.createHash('sha256').update(pin.trim()).digest('hex');
}

// GET: 리뷰 목록 조회 (비밀번호 제외)
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, nickname, rating, comment, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ reviews: data || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST: 리뷰 작성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nickname, rating, comment, pin } = body;

    if (!nickname || typeof nickname !== 'string' || nickname.trim().length === 0) {
      return NextResponse.json({ error: '닉네임을 입력해주세요.' }, { status: 400 });
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json({ error: '별점은 1점에서 5점 사이여야 합니다.' }, { status: 400 });
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length < 2) {
      return NextResponse.json({ error: '후기 내용을 2자 이상 입력해주세요.' }, { status: 400 });
    }

    if (!pin || typeof pin !== 'string' || pin.trim().length < 4) {
      return NextResponse.json({ error: '삭제용 4자리 비밀번호를 입력해주세요.' }, { status: 400 });
    }

    const passwordHash = hashPassword(pin);

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          nickname: nickname.trim().slice(0, 30),
          rating: numRating,
          comment: comment.trim(),
          password_hash: passwordHash,
        },
      ])
      .select('id, nickname, rating, comment, created_at')
      .single();

    if (error) {
      console.error('Error creating review:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ review: data, success: true }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE: 리뷰 삭제 (비밀번호 일치 확인 후 삭제)
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json().catch(() => ({}));
    const pin = body.pin;

    if (!id) {
      return NextResponse.json({ error: '리뷰 ID가 필요합니다.' }, { status: 400 });
    }

    if (!pin || typeof pin !== 'string') {
      return NextResponse.json({ error: '확인용 비밀번호를 입력해주세요.' }, { status: 400 });
    }

    // 비밀번호 확인을 위해 기존 리뷰 조회
    const { data: existing, error: fetchError } = await supabase
      .from('reviews')
      .select('id, password_hash')
      .eq('id', id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: '리뷰를 찾을 수 없습니다.' }, { status: 404 });
    }

    const inputHash = hashPassword(pin);
    if (existing.password_hash !== inputHash) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // 삭제 실행
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting review:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: '리뷰가 성공적으로 삭제되었습니다.' });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
