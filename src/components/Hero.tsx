import { gradientFor, imageFor } from "@/lib/cities";

type Props = {
  cityId: string;
  province: string;
  city: string;
  size?: "card" | "hero";
};

export default function Hero({ cityId, province, city, size = "card" }: Props) {
  const img = imageFor(cityId);
  const grad = gradientFor(province);

  if (size === "hero") {
    return (
      <div className={`relative w-full h-[58vh] min-h-[420px] ${grad}`}>
        {img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={city}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/55" />
      </div>
    );
  }

  return (
    <div className={`relative w-full aspect-[16/10] ${grad}`}>
      {img && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={city}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
}
