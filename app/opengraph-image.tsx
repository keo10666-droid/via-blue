import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export const alt = "Via Blue | Tours & Transfers in Hurghada";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoPath = path.join(
    process.cwd(),
    "public",
    "og",
    "logo.png"
  );

  const logoBuffer = await readFile(logoPath);

  const logoDataUrl = `data:image/png;base64,${logoBuffer.toString(
    "base64"
  )}`;

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
          src={logoDataUrl}
          alt="Via Blue"
          width={320}
          height={320}
        />

        <div
          style={{
            display: "flex",
            marginTop: 35,
            fontSize: 42,
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          Tours & Transfers in Hurghada
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 18,
            fontSize: 25,
            color: "#F59E0B",
          }}
        >
          Explore Egypt with Via Blue
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}