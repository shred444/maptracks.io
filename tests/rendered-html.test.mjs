import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the MapTracks marketing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>MapTracks — Connected Mountain Artwork<\/title>/i);
  assert.match(html, /Your mountain/);
  assert.match(html, /Start a commission/);
  assert.match(html, /Whistler Blackcomb/);
  assert.match(html, /Jackson Hole/);
  assert.match(html, /Stowe/);
  assert.match(html, /From \$499/);
  assert.match(html, /src=["']\.\/maptracks-dining-room\.png["']/);
  assert.match(html, /connected ski mountain artwork framed on the wall/i);
  assert.match(html, /scan the unique QR code/i);
  assert.match(html, /connect your Strava account/i);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);
});

test("renders accessible commission inputs with the public payload names", async () => {
  const html = await (await render()).text();
  for (const field of [
    "name",
    "email",
    "skiMountain",
    "frameColor",
    "sizePlacement",
    "targetTiming",
    "projectDetails",
  ]) {
    assert.match(html, new RegExp(`name=["']${field}["']`));
  }
  assert.match(html, /aria-live=["']polite["']/);
});
