// Evaluated once when Astro starts the static build so every page shares one timestamp.
export const BUILD_TIME = new Date().toISOString();
