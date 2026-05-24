import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { accessToken } = await req.json()
  if (!accessToken) {
    return NextResponse.json({ error: 'No token' }, { status: 400 })
  }

  const piRes = await fetch('https://api.minepi.com/v2/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  if (!piRes.ok) {
    return NextResponse.json({ error: 'Invalid Pi token' }, { status: 401 })
  }

  const piUser = await piRes.json()
  return NextResponse.json({ 
    success: true, 
    user: { uid: piUser.uid, username: piUser.username } 
  })
}
