html_div.setAttribute('contenteditable', 'true');

const str_code_html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example HTML Page</title>
</head>
<body>

    <h1>Olá Mundo!</h1>
    <p>Este é um exemplo simples de uma página HTML. Comece a brincar!</p>
    <button id="click_button">Me clique!</button>
</body>
</html>

`

const str_code_css = `body {
   background-color: #f4f4f4;
   color: #0f0000;
}

`

const str_code_js = `click_button.addEventListener('click', () => {
    alert("Obrigado por clicar!");
});

`

html_div.innerHTML = hljs.highlight(
  str_code_html,
  { language: 'html' }
).value;

css_div.innerHTML = hljs.highlight(
  str_code_css,
  { language: 'css' }
).value;

js_div.innerHTML = hljs.highlight(
  str_code_js,
  { language: 'js' }
).value;

result_iframe.srcdoc = buildIframeDoc();

function getCaretCharacterOffsetWithin(element) {
  const sel = window.getSelection();
  if (!sel || !sel.focusNode || !element.contains(sel.focusNode)) return 0;
  let charCount = 0;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while ((node = walker.nextNode())) {
    if (node === sel.focusNode) {
      return charCount + sel.focusOffset;
    }
    charCount += node.length;
  }
  return charCount;
}

function setCaretCharacterOffsetWithin(element, chars) {
  if (chars < 0) chars = 0;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  let node;
  let count = 0;
  while ((node = walker.nextNode())) {
    const nextCount = count + node.length;
    if (chars <= nextCount) {
      const range = document.createRange();
      range.setStart(node, chars - count);
      range.collapse(true);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      return;
    }
    count = nextCount;
  }
  element.focus();
}

function keyDownKeysAnalyzer(e, el) {

  const caretOffset = getCaretCharacterOffsetWithin(el);

  if (e.key === 'Enter') {
    e.preventDefault();

    let step = 1;

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nextChar = el.textContent[caretOffset];
    const currentChar = el.textContent[caretOffset - 1];

    let nl = document.createTextNode('\n');

    if (
      ( currentChar == '{' && nextChar == '}' ) ||
      ( currentChar == '[' && nextChar == ']')
    ) {
      nl = document.createTextNode('\n    \n');
      step = 4;
    }

    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + step);

    el.dispatchEvent(new Event('input'));

  } else if (e.key ==  'Tab') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode('    ');
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 3);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == '(') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode('()');
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 1);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == '{') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode('{}');
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 1);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == '[') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode('[]');
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 1);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == '"') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode('""');
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 1);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == "'") {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;
    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const nl = document.createTextNode("''");
    range.deleteContents();
    range.insertNode(nl);

    setCaretCharacterOffsetWithin(el, caretOffset + 1);

    el.dispatchEvent(new Event('input'));

  } else if (e.key == '>') {
    e.preventDefault();

    const sel = window.getSelection();
    if (!sel) return;

    const range = sel.rangeCount ? sel.getRangeAt(0) : document.createRange();

    const textBefore = el.textContent.slice(0, caretOffset);
    const lastOpenBracket = textBefore.lastIndexOf('<');
    
    if (lastOpenBracket === -1) {
      range.insertNode(document.createTextNode('>'));
      setCaretCharacterOffsetWithin(el, caretOffset + 1);
      el.dispatchEvent(new Event('input'));
      return;
    }

    const whiteSpaceIndex = textBefore.indexOf(' ', lastOpenBracket);

    const tagName = textBefore.slice(lastOpenBracket + 1, whiteSpaceIndex !== -1 ? whiteSpaceIndex : undefined).trim();
    
    if (tagName) {
      const closingTag = `></${tagName}>`;
      range.deleteContents();
      range.insertNode(document.createTextNode(closingTag));
      setCaretCharacterOffsetWithin(el, caretOffset + 1);
    } else {
      range.insertNode(document.createTextNode('>'));
      setCaretCharacterOffsetWithin(el, caretOffset + 2);
    }

    el.dispatchEvent(new Event('input'));

  }

}

function highlightWhenInput(el, lang) {
    el.innerHTML = hljs.highlight(
      el.textContent,
      { language: lang }
    ).value;

    return el.textContent;
}

function buildIframeDoc() {
  const html = html_div.textContent || '';
  const css = css_div.textContent || '';
  const js = js_div.textContent || '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <style>${css}</style>
</head>
<body>
  ${html}
  <script>${js}</script>
</body>
</html>`;
}

function updateIframe() {
  result_iframe.srcdoc = buildIframeDoc();
}

html_div.addEventListener('keydown', (e) => {
  keyDownKeysAnalyzer(e, html_div);
});

css_div.addEventListener('keydown', (e) => {
  keyDownKeysAnalyzer(e, css_div);
});

js_div.addEventListener('keydown', (e) => {
  keyDownKeysAnalyzer(e, js_div);
});

function normalization (el) {
  const text = el.textContent;
  const normalized = text.normalize('NFC');


  if (text !== normalized) {
      console.log("normalized", normalized)
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const offset = range.startOffset;

    el.textContent = normalized;

    const newRange = document.createRange();
    newRange.setStart(el.firstChild || el, Math.min(offset, normalized.length));
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}


html_div.addEventListener("input", () => {
    const caretOffset = getCaretCharacterOffsetWithin(html_div);

  highlightWhenInput(html_div, 'html');

  normalization(html_div);

  updateIframe();

  setCaretCharacterOffsetWithin(html_div, caretOffset);
});

css_div.addEventListener("input", () => {
    const caretOffset = getCaretCharacterOffsetWithin(css_div);

  highlightWhenInput(css_div, 'css');

  normalization(css_div);

  updateIframe();

  setCaretCharacterOffsetWithin(css_div, caretOffset);
});

js_div.addEventListener("input", () => {
    const caretOffset = getCaretCharacterOffsetWithin(js_div);

  highlightWhenInput(js_div, 'js');

  normalization(js_div);

  updateIframe();

  setCaretCharacterOffsetWithin(js_div, caretOffset);
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const lesson = urlParams.get("lesson") ?? "html_basico";

loadPageIntoIframe(`/licao/${lesson}_apostila.html`, pages);

finish_button.addEventListener('click', () => {
  push('/');
});

back_button.addEventListener('click', () => {
  window.history.back();
});

let is_open = false

function close_manual_f() {
  manual.style.transform = "translateX(100%)"
  open_manual.style.transform = "translateX(0px)"
  back_wrapper.style.display = 'none'
  open_manual.innerText = "<<"
}

function open_manual_f() {
  manual.style.transform = "translateX(0%)"
  open_manual.style.transform = "translateX(-300px)"
  back_wrapper.style.display = 'block'
  open_manual.innerText = ">>"
}

function manual_normal_state() {
  manual.style.transform = "translateX(0%)"
    open_manual.style.transform = "translateX(0px)"
    back_wrapper.style.display = 'none'
    is_open = false
}

open_manual.addEventListener("click", () => {
  if (is_open) {
    close_manual_f()
  } else {
    open_manual_f()
  }
  is_open = !is_open
})

back_wrapper.addEventListener("click", () => {
  close_manual_f()
})

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    manual_normal_state()
  } else {
    close_manual_f()
  }
})

let tabs_open = false

function close_tabs() {
  tabs.classList.add("animate-tabs-close")

  tabs_open = false

  close_icon.style.display = "none"
  open_icon.style.display = "block"

  back_wrapper.style.display = "none"
}

function open_tabs() {
    tabs.classList.add("animate-tabs-open")

  tabs_open = true

  close_icon.style.display = "block"
  open_icon.style.display = "none"

  back_wrapper.style.display = "block"
}

show_tabs.addEventListener("click", () => {
  if (tabs_open) { close_tabs() } else { open_tabs() }
})

tabs.addEventListener('animationend', () => {
  if (!tabs_open) {
    tabs.classList.remove("animate-tabs-open", "animate-tabs-close")
  }
});

back_wrapper.addEventListener("click", () => {
  if (tabs_open) { close_tabs() } else { close_manual_f() }
})
