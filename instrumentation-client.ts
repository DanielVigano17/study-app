import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
  debug: process.env.NODE_ENV === "development",
  loaded: (posthogInstance) => {
    if (process.env.NODE_ENV === "development") {
        console.log("Parando de trackear no ambiente de desenvolvimento");
        posthogInstance.opt_out_capturing();
    }
  }
});
