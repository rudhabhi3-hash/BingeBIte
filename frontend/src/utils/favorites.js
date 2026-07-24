export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function isFavorite(id) {
  return getFavorites().some((item) => item.id === id);
}

export function saveFavorite(item) {
  const favorites = getFavorites();

  if (!favorites.find((f) => f.id === item.id)) {
    favorites.push(item);

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  }
}

export function removeFavorite(id) {
  const favorites = getFavorites().filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    "favorites",
    JSON.stringify(favorites)
  );
}