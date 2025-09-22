// types/global.d.ts
export {};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: typeof YTNamespace;
  }

  namespace YTNamespace {
    class Player {
      constructor(
        elementId: string | HTMLElement,
        options: {
          height: string;
          width: string;
          videoId: string;
          playerVars?: {
            autoplay?: number;
            controls?: number;
            modestbranding?: number;
            rel?: number;
          };
        }
      );
    }

    /** Indicates whether the API is loaded (1 = loaded) */
    const loaded: number;
  }
}
