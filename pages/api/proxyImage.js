export default async function handler(req, res) {
  const { url } = req.query;
  const response = await fetch(url);
  const imageBuffer = await response.arrayBuffer();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', response.headers.get('Content-Type'));
  res.send(Buffer.from(imageBuffer));
}