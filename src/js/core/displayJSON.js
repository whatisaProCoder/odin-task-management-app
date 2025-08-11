import { prettyPrintJson } from "pretty-print-json";

export default function displayJSON(jsonObject) {
  const formatted = prettyPrintJson.toHtml(jsonObject);
  document.body.append(document.createElement("pre"));
  document.querySelector("pre").innerHTML = formatted;
}
