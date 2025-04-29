export function getBlurDataURL(width = 8, height = 8): string {
  // Create a small, blurry placeholder
  return `data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' x='0' y='0' fill='%230a0a14' filter='url(%23b)'/%3E%3C/svg%3E`
}

export function shimmer(w: number, h: number): string {
  return `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#151524" offset="20%" />
          <stop stop-color="#252540" offset="50%" />
          <stop stop-color="#151524" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#151524" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
}

export function toBase64(str: string): string {
  return typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str)
}
