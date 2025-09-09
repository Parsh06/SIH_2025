export async function geocodeCity(name, countryCode = "IN") {
  const params = new URLSearchParams({
    name,
    count: "1",
    language: "en",
    format: "json",
    country_code: countryCode || "",
  });
  let url = `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;
  let res = await fetch(url);
  let data = await res.json().catch(() => ({}));
  if (!res.ok || !data.results || !data.results.length) {
    // Fallback: try without country filter
    const url2 = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      name
    )}&count=1&language=en&format=json`;
    res = await fetch(url2);
    if (!res.ok) throw new Error("Geocoding failed");
    data = await res.json();
    if (!data.results || !data.results.length)
      throw new Error("City not found");
  }
  const { latitude, longitude, timezone } = data.results[0];
  return { latitude, longitude, timezone };
}

export async function geocodeSuggest(name, countryCode = "IN", limit = 5) {
  if (!name || name.length < 2) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    name
  )}&count=${limit}&language=en&format=json&country_code=${countryCode || ""}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map((r) => ({
    label: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}${
      r.country ? ", " + r.country : ""
    }`,
    latitude: r.latitude,
    longitude: r.longitude,
    timezone: r.timezone,
  }));
}

export async function getForecast({ latitude, longitude, timezone }) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation",
    daily:
      "temperature_2m_max,precipitation_probability_max,wind_speed_10m_max",
    timezone: timezone || "auto",
  });
  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Forecast fetch failed");
  return await res.json();
}
