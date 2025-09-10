import React, { useState } from "react";
import mql from "@microlink/mql";

export default function Testing() {
  const [url, setUrl] = useState("https://easy-peasy.ai");
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setScreenshot(null);
      setLogo(null);

      const { data } = await mql(url, {
        screenshot: true,
        meta: true, // includes logo
      });

      if (data.screenshot?.url) setScreenshot(data.screenshot.url);
      if (data.logo?.url) setLogo(data.logo.url);
    } catch (err) {
      console.error("Error fetching data:", err);
      alert("Failed to fetch logo/screenshot");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Microlink Logo + Screenshot</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 rounded bg-blue-500 text-white"
          disabled={loading}
        >
          {loading ? "Fetching..." : "Fetch"}
        </button>
      </div>

      {logo && (
        <div className="mb-4">
          <h2 className="text-lg font-medium mb-2">Website Logo</h2>
          <img src={logo} alt="Logo" className="h-16 w-16 object-contain border rounded p-2" />
        </div>
      )}

      {screenshot && (
        <div>
          <h2 className="text-lg font-medium mb-2">Website Screenshot</h2>
          <img src={screenshot} alt="Screenshot" className="rounded shadow border" />
          <a
            href={screenshot}
            download={`screenshot-${new Date().toISOString()}.png`}
            className="block mt-2 underline text-blue-600"
          >
            Download Screenshot
          </a>
        </div>
      )}
    </div>
  );
}
