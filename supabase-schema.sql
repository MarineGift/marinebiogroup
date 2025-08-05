-- ⚠️ 경고: 이 스크립트는 기존의 모든 데이터를 삭제합니다!
-- 실행하기 전에 필요한 데이터를 백업하세요.

-- =====================================================
-- 1단계: 기존 테이블 및 관련 객체 삭제
-- =====================================================

-- Drop existing tables in reverse dependency order
DROP TABLE IF EXISTS admin_sessions CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS newsletter CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS carousels CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Drop custom functions if they exist
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;

-- Drop extension if needed (일반적으로 필요없음)
-- DROP EXTENSION IF EXISTS "uuid-ossp" CASCADE;

-- =====================================================
-- 2단계: 새 테이블 및 객체 생성
-- =====================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create contacts table for contact form submissions
CREATE TABLE contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    inquiry_type VARCHAR(100) DEFAULT 'General',
    message TEXT NOT NULL,
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletter subscriptions table
CREATE TABLE newsletter (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Create users table for admin and user management
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table for blog content
CREATE TABLE blog_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create news table for news content
CREATE TABLE news (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    excerpt TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image TEXT,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table for image gallery
CREATE TABLE gallery (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    category VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table for product showcase
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT,
    category VARCHAR(100),
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '{}'::jsonb,
    display_order INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create carousels table for homepage carousel
CREATE TABLE carousels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT,
    button_text VARCHAR(100),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    language VARCHAR(5) DEFAULT 'ko',
    site VARCHAR(100) DEFAULT 'marinebiogroup',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_sessions table for simple admin authentication
CREATE TABLE admin_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3단계: 인덱스 생성
-- =====================================================

-- Create indexes for better performance
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_newsletter_email ON newsletter(email);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_news_status ON news(status);
CREATE INDEX idx_news_slug ON news(slug);
CREATE INDEX idx_gallery_status ON gallery(status);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_carousels_active ON carousels(is_active);
CREATE INDEX idx_carousels_order ON carousels(display_order);

-- =====================================================
-- 4단계: 트리거 함수 및 트리거 생성
-- =====================================================

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at columns
CREATE TRIGGER update_contacts_updated_at 
    BEFORE UPDATE ON contacts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at 
    BEFORE UPDATE ON blog_posts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_updated_at 
    BEFORE UPDATE ON news 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at 
    BEFORE UPDATE ON gallery 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carousels_updated_at 
    BEFORE UPDATE ON carousels 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 5단계: 샘플 데이터 삽입
-- =====================================================

-- Insert admin user
INSERT INTO users (username, email, role, first_name, last_name) 
VALUES ('admin', 'admin@marinebiogroup.com', 'admin', 'Admin', 'User');

-- Insert sample carousel items
INSERT INTO carousels (title, description, image_url, link_url, button_text, display_order, is_active) VALUES
('혁신적인 해양 나노섬유 기술', '지속 가능한 뷰티와 라이프스타일을 위한 차세대 기술', 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80', '/technology', '기술 알아보기', 1, true),
('친환경 뷰티 제품', '해양에서 추출한 천연 성분으로 만든 프리미엄 뷰티 제품', 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80', '/products', '제품 보기', 2, true),
('지속 가능한 미래', 'MarineBioGroup과 함께 만들어가는 친환경 미래', 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80', '/about', '회사 소개', 3, true);

-- Insert sample products
INSERT INTO products (name, description, image_url, category, features, specifications, display_order) VALUES
('Marine Glow Serum', '해양 나노섬유가 함유된 프리미엄 글로우 세럼', 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Skincare', '["보습", "영양공급", "피부탄력"]', '{"volume": "30ml", "main_ingredient": "Marine Nano-Fiber", "usage": "Morning & Evening"}', 1),
('Ocean Fresh Cleanser', '깊은 바다의 미네랄이 담긴 순한 클렌저', 'https://images.unsplash.com/photo-1556228578-dd73a8dc71b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Skincare', '["깊은 세정", "수분유지", "민감성 피부"]', '{"volume": "150ml", "ph_level": "5.5", "skin_type": "All Types"}', 2),
('Aqua Life Essence', '해양 생명력을 담은 멀티 에센스', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'Skincare', '["영양공급", "수분공급", "안티에이징"]', '{"volume": "50ml", "concentration": "High", "effects": "Anti-aging & Moisturizing"}', 3);

-- Insert sample news
INSERT INTO news (title, content, excerpt, slug, featured_image, status) VALUES
('MarineBioGroup, 새로운 나노섬유 기술 개발 성공', '해양 생물학 연구를 통해 혁신적인 나노섬유 추출 기술을 개발했습니다. 이번 기술은 기존 대비 30% 향상된 효율성을 보이며, 환경에 미치는 영향을 최소화했습니다. 연구팀은 2년간의 집중적인 연구를 통해 이 성과를 달성했으며, 특히 해양 생태계를 보호하면서도 고품질의 나노섬유를 추출할 수 있는 방법을 개발했습니다.', '친환경적이고 지속 가능한 나노섬유 기술 개발에 성공했습니다.', 'new-nanofiber-technology-2024', 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'published'),
('글로벌 뷰티 시장 진출 계획 발표', '2024년 하반기부터 유럽과 북미 시장에 진출할 예정입니다. 첫 번째 목표는 독일과 프랑스의 프리미엄 뷰티 매장에 제품을 출시하는 것이며, 이를 위해 현지 파트너십을 구축하고 있습니다. 또한 미국 캘리포니아와 뉴욕 지역의 유기농 뷰티 전문점들과도 협의를 진행 중입니다.', '해외 시장 진출을 통한 글로벌 확장 계획을 발표했습니다.', 'global-expansion-plan-2024', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 'published');

-- Insert sample contacts for testing
INSERT INTO contacts (name, email, inquiry_type, message) VALUES
('김민수', 'minsu@example.com', '제품 문의', '해양 나노섬유 제품에 대해 더 자세히 알고 싶습니다.'),
('이영희', 'younghee@example.com', '기술 문의', '나노섬유 추출 기술의 특허 관련해서 문의드립니다.'),
('박철수', 'chulsoo@example.com', '파트너십', '유통 파트너십 제안을 위해 연락드립니다.');

-- =====================================================
-- 6단계: Row Level Security (RLS) 정책 설정
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carousels ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Allow public read access to published blog posts" ON blog_posts 
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published news" ON news 
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published gallery" ON gallery 
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to published products" ON products 
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to active carousels" ON carousels 
    FOR SELECT USING (is_active = true);

-- Allow public insert for contacts and newsletter
CREATE POLICY "Allow public insert to contacts" ON contacts 
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert to newsletter" ON newsletter 
    FOR INSERT WITH CHECK (true);

-- Admin access policies (모든 작업 허용)
CREATE POLICY "Allow full access to contacts" ON contacts FOR ALL USING (true);
CREATE POLICY "Allow full access to newsletter" ON newsletter FOR ALL USING (true);
CREATE POLICY "Allow full access to users" ON users FOR ALL USING (true);
CREATE POLICY "Allow full access to blog_posts" ON blog_posts FOR ALL USING (true);
CREATE POLICY "Allow full access to news" ON news FOR ALL USING (true);
CREATE POLICY "Allow full access to gallery" ON gallery FOR ALL USING (true);
CREATE POLICY "Allow full access to products" ON products FOR ALL USING (true);
CREATE POLICY "Allow full access to carousels" ON carousels FOR ALL USING (true);
CREATE POLICY "Allow full access to admin_sessions" ON admin_sessions FOR ALL USING (true);

-- =====================================================
-- 완료 메시지
-- =====================================================

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE '✅ MarineBioGroup 데이터베이스 초기화 완료!';
    RAISE NOTICE '📊 생성된 테이블: contacts, newsletter, users, blog_posts, news, gallery, products, carousels, admin_sessions';
    RAISE NOTICE '👤 기본 관리자 계정: admin@marinebiogroup.com';
    RAISE NOTICE '🎠 샘플 캐러셀 3개, 제품 3개, 뉴스 2개, 연락처 3개가 추가되었습니다.';
    RAISE NOTICE '🔒 Row Level Security 정책이 모든 테이블에 적용되었습니다.';
END $$;