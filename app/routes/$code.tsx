import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShortUrlRedirect() {
  const { code } = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Retrieve the mappings from localStorage
      const storedUrls = JSON.parse(localStorage.getItem("shortenedUrls") || "{}");

      if (code && storedUrls[code]) {
        window.location.href = storedUrls[code];
      } else {
        alert("Invalid or expired URL.");
      }
    }
  }, [code]);

  return <div>Redirecting...</div>;
}