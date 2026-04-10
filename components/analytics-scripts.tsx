import Script from "next/script";

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function AnalyticsScripts() {
  return (
    <>
      {plausibleDomain ? (
        <>
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
          <Script id="plausible-events" strategy="afterInteractive">
            {`
              window.plausible = window.plausible || function() {
                (window.plausible.q = window.plausible.q || []).push(arguments);
              };
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
