"use strict";
function init() {
  fetchData(), filterData(), currentYear();
}
function printData(e) {
  let t = document.querySelector("#myList");
  for (let n in e) {
    let a = [e[n].whatsapp, e[n].telegram],
      l = document.createElement("tr");
    l.classList.add("is-hidden");
    let s = document.createElement("td");
    (s.classList = "subject"), (s.innerText = e[n].title);
    let i = makeButtons(a[0], a[1]),
      r = document.createElement("td");
    (r.classList = "level-right"),
      r.appendChild(i[0]),
      r.appendChild(i[1]),
      l.appendChild(s),
      l.appendChild(r),
      t.appendChild(l);
  }
}
function filterData() {
  let e = "";
  const t = document.querySelector("#input");
  t.focus(),
    t.addEventListener("keyup", () => {
      if ((e = t.value.toLowerCase()).length > 0) {
        let t = document.querySelectorAll(".subject");
        for (let n = 0; n < t.length; n++) {
          let a = t[n].textContent || t[n].innerHTML;
          -1 !==
          (a = a
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()).indexOf(e)
            ? t[n].parentElement.classList.remove("is-hidden")
            : t[n].parentElement.classList.add("is-hidden");
        }
      } else {
        let e = document.querySelectorAll(".subject");
        for (let t = 0; t < e.length; t++)
          e[t].parentElement.classList.add("is-hidden");
      }
    });
}
function fetchData() {
  (async function () {
    const e = await fetch("./assets/data/data.json");
    return await e.json();
  })().then((e) => {
    const t = JSON.stringify(e);
    printData(JSON.parse(t));
  });
}
function makeButtons(e, t) {
  let n = [];
  const a = {
    bElement: "a",
    bName: ["Whatsapp", "Telegram"],
    links: [e, t],
    bulmaClasses: ["whatsapp-color", "telegram-color"],
  };
  for (let e = 0; e < 2; e++) {
    let t = document.createElement(`${a.bElement}`);
    (t.className = `button is-small ${a.bulmaClasses[e]} m-1 is-fullwidth`),
      "n/a" === a.links[e]
        ? ((t.innerText = "No disponible"), t.setAttribute("disabled", !0))
        : ((t.innerText = a.bName[e]), t.setAttribute("href", `${a.links[e]}`)),
      n.push(t);
  }
  return n;
}
function currentYear() {
  const e = new Date().getFullYear();
  document.querySelector("footer > div > p").innerText = e;
}
window.onload = function () {
  init();
};
