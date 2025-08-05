'use client';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function ContactPage() {
  const supabase = createClientComponentClient();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const domain = new URL(window.location.href).hostname;

    const { error } = await supabase.from('inquiry').insert([
      {
        name: form.name,
        email: form.email,
        message: form.message,
        source_page: window.location.href,
        domain: domain,
      },
    ]);

    if (error) {
      console.error(error.message);
      setError(true);
      setSuccess(false);
    } else {
      setSuccess(true);
      setError(false);
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">문의하기</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="내용"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">전송</button>
      </form>

      {success && (
        <p className="text-green-600 mt-4">✅ 전송되었습니다.</p>
      )}
      {error && (
        <p className="text-red-600 mt-4">❌ 오류가 발생했습니다.</p>
      )}
    </div>
  );
}
