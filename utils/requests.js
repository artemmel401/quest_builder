export const getAny = async () => {
  let response = await fetch('api/db/getAny',{
      method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify()
  });
  return response.ok ? await response.json() : { error: 'error createQuiz' };
}