import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Via Blue | Tours & Transfers in Hurghada";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logo = await fetch(
    new URL("../public/logo/logo.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const logoBase64 = Buffer.from(logo).toString("base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#071A2B",
          padding: "60px",
        }}
      >
        <img
          src={`data:image/png;base64,${logoBase64}`}
          alt="Via Blue"
          style={{
            width: "320px",
            height: "auto",
            objectFit: "contain",
          }}
        />

        <div
          style={{
            display: "flex",
            marginTop: "35px",
            fontSize: "42px",
            fontWeight: 700,
            color: "white",
          }}
        >
          Tours & Transfers in Hurghada
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "18px",
            fontSize: "25px",
            color: "#F59E0B",
          }}
        >
          Explore Egypt with Via Blue
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}