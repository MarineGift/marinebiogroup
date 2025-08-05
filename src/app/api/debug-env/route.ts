export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  return Response.json({
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    status: (!!supabaseUrl && !!supabaseKey) ? 'CONFIGURED ✅' : 'NOT CONFIGURED ❌'
  })
}