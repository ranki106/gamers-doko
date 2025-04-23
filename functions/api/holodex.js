export async function onRequestGet(context) {
    const url = new URL(context.request.url);
    const channelId = url.searchParams.get("channelId");
    const apiKey = context.env.HOLODEX_API_KEY;
  
    const res = await fetch(`https://holodex.net/api/v2/channels/${channelId}/videos`, {
      headers: {
        'X-APIKEY': apiKey,
      },
    });
  
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
}