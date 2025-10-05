import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = await createServerSupabaseClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      redirect('/dashboard') // ✅ redirect after successful email confirmation
    }
  }

  // fallback if something fails
  redirect('/login?error=Invalid%20or%20expired%20link')
}