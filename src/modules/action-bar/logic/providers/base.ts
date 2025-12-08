export const baseProviders = {
  "amazon.com": {
    origin: "https://www.amazon.com",
    search: "/s?k=%s",
    affixes: ["amazon"],
  },
  "baidu.com": {
    origin: "https://www.baidu.com",
    search: "/s?wd=%s",
    affixes: ["baidu"],
  },
  "bing.com": {
    origin: "https://www.bing.com",
    search: "/search?q=%s",
    affixes: ["bing"],
  },
  "brave.com": {
    origin: "https://search.brave.com",
    search: "/search?q=%s",
    affixes: ["brave"],
  },
  "chatgpt.com": {
    origin: "https://chatgpt.com",
    search: "?prompt=%s",
    affixes: ["chatgpt", "gpt"],
  },
  "duckduckgo.com": {
    origin: "https://duckduckgo.com",
    search: "/?q=%s",
    affixes: ["duckduckgo", "ddg"],
  },
  "ebay.com": {
    origin: "https://www.ebay.com",
    search: "/sch/i.html?_nkw=%s",
    affixes: ["ebay"],
  },
  "ecosia.org": {
    origin: "https://www.ecosia.org",
    search: "/search?q=%s",
    affixes: ["esosia"],
  },
  "entertrained.app": {
    origin: "https://entertrained.app",
    search: "/books?search=%s",
    affixes: ["entertrained"],
  },
  "etsy.com": {
    origin: "https://www.etsy.com",
    search: "/search?q=%s",
    affixes: ["etsy"],
  },
  "gist.github.com": {
    origin: "https://gist.github.com",
    search: "/search?q=%s",
    affixes: ["gist"],
  },
  "github.com": {
    origin: "https://github.com",
    search: "/search?q=%s",
    affixes: ["github", "gh"],
  },
  "mail.google.com": {
    origin: "https://mail.google.com",
    search: "/#search/%s",
    affixes: ["gmail"],
  },
  "goodreads.com": {
    origin: "https://www.goodreads.com",
    search: "/search?q=%s",
    affixes: ["goodreads"],
  },
  "google.com": {
    origin: "https://www.google.com",
    search: "/search?q=%s",
    affixes: ["google"],
  },
  "google.com:ai": {
    origin: "https://www.google.com/search?q=&udm=50",
    search: "https://www.google.com/search?q=%s&udm=50",
    affixes: ["googleai", "gai"],
  },
  "google.com:web": {
    origin: "https://www.google.com/webhp?udm=14",
    search: "https://www.google.com/search?q=%s&udm=14",
    affixes: ["googleweb", "gweb"],
  },
  "kagi.com": {
    origin: "https://kagi.com",
    search: "/search?q=%s",
    affixes: ["kagi"],
  },
  "marginalia-search.com": {
    origin: "https://marginalia-search.com",
    search: "/search?query=%s",
    affixes: ["marginalia"],
  },
  "mojeek.com": {
    origin: "https://www.mojeek.com",
    search: "/search?q=%s",
    affixes: ["mojeek"],
  },
  "npmjs.com": {
    origin: "https://www.npmjs.com",
    search: "/search?q=%s",
    affixes: ["npm"],
  },
  "qwant.com": {
    origin: "https://www.qwant.com",
    search: "/?q=%s",
    affixes: ["qwant"],
  },
  "reddit.com": {
    origin: "https://www.reddit.com",
    search: "/search?q=%s",
    affixes: ["reddit", "r"],
  },
  "metasearx.com": {
    origin: "https://metasearx.com",
    search: "/?q=%s",
    affixes: ["metasearx", "searx"],
  },
  "spotify.com": {
    origin: "https://open.spotify.com",
    search: "/search/%s",
    affixes: ["spotify", "sp"],
  },
  "stackoverflow.com": {
    origin: "https://stackoverflow.com",
    search: "/search?q=%s",
    affixes: ["stackoverflow", "so"],
  },
  "startpage.com": {
    origin: "https://www.startpage.com",
    search: "/sp/search?q=%s",
    affixes: ["startpage"],
  },
  "x.com": {
    origin: "https://x.com",
    search: "/search?q=%s",
    affixes: ["twitter", "x"],
  },
  "wikipedia.org": {
    origin: "https://en.wikipedia.org",
    search: "/w/index.php?search=%s",
    affixes: ["wikipedia", "wiki"],
  },
  "wolframalpha.com": {
    origin: "https://www.wolframalpha.com",
    search: "/input?i=%s",
    affixes: ["wolframalpha", "wa"],
  },
  "yandex.com": {
    origin: "https://yandex.com",
    search: "/search/?text=%s",
    affixes: ["yandex"],
  },
  "youtube.com": {
    origin: "https://youtube.com",
    search: "/results?search_query=%s",
    affixes: ["youtube", "yt"],
  },
}
