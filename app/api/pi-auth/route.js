export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { token } = body;
  
  if (!token) {
    return Response.json({ error: 'No token' }, { status: 400 });
  }

  const piRes = await fetch('https://api.minepi.com/v2/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!piRes.ok) {
    return Response.json({ error: 'Invalid token' }, { status: 401 });
  }

  const user = await piRes.json();
  return Response.json({ user }, { status: 200 });
}
