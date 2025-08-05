'use client';

import { useState, useEffect } from 'react';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'pending' | 'answered' | 'closed';
  createdAt: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
}

interface ReplyData {
  subject: string;
  message: string;
}

export default function InquiryManagement() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyData, setReplyData] = useState<ReplyData>({ subject: '', message: '' });
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // 샘플 데이터 초기화
  useEffect(() => {
    const sampleInquiries: Inquiry[] = [
      {
        id: '1',
        name: '김철수',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        subject: '제품 문의',
        message: '마린기프트 비누에 대해 자세히 알고 싶습니다. 성분과 효능에 대해 설명해주세요.',
        status: 'pending',
        createdAt: '2024-01-15T10:30:00Z',
        category: '제품문의',
        priority: 'high'
      },
      {
        id: '2',
        name: '이영희',
        email: 'lee@example.com',
        phone: '010-9876-5432',
        subject: '배송 관련 문의',
        message: '주문한 상품이 언제 도착하나요? 배송 추적이 안되고 있어서 문의드립니다.',
        status: 'answered',
        createdAt: '2024-01-14T14:20:00Z',
        category: '배송문의',
        priority: 'medium'
      },
      {
        id: '3',
        name: '박민수',
        email: 'park@example.com',
        phone: '010-5555-1234',
        subject: '환불 요청',
        message: '구매한 제품에 불만이 있어 환불을 요청합니다. 절차를 안내해주세요.',
        status: 'pending',
        createdAt: '2024-01-13T09:15:00Z',
        category: '환불문의',
        priority: 'high'
      },
      {
        id: '4',
        name: '정수진',
        email: 'jung@example.com',
        phone: '010-7777-8888',
        subject: '사용법 문의',
        message: '마린크림바 사용법을 자세히 알려주세요. 얼마나 자주 사용해야 하나요?',
        status: 'closed',
        createdAt: '2024-01-12T16:45:00Z',
        category: '사용법문의',
        priority: 'low'
      },
      {
        id: '5',
        name: '최동욱',
        email: 'choi@example.com',
        phone: '010-3333-9999',
        subject: '대량 구매 문의',
        message: '사업용으로 대량 구매를 하고 싶습니다. 할인 혜택이 있는지 문의드립니다.',
        status: 'pending',
        createdAt: '2024-01-11T11:30:00Z',
        category: '대량구매',
        priority: 'medium'
      }
    ];
    setInquiries(sampleInquiries);
  }, []);

  // 필터링된 문의 목록
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesStatus = filterStatus === 'all' || inquiry.status === filterStatus;
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // 문의 상세보기
  const handleViewInquiry = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  // 답변 모달 열기
  const handleReply = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setReplyData({
      subject: `Re: ${inquiry.subject}`,
      message: `${inquiry.name}님께,\n\n문의주신 내용에 대해 답변드립니다.\n\n`
    });
    setIsReplyModalOpen(true);
  };

  // 메일 전송
  const handleSendReply = async () => {
    if (!selectedInquiry) return;

    setLoading(true);
    try {
      // 실제 구현에서는 이메일 API 호출
      await new Promise(resolve => setTimeout(resolve, 2000)); // 시뮬레이션
      
      // 상태 업데이트
      setInquiries(prev => prev.map(inquiry => 
        inquiry.id === selectedInquiry.id 
          ? { ...inquiry, status: 'answered' as const }
          : inquiry
      ));

      alert('답변이 성공적으로 전송되었습니다.');
      setIsReplyModalOpen(false);
      setReplyData({ subject: '', message: '' });
    } catch (error) {
      alert('메일 전송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 상태 변경
  const handleStatusChange = (inquiryId: string, newStatus: Inquiry['status']) => {
    setInquiries(prev => prev.map(inquiry => 
      inquiry.id === inquiryId ? { ...inquiry, status: newStatus } : inquiry
    ));
  };

  // 우선순위 색상
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // 상태 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-orange-600 bg-orange-100';
      case 'answered': return 'text-blue-600 bg-blue-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">고객문의 관리</h1>
          <p className="text-gray-600">고객들의 문의사항을 확인하고 답변을 관리합니다.</p>
        </div>

        {/* 필터 및 검색 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="이름, 이메일, 제목으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="answered">답변완료</option>
                <option value="closed">종료</option>
              </select>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-blue-600">
              {inquiries.filter(i => i.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">대기중</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-green-600">
              {inquiries.filter(i => i.status === 'answered').length}
            </div>
            <div className="text-sm text-gray-600">답변완료</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-600">
              {inquiries.filter(i => i.status === 'closed').length}
            </div>
            <div className="text-sm text-gray-600">종료</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-purple-600">{inquiries.length}</div>
            <div className="text-sm text-gray-600">전체 문의</div>
          </div>
        </div>

        {/* 문의 목록 테이블 */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    문의내용
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    우선순위
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    등록일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleViewInquiry(inquiry)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{inquiry.name}</div>
                        <div className="text-sm text-gray-500">{inquiry.email}</div>
                        <div className="text-sm text-gray-500">{inquiry.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.subject}</div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {inquiry.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {inquiry.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(inquiry.priority)}`}>
                        {inquiry.priority === 'high' ? '높음' : inquiry.priority === 'medium' ? '보통' : '낮음'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(inquiry.status)}`}>
                        {inquiry.status === 'pending' ? '대기중' : inquiry.status === 'answered' ? '답변완료' : '종료'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReply(inquiry);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        답변
                      </button>
                      <select
                        value={inquiry.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(inquiry.id, e.target.value as Inquiry['status']);
                        }}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="pending">대기중</option>
                        <option value="answered">답변완료</option>
                        <option value="closed">종료</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredInquiries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">검색 결과가 없습니다.</div>
            </div>
          )}
        </div>

        {/* 상세보기 모달 */}
        {isModalOpen && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">문의 상세보기</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                      <div className="text-sm text-gray-900">{selectedInquiry.name}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                      <div className="text-sm text-gray-900">{selectedInquiry.email}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                      <div className="text-sm text-gray-900">{selectedInquiry.phone}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">등록일</label>
                      <div className="text-sm text-gray-900">
                        {new Date(selectedInquiry.createdAt).toLocaleString('ko-KR')}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <div className="text-sm text-gray-900">{selectedInquiry.subject}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">문의내용</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
                      {selectedInquiry.message}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                        {selectedInquiry.category}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedInquiry.priority)}`}>
                        {selectedInquiry.priority === 'high' ? '높음' : selectedInquiry.priority === 'medium' ? '보통' : '낮음'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedInquiry.status)}`}>
                        {selectedInquiry.status === 'pending' ? '대기중' : selectedInquiry.status === 'answered' ? '답변완료' : '종료'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    닫기
                  </button>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      handleReply(selectedInquiry);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    답변하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 답변 모달 */}
        {isReplyModalOpen && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-gray-900">답변 작성</h2>
                  <button
                    onClick={() => setIsReplyModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">받는 사람</label>
                    <div className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                      {selectedInquiry.name} ({selectedInquiry.email})
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                    <input
                      type="text"
                      value={replyData.subject}
                      onChange={(e) => setReplyData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">답변 내용</label>
                    <textarea
                      value={replyData.message}
                      onChange={(e) => setReplyData(prev => ({ ...prev, message: e.target.value }))}
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="답변을 입력하세요..."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setIsReplyModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    disabled={loading}
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSendReply}
                    disabled={loading || !replyData.subject.trim() || !replyData.message.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? '전송 중...' : '답변 전송'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}