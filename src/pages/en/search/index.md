---
layout: "@layouts/en/EnBaseLayout.astro"
---
## Search
<link href="/pagefind/pagefind-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-ui.js"></script>
<div id="search2" style="
    --pagefind-ui-scale: 0.8;
    --pagefind-ui-primary: #FFD700;
    --pagefind-ui-text: #F8F8F8;
    --pagefind-ui-background: #282c36;
    --pagefind-ui-border: #444;
    --pagefind-ui-tag: #FFD700;
    --pagefind-ui-border-width: 2px;
    --pagefind-ui-border-radius: 8px;
    --pagefind-ui-image-border-radius: 8px;
    --pagefind-ui-image-box-ratio: 3 / 2;
    --pagefind-ui-font: 'Heebo', sans-serif;
"></div>
<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({
            element: "#search2", 
            showSubResults: true,
            showImages: false,
        });
    });
</script>