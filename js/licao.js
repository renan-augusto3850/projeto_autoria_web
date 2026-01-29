const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const content = urlParams.get("content") ?? "/licao_alternativas_html";

loadPageIntoIframe(`/licao/${content}.html`, lesson_iframe);

lesson_iframe.addEventListener('load', () => {
    const navTiming = performance.getEntriesByType('navigation')[0];
    navCount++;
});

const lesson = urlParams.get("lesson") ?? "html_basico";

loadPageIntoIframe(`/licao/${lesson}_apostila.html`, pages);

let navCount = -1;

back_button.addEventListener("click", () => {
    console.log(navCount)
    if (navCount > 0) {
        navCount -= 2;
        lesson_iframe.contentWindow.history.back();
    } else {
        window.location.href = "/index.html";
    }
});
