import api from "./api";

export async function recommendMovie(mood, media) {
    const response = await api.get(
        `/movie/recommend?mood=${mood}&media=${media}`
    );

    return response.data;
}