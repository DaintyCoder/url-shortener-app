import { useState, useEffect } from "react";

export default function Index() {
  const [urlInput, setUrlInput] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState<Record<string, string>>({});
  const [shortUrl, setShortUrl] = useState("");

  useEffect(() => {
    // Load existing mappings from localStorage on component mount
    const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "{}");
    setShortenedUrls(storedUrls);
  }, []);

  const generateShortUrl = () => {
    if (!urlInput.trim()) return alert("Please enter a valid URL.");
    const shortCode = Math.random().toString(36).substring(2, 8); // Generate a random 6-character code

    // Update the mappings with the new short code and URL
    const updatedUrls = { ...shortenedUrls, [shortCode]: urlInput };

    // Save the updated mappings back to localStorage
    localStorage.setItem("shortenedUrls", JSON.stringify(updatedUrls));

    // Update the state
    setShortenedUrls(updatedUrls);
    setShortUrl(`${window.location.origin}/${shortCode}`);
    setUrlInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold">Simple URL Shortener</h1>
      <div className="flex gap-4">
        <input
          type="url"
          placeholder="Enter your URL here"
          className="p-2 border rounded-md w-96"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <button
          onClick={generateShortUrl}
          className="px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Shorten
        </button>
      </div>
      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-lg">Your shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {shortUrl}
          </a>
        </div>
      )}
      <div className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Shortened URLs</h2>
        <ul className="list-disc">
          {Object.entries(shortenedUrls).map(([code, url]) => (
            <li key={code}>
              <span className="font-medium">{`${window.location.origin}/${code}`}</span>{" "}
              →{" "}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {url}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}