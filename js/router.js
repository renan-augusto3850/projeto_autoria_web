function loadPageContent(url) {
    $('body').load(url + '#content', function(_response, status, xhr) {
        if (status == "error") {
            console.error("Error loading page: " + xhr.status + " " + xhr.statusText);
        } else {
            console.log("Navigated to " + url);
        }
    });
}

function loadPageIntoIframe(url, iframe) {
    $(iframe).attr("src", url);
}

$(document).ready(function() {
    $('nav a').on('click', function(event) {
        event.preventDefault();

        const href = $(this).attr('href');

        if ($(this).attr('target') != '_blank') {
            if (href.startsWith('/') || href.includes('.html')) {
                if (typeof history.pushState !== 'undefined') {
                    history.pushState({ page: href }, '', href);
                    loadPageContent(href);
                } else {
                    window.location.href = href;
                }
            }
        }
    });

    $(window).on('popstate', function(_event) {
        const currentUrl = location.pathname;
        loadPageContent(currentUrl);
    });
});

function push(href) {
    if (href.startsWith('/') || href.includes('.html')) {
        if (typeof history.pushState !== 'undefined') {
            history.pushState({ page: href }, '', href);
            loadPageContent(href);
        } else {
            window.location.href = href;
        }
    }
}
