import api from "./api";

export async function recommendAnime(mood, time) {
  const response = await api.get(
    `/anime/recommend?mood=${mood}&time=${time}`
  );

  return response.data;
}
