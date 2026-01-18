const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const content = urlParams.get("content") ?? "/licao_alternativas_html";

loadPageIntoIframe(`/licao/${content}.html`, lesson_iframe);

const lesson = urlParams.get("lesson") ?? "html_basico";

loadPageIntoIframe(`/licao/${lesson}_apostila.html`, pages);

back_button.addEventListener("click", () => window.history.back());
