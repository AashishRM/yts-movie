import { useEffect, useState } from "react";

export const DownloadGuideModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("downloadGuideDismissed");

    let dismissed = false;

    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        const now = new Date().getTime();

        if (parsed.expiry && now < parsed.expiry) {
          dismissed = true;
        }
      } catch {
        // If JSON parse fails, treat as not dismissed
      }
    }

    const isMobile = window.innerWidth < 768;
    if (isMobile && !dismissed) {
      setShowModal(true);
    }
  }, []);

  const handleClose = (dontShowAgain = false) => {
    setShowModal(false);

    if (dontShowAgain) {
      const now = new Date().getTime();
      const fifteenDays = 15 * 24 * 60 * 60 * 1000; // ms in 15 days

      localStorage.setItem(
        "downloadGuideDismissed",
        JSON.stringify({
          value: true,
          expiry: now + fifteenDays,
        })
      );
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={() => handleClose()}
      ></div>

      {/* Modal */}
      <div className="relative bg-gray-900 text-white rounded-xl max-w-md w-full p-6 border border-gray-700 shadow-2xl">
        <h1 className="text-2xl font-extrabold text-red-600 text-center mb-4">
          ⚠️ Important Notice!!! ⚠️
        </h1>

        <h2 className="text-md text-red-500 font-bold mb-4">
          📲 How to Download movies on Mobile
        </h2>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            The download link you will click is a <strong>.torrent</strong> file
            (not the movie itself). Here's how to get the MP4:
          </p>

          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Install a torrent app:</strong>
              <div className="mt-1 space-y-1">
                <div>
                  • Android:{" "}
                  <span className="text-blue-400">Flud, LibreTorrent</span>
                </div>
                <div>
                  • iOS:{" "}
                  <span className="text-blue-400">Documents by Readdle</span>
                </div>
              </div>
            </li>
            <li>Tap the download link again and choose to open with the app</li>
            <li>
              The app will download the real files — look for the{" "}
              <strong>.mp4</strong> file
            </li>
          </ol>

          <p className="text-yellow-300 text-xs">
            ⚠️ Always use a <strong>VPN</strong> when torrenting for privacy.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => handleClose(true)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition"
          >
            Don’t Show Again
          </button>
          <button
            onClick={() => handleClose()}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm font-medium transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
