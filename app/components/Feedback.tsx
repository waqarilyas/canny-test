"use client";

import { useEffect, useState } from "react";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    // Load Canny SDK when modal opens
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (function (w: any, d: any, i: any, s: any) {
      function l() {
        if (!d.getElementById(i)) {
          const f = d.getElementsByTagName(s)[0];
          const e = d.createElement(s);
          e.type = "text/javascript";
          e.async = true;
          e.src = "https://canny.io/sdk.js";
          f.parentNode.insertBefore(e, f);
        }
      }
      if (typeof w.Canny !== "function") {
        // eslint-disable-next-line prefer-const, @typescript-eslint/no-explicit-any
        let c: any = function () {
          // eslint-disable-next-line prefer-rest-params
          c.q.push(arguments);
        };
        c.q = [];
        w.Canny = c;
        if (d.readyState === "complete") {
          l();
        } else if (w.attachEvent) {
          w.attachEvent("onload", l);
        } else {
          w.addEventListener("load", l, false);
        }
      }
    })(window, document, "canny-jssdk", "script");

    // Render Canny board in widget
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any).Canny) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).Canny("render", {
          boardToken: "9888edbf-f5bc-8c62-9820-31a02e338362",
          basePath: null,
          ssoToken: null,
        });
      }
    }, 100);
  }, [isOpen]);

  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
        aria-label="Open Feedback"
      >
        💬 Feedback
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Widget Panel */}
      {isOpen && (
        <div
          className="fixed bottom-0 right-0 z-50 animate-slide-in"
          style={{
            width: "min(600px, 100vw)",
            height: "min(700px, 90vh)",
            margin: "0 20px 20px 0",
          }}
        >
          <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl w-full h-full relative overflow-hidden">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between z-10">
              <h3 className="font-semibold text-lg">Feedback</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-1.5 transition-colors"
                aria-label="Close"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Canny Board Container */}
            <div className="w-full h-full pt-16 pb-4 px-4">
              <div data-canny className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;
