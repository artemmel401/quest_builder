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

export const createQuest = async (templateId) => {
  let response = await fetch('/api/db/createQuest',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({templateId: templateId})
});
  return response.ok ? await response.json() : { error: 'error createQuest' };
}

export const deleteQuest = async (number) => {
  let response = await fetch('/api/db/deleteQuest',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({number: number})
});
  return response.ok ? await response.json() : { error: 'error deleteQuest' };
}



export const getTemplate = async (id) => {
  let response = await fetch('../../api/db/getTemplate',{
      method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({id: id})
  });
  return response.ok ? await response.json() : { error: 'error getQuest' };
}

export const changeTemplateField = async (id, field, value) => {
  let response = await fetch('../../api/db/changeTemplateField',{
      method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({id: id, field: field, value: value})
  });
  return response.ok ? await response.json() : { error: 'error changeTemplateField' };
}

export const getTemplates = async () => {
  let response = await fetch('/api/db/getTemplates',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify()
});
  return response.ok ? await response.json() : { error: 'error getTemplates' };
}

export const createTemplate = async () => {
  let response = await fetch('/api/db/createTemplate',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify()
});
  return response.ok ? await response.json() : { error: 'error createTemplate' };
}

export const deleteTemplate = async (id) => {
  let response = await fetch('/api/db/deleteTemplate',{
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({id: id})
});
  return response.ok ? await response.json() : { error: 'error deleteTemplate' };
}


export const getFilesFromDirectory = async (dirpath) => {
  let response = await fetch('/api/db/getFilesFromDirectory', {
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({dirpath: dirpath})
  });
  return response.ok ? await response.json() : { error: 'error createQuest' };
}

export const getDirectoriesInDirectory = async (dirpath) => {
  let response = await fetch('/api/db/getDirectoriesFromDirectory', {
    method: 'POST', headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({dirpath: dirpath})
  });
  return response.ok ? await response.json() : { error: 'error createQuest' };
}