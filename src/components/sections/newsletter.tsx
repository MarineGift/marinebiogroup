// src/components/sections/newsletter.tsx

'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  // 뉴스레터 구독 mutation
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (email: string) => {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('구독에 실패했습니다');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('뉴스레터 구독이 완료되었습니다!');
      setEmail('');
    },
    onError: (error: Error) => {
      toast.error(error.message || '구독에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('이메일 주소를 입력해주세요');
      return;
    }

    subscribe(email);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">뉴스레터 구독</h2>
          <p className="text-gray-600 mb-8">
            해양 생물학 연구 및 보호 활동에 대한 최신 소식을 받아보세요.
          </p>
          
          <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 주소 입력"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isPending}
            />
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? '구독 중...' : '구독하기'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}