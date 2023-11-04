// SearchComponent.tsx
import React, { useEffect } from 'react';

declare global {
    interface Window {
        PagefindUI: any;
    }
}

const SearchComponent: React.FC = () => {
    useEffect(() => {
        // This function will only be called on the client side after the component mounts
        const initSearch = () => {
            if (window.PagefindUI) {
                const searchUI = new window.PagefindUI({
                    element: "#search2",
                showSubResults: true,
                showImages: false,
                translations: {
                    placeholder: "חיפוש",
                    zero_results: "לא מצאתי [SEARCH_TERM]",
                    load_more: "טען עוד",
                    clear_search: "נקה חיפוש",
                    results: "תוצאות",
                    sub_results: "תוצאות נוספות",
                    no_results: "לא מצאתי תוצאות",
                },
                });
                console.log("Search UI initialized: ", searchUI);
            } else {
                console.error('PagefindUI is not defined');
            }
        };

        // Call the initSearch function if PagefindUI is available,
        // otherwise wait for it to be loaded
        if (window.PagefindUI) {
            initSearch();
        } else {
            const script = document.createElement('script');
            script.src = "/pagefind/pagefind-ui.js";
            script.onload = initSearch;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <>
            <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
            <script src="/pagefind/pagefind-ui.js" ></script>
            <style>{`
                #search2 {
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
                 }
            `}</style>
            <div id="search2" className="mb-5 w-full mx-auto px-4"></div>
        </>
    );
};

export default SearchComponent;