import { createClient } from "@/lib/supabase/client"

export interface AdminProfile {
  id: string
  email?: string
  full_name: string | null
  role: string | null
}

export async function getAdminProfile(): Promise<AdminProfile | null> {
  const supabase = createClient()

  const { data: authData } = await supabase.auth.getUser()
  if (!authData.user) return null

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", authData.user.id)
    .single()

  const p = profile as { id: string; full_name: string | null; role: string | null } | null

  if (!p || p.role !== "admin") return null

  return {
    id: p.id,
    email: authData.user.email,
    full_name: p.full_name,
    role: p.role,
  }
}
