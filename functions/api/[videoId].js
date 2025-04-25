export async function onRequestStats(context) {
    const videoId = context.params.videoId;
    const API_KEY = context.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${API_KEY}`;

  try {
    const res = await fetch(url);
    if(!res.ok) {
        return new Response('Error: ' + res.status, { status: res.status });    
    }
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response('Error: ' + error.message, { status: 500 });
  }  
}