const markdown = require("markdown").markdown;

const toMarkdown = require('to-markdown');

const title = document.getElementById("title");
const textInput = document.getElementById("text-input");




$(document).on('input', '#title', () => {
  const title = document.getElementById("title");
  RenderMarkdown(title, 'preview-title');
});

$(document).on('input', '#text-input', () => {
  console.log("text");
  const textInput = document.getElementById("text-input");
  RenderMarkdown(textInput, 'preview');
});

var RenderMarkdown = (input, previewString, isInput = false) => {
  const preview = document.getElementById(previewString);
  if (!isInput) {
    preview.innerHTML = markdown.toHTML(input.value);
  } else {
    preview.value = markdown.toHTML(input.value);
  }
}

var RenderHtml = (input, previewString, isInput = false) => {
  const preview = document.getElementById(previewString);
  if (!isInput) {
    input.value = toMarkdown(preview.innerHTML);
  } else {
    input.value = toMarkdown(preview.value);
  }
}

console.log("enter");
RenderHtml(title, 'preview-title');
RenderHtml(textInput, 'preview');
