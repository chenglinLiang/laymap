import citiesData from "@/data/cities.json";
import type { City } from "./types";

export const cities = citiesData as City[];

export function getCity(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}

export function getNearby(city: City): City[] {
  return (city.nearby_cities || [])
    .map((id) => getCity(id))
    .filter((c): c is City => Boolean(c));
}

// Map province → gradient class used for image-less cards.
const PROVINCE_GRADIENT: Record<string, string> = {
  山东: "gradient-coastal",
  广东: "gradient-coastal",
  海南: "gradient-coastal",
  福建: "gradient-coastal",
  江苏: "gradient-coastal",
  浙江: "gradient-coastal",
  辽宁: "gradient-coastal",
  云南: "gradient-mountain",
  四川: "gradient-mountain",
  贵州: "gradient-mountain",
  广西: "gradient-mountain",
  湖南: "gradient-mountain",
  河南: "gradient-neutral",
  安徽: "gradient-neutral",
  湖北: "gradient-neutral",
  江西: "gradient-warm",
};

export function gradientFor(province: string): string {
  return PROVINCE_GRADIENT[province] ?? "gradient-neutral";
}

// User-supplied image map (BVID → URL). Empty by default; user fills data/images.json.
import imagesData from "@/data/images.json";
const images = imagesData as Record<string, string>;

export function imageFor(id: string): string | undefined {
  return images[id];
}
