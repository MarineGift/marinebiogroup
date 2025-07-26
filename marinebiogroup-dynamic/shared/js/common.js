/**
 * 공통 JavaScript 유틸리티
 * MarineBioGroup 전체 웹사이트에서 사용되는 공통 함수들
 */

// 네임스페이스 생성
window.MarineBioGroup = window.MarineBioGroup || {};

/**
 * API 관련 공통 함수들
 */
window.MarineBioGroup.API = {
    // 기본 API URL
    BASE_URL: window.location.origin + '/api',
    
    /**
     * API 요청을 처리하는 공통 함수
     * @param {string} endpoint - API 엔드포인트 
     * @param {Object} options - fetch 옵션
     * @returns {Promise} - API 응답
     */
    async request(endpoint, options = {}) {
        const url = this.BASE_URL + endpoint;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const finalOptions = {
            ...defaultOptions,
            ...options,
            headers: {
                ...defaultOptions.headers,
                ...options.headers
            }
        };

        console.log('API Request:', url, finalOptions);

        try {
            const response = await fetch(url, finalOptions);
            const contentType = response.headers.get('content-type');
            
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { error: text || `HTTP ${response.status}` };
                }
            }

            if (!response.ok) {
                throw new Error(data.error || data.message || `Request failed: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },

    /**
     * GET 요청
     */
    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    },

    /**
     * POST 요청
     */
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * PUT 요청
     */
    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'PUT',
            body: JSON.stringify(data)
        });
    },

    /**
     * DELETE 요청
     */
    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
};

/**
 * UI 관련 공통 함수들
 */
window.MarineBioGroup.UI = {
    /**
     * 로딩 상태 표시
     * @param {boolean} show - 로딩 표시 여부
     * @param {string} containerId - 로딩을 표시할 컨테이너 ID
     */
    showLoading(show, containerId = 'loading-overlay') {
        const loadingElement = document.getElementById(containerId);
        if (loadingElement) {
            loadingElement.style.display = show ? 'flex' : 'none';
        }
    },

    /**
     * 알림 메시지 표시
     * @param {string} message - 메시지 내용
     * @param {string} type - 메시지 타입 (success, error, warning, info)
     * @param {number} duration - 표시 시간 (밀리초)
     */
    showNotification(message, type = 'success', duration = 5000) {
        // 알림 컨테이너 생성 또는 찾기
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 1rem;
                right: 1rem;
                z-index: 1100;
            `;
            document.body.appendChild(container);
        }

        // 알림 엘리먼트 생성
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 1rem 1.5rem;
            margin-bottom: 0.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            min-width: 300px;
            animation: slideIn 0.3s ease-out;
            border-left: 4px solid ${this.getNotificationColor(type)};
        `;
        
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                font-size: 1.25rem;
                cursor: pointer;
                color: #6b7280;
                padding: 0;
                line-height: 1;
            ">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // 자동 제거
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, duration);
    },

    /**
     * 알림 타입별 색상 반환
     */
    getNotificationColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        return colors[type] || colors.info;
    },

    /**
     * 폼 유효성 검사
     * @param {HTMLFormElement} form - 검사할 폼 엘리먼트
     * @returns {boolean} - 유효성 검사 결과
     */
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showFieldError(input, '필수 입력 항목입니다.');
                isValid = false;
            } else {
                this.clearFieldError(input);
                
                // 이메일 유효성 검사
                if (input.type === 'email' && !this.isValidEmail(input.value)) {
                    this.showFieldError(input, '올바른 이메일 형식이 아닙니다.');
                    isValid = false;
                }
            }
        });

        return isValid;
    },

    /**
     * 필드 에러 표시
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        field.style.borderColor = '#ef4444';
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    },

    /**
     * 필드 에러 제거
     */
    clearFieldError(field) {
        field.style.borderColor = '#e5e7eb';
        
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    },

    /**
     * 이메일 유효성 검사
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};

/**
 * 유틸리티 함수들
 */
window.MarineBioGroup.Utils = {
    /**
     * HTML 이스케이프
     * @param {string} text - 이스케이프할 텍스트
     * @returns {string} - 이스케이프된 텍스트
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * 날짜 포맷팅 (한국어)
     * @param {string|Date} date - 포맷할 날짜
     * @returns {string} - 포맷된 날짜 문자열
     */
    formatDate(date) {
        return new Date(date).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * 날짜/시간 포맷팅 (한국어)
     * @param {string|Date} date - 포맷할 날짜
     * @returns {string} - 포맷된 날짜/시간 문자열
     */
    formatDateTime(date) {
        return new Date(date).toLocaleString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * 문자열 자르기 (말줄임표 추가)
     * @param {string} text - 자를 문자열
     * @param {number} maxLength - 최대 길이
     * @returns {string} - 잘린 문자열
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    /**
     * 숫자를 천 단위로 콤마 추가
     * @param {number} number - 포맷할 숫자
     * @returns {string} - 포맷된 숫자 문자열
     */
    formatNumber(number) {
        return number.toLocaleString('ko-KR');
    },

    /**
     * 디바운스 함수
     * @param {Function} func - 실행할 함수
     * @param {number} delay - 지연 시간 (밀리초)
     * @returns {Function} - 디바운스된 함수
     */
    debounce(func, delay) {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    /**
     * 쓰로틀 함수
     * @param {Function} func - 실행할 함수
     * @param {number} delay - 지연 시간 (밀리초)
     * @returns {Function} - 쓰로틀된 함수
     */
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
};

/**
 * 페이지네이션 관련 함수들
 */
window.MarineBioGroup.Pagination = {
    /**
     * 페이지네이션 HTML 생성
     * @param {number} currentPage - 현재 페이지
     * @param {number} totalPages - 전체 페이지 수
     * @param {Function} onPageChange - 페이지 변경 콜백
     * @returns {string} - 페이지네이션 HTML
     */
    render(currentPage, totalPages, onPageChange) {
        if (totalPages <= 1) return '';

        let html = '<div class="pagination">';
        
        // 이전 버튼
        html += `<button onclick="${onPageChange.name}(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>이전</button>`;
        
        // 페이지 번호들
        const maxVisiblePages = 5;
        let startPage = Math.max(1, Math.min(totalPages - maxVisiblePages + 1, currentPage - Math.floor(maxVisiblePages / 2)));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        for (let page = startPage; page <= endPage; page++) {
            html += `<button onclick="${onPageChange.name}(${page})" ${page === currentPage ? 'class="active"' : ''}>${page}</button>`;
        }
        
        // 다음 버튼
        html += `<button onclick="${onPageChange.name}(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>다음</button>`;
        
        html += '</div>';
        return html;
    }
};

/**
 * 폼 헬퍼 함수들
 */
window.MarineBioGroup.Form = {
    /**
     * 폼 데이터를 객체로 변환
     * @param {HTMLFormElement} form - 폼 엘리먼트
     * @returns {Object} - 폼 데이터 객체
     */
    serialize(form) {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            // 체크박스나 다중 선택의 경우 배열로 처리
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        return data;
    },

    /**
     * 폼 리셋
     * @param {HTMLFormElement} form - 리셋할 폼
     */
    reset(form) {
        form.reset();
        
        // 에러 메시지 제거
        form.querySelectorAll('.field-error').forEach(error => error.remove());
        
        // 필드 스타일 초기화
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.style.borderColor = '#e5e7eb';
        });
    }
};

// CSS 애니메이션 추가
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-container {
        position: fixed;
        top: 1rem;
        right: 1rem;
        z-index: 1100;
    }
`;
document.head.appendChild(style);

// 공통 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', function() {
    console.log('MarineBioGroup 공통 JavaScript 로드됨');
    
    // 모든 폼에 대해 기본 유효성 검사 설정
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!window.MarineBioGroup.UI.validateForm(form)) {
                e.preventDefault();
            }
        });
    });
});