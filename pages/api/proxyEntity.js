export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');

    // Получаем бинарные данные изображения
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Устанавливаем CORS-заголовки
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type') || 'image/jpeg');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}