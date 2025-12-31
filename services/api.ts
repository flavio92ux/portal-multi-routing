export async function getPageData(path: string) {
  const response = await fetch(`${process.env.SERVER_BASE_URL}/api/content?path=${path}`);
  
  if (!response.ok) return null;

  const json = await response.json();
  
  return json.data; 
}