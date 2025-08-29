// utilstorage.js
export function saveDealToStorage(dealKey, { fields }) {
  const data = { fields };
  localStorage.setItem(dealKey, JSON.stringify(data));
}

export function loadDealFromStorage(dealKey) {
  const str = localStorage.getItem(dealKey);
  return str ? JSON.parse(str) : null;
}
