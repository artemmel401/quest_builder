export const getQuest = async (number) => {
  let response = await fetch('../api/db/getQuest',{
      method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({number: number})
  });
  return response.ok ? await response.json() : { error: 'error getQuest' };
}

export const changeQuestField = async (number, field, value) => {
  let response = await fetch('../api/db/changeQuestField',{
      method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({number: number, field: field, value: value})
  });
  return response.ok ? await response.json() : { error: 'error changeQuestField' };
}

export const getQuests = async () => {
  let response = await fetch('/api/db/getQuests',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify()
});
  return response.ok ? await response.json() : { error: 'error getQuests' };
}

export const createQuest = async () => {
  let response = await fetch('/api/db/createQuest',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify()
});
  return response.ok ? await response.json() : { error: 'error createQuest' };
}

export const getFilesFromDirectory = async (dirpath) => {
  let response = await fetch('/api/db/getFilesFromDirectory', {
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({dirpath: dirpath})
  });
  return response.ok ? await response.json() : { error: 'error createQuest' };
}
