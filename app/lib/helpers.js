export function googleSearch (query) {
  const baseUrl = 'https://google.com/search?q='
  const url = `${baseUrl}${query}`
  chrome.tabs.getCurrent(tab => chrome.tabs.update(tab.id, { url }))
}
