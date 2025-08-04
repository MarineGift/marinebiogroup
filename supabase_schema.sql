-- Admin 테이블
create table if not exists admin (
  id uuid default uuid_generate_v4() primary key,
  username text unique not null,
  password text not null,
  created_at timestamp with time zone default now(),
  domain text
);

-- 기본 관리자 계정
insert into admin (username, password, domain)
values ('admin', '1111', 'marinebiogroup.com')
on conflict (username) do nothing;

-- Contact 테이블 (문의 저장 예시)
create table if not exists contact (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

-- Products 테이블 (제품 정보 예시)
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price numeric(10,2),
  created_at timestamp with time zone default now()
);

-- News 테이블 (뉴스/공지 예시)
create table if not exists news (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  content text,
  published_at timestamp with time zone default now()
);
