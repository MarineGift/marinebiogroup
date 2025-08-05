import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // 답변 로직 구현
    // 예: 데이터베이스에 답변 저장, 이메일 발송 등
    
    return NextResponse.json(
      { message: '답변이 성공적으로 전송되었습니다.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reply error:', error);
    return NextResponse.json(
      { error: '답변 전송 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}