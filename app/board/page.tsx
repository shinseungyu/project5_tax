import posts from '@/data/posts.json'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '직구 정보 게시판 | 관세계산기',
  description: '해외직구 관세, 절세 팁, 직구 정보를 모아둔 게시판입니다.',
  alternates: { canonical: '/board' },
}

interface Post {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: string
  tags: string[]
}

interface Props {
  searchParams: Promise<{ id?: string }>
}

export default async function BoardPage({ searchParams }: Props) {
  const { id } = await searchParams
  const allPosts: Post[] = posts as Post[]

  // ?id=1 이면 해당 글 상세 보기
  if (id) {
    const post = allPosts.find((p) => p.id === Number(id))

    if (!post) {
      return (
        <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
          <p style={{ color: '#888' }}>게시글을 찾을 수 없습니다.</p>
          <Link href="/board" style={{ color: '#2563eb' }}>← 목록으로</Link>
        </main>
      )
    }

    return (
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
        {/* 뒤로가기 */}
        <Link href="/board" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '24px' }}>
          ← 목록으로
        </Link>

        {/* 글 헤더 */}
        <article>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '999px', fontWeight: '600' }}>
              {post.category}
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', lineHeight: '1.4', marginBottom: '12px' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#888', marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
            <span>📅 {post.date}</span>
            <span>🏷️ {post.tags.join(', ')}</span>
          </div>

          {/* 본문 - \n 을 줄바꿈으로 렌더링 */}
          <div style={{ lineHeight: '1.9', fontSize: '15px', color: '#444' }}>
            {post.content.split('\n').map((line, i) => (
              line.trim() === '' 
                ? <br key={i} /> 
                : <p key={i} style={{ margin: '0 0 8px 0' }}>{line}</p>
            ))}
          </div>
        </article>

        {/* 다른 글 목록 */}
        <section style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #eee' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>다른 글 보기</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {allPosts.filter(p => p.id !== post.id).map(p => (
              <Link key={p.id} href={`/board?id=${p.id}`} style={{ textDecoration: 'none', padding: '12px 16px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #eee', display: 'block' }}>
                <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600' }}>{p.category}</span>
                <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#333', fontWeight: '500' }}>{p.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <footer style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #eee', textAlign: 'center' }}>
          <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="/privacy-policy" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>개인정보 처리방침</a>
            <a href="/terms-of-service" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>이용약관</a>
            <a href="/cookie-policy" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>쿠키 정책</a>
          </nav>
          <p style={{ marginTop: '8px', fontSize: '11px', color: '#bbb' }}>© 2026 newsioo.com · 문의: tlsfkaus0711@gmail.com</p>
        </footer>
      </main>
    )
  }

  // id 없으면 목록 페이지
  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif', color: '#333' }}>
      <Link href="/" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', marginBottom: '24px', display: 'inline-block' }}>
        ← 관세계산기로
      </Link>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '8px' }}>직구 정보 게시판</h1>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>관세, 절세 팁, 직구 정보를 정리했습니다.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {allPosts.map((post) => (
          <Link key={post.id} href={`/board?id=${post.id}`} style={{ textDecoration: 'none', display: 'block', padding: '20px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', transition: 'box-shadow 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', backgroundColor: '#eff6ff', color: '#2563eb', padding: '3px 10px', borderRadius: '999px', fontWeight: '600' }}>
                {post.category}
              </span>
              <span style={{ fontSize: '12px', color: '#aaa' }}>{post.date}</span>
            </div>
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: '700', color: '#111' }}>{post.title}</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#666', lineHeight: '1.6' }}>{post.summary}</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ fontSize: '11px', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '999px' }}>#{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* 푸터 */}
      <footer style={{ marginTop: '48px', paddingTop: '16px', borderTop: '1px solid #eee', textAlign: 'center' }}>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a href="/privacy-policy" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>개인정보 처리방침</a>
          <a href="/terms-of-service" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>이용약관</a>
          <a href="/cookie-policy" style={{ fontSize: '12px', color: '#999', textDecoration: 'none' }}>쿠키 정책</a>
        </nav>
        <p style={{ marginTop: '8px', fontSize: '11px', color: '#bbb' }}>© 2026 newsioo.com · 문의: tlsfkaus0711@gmail.com</p>
      </footer>
    </main>
  )
}
