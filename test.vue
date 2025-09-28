<template>
  <div class="main-container">
    <div
      class="editor-container editor-container_classic-editor editor-container_include-style editor-container_include-fullscreen"
      ref="editorContainerElement"
    >
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="editor && config"
            :modelValue="config.initialData"
            :editor="editor"
            :config="config"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoNgNARATAdA7DArBSUoBY6IAwEYDM2cAHCIsQJwhzZUVz74WKLpPHojbFz1QeJ8IFBACmAOxTYwwXGGnS5igLqQcAQygATAEboIyoA=
 */

import { computed, ref, onMounted, watchEffect } from "vue";
import { Ckeditor, useCKEditorCloud } from "@ckeditor/ckeditor5-vue";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTk4ODE1OTksImp0aSI6Ijk3MTg1NjE3LTUzYmEtNDEwOC04YTIwLTZlZTFlYjRjNmNiYiIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImVkYWQzMTI4In0.KtsEm1TMJPWvvL3nMu8jcKXSetBEpOZv-3BpJQBUfnQQYNq7Pc0_42cgQ7NCl2bCVf0RIQOF6tef4J6lf3atYw";

const cloud = useCKEditorCloud({ version: "46.1.1", premium: true });

const isLayoutReady = ref(false);

const editor = computed(() => {
  if (!cloud.data.value) {
    return null;
  }

  return cloud.data.value.CKEditor.ClassicEditor;
});

const config = computed(() => {
  if (!isLayoutReady.value) {
    return null;
  }

  if (!cloud.data.value) {
    return null;
  }

  const {
    Alignment,
    Autoformat,
    AutoImage,
    Autosave,
    BlockQuote,
    Bold,
    CloudServices,
    Emoji,
    Essentials,
    FindAndReplace,
    Fullscreen,
    GeneralHtmlSupport,
    Heading,
    HorizontalLine,
    HtmlEmbed,
    ImageBlock,
    ImageCaption,
    ImageInline,
    ImageInsertViaUrl,
    ImageResize,
    ImageStyle,
    ImageTextAlternative,
    ImageToolbar,
    ImageUpload,
    Indent,
    IndentBlock,
    Italic,
    Link,
    LinkImage,
    List,
    ListProperties,
    MediaEmbed,
    Mention,
    Paragraph,
    PasteFromOffice,
    SpecialCharacters,
    SpecialCharactersArrows,
    SpecialCharactersCurrency,
    SpecialCharactersEssentials,
    SpecialCharactersLatin,
    SpecialCharactersMathematical,
    SpecialCharactersText,
    Style,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    TodoList,
    Underline,
  } = cloud.data.value.CKEditor;
  const { LineHeight } = cloud.data.value.CKEditorPremiumFeatures;

  return {
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "findAndReplace",
        "fullscreen",
        "|",
        "heading",
        "style",
        "|",
        "bold",
        "italic",
        "underline",
        "|",
        "emoji",
        "specialCharacters",
        "horizontalLine",
        "link",
        "mediaEmbed",
        "insertTable",
        "blockQuote",
        "htmlEmbed",
        "|",
        "alignment",
        "lineHeight",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "outdent",
        "indent",
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      Alignment,
      Autoformat,
      AutoImage,
      Autosave,
      BlockQuote,
      Bold,
      CloudServices,
      Emoji,
      Essentials,
      FindAndReplace,
      Fullscreen,
      GeneralHtmlSupport,
      Heading,
      HorizontalLine,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Indent,
      IndentBlock,
      Italic,
      LineHeight,
      Link,
      LinkImage,
      List,
      ListProperties,
      MediaEmbed,
      Mention,
      Paragraph,
      PasteFromOffice,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Style,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      TodoList,
      Underline,
    ],
    fullscreen: {
      onEnterCallback: (container) =>
        container.classList.add(
          "editor-container",
          "editor-container_classic-editor",
          "editor-container_include-style",
          "editor-container_include-fullscreen",
          "main-container"
        ),
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
        {
          model: "heading4",
          view: "h4",
          title: "Heading 4",
          class: "ck-heading_heading4",
        },
        {
          model: "heading5",
          view: "h5",
          title: "Heading 5",
          class: "ck-heading_heading5",
        },
        {
          model: "heading6",
          view: "h6",
          title: "Heading 6",
          class: "ck-heading_heading6",
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    image: {
      toolbar: [
        "toggleImageCaption",
        "imageTextAlternative",
        "|",
        "imageStyle:inline",
        "imageStyle:wrapText",
        "imageStyle:breakText",
        "|",
        "resizeImage",
      ],
    },
    initialData:
      '<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou\'ve successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor\'s\n\t\tconfiguration to match your application\'s style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don\'t hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n\t<li>📝 <a href="https://portal.ckeditor.com/checkout?plan=free">Trial sign up</a>,</li>\n\t<li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n\t<li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n\t<li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n\t<li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser\'s\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n',
    licenseKey: LICENSE_KEY,
    lineHeight: {
      supportAllValues: true,
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: "https://",
      decorators: {
        toggleDownloadable: {
          mode: "manual",
          label: "Downloadable",
          attributes: {
            download: "file",
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    mention: {
      feeds: [
        {
          marker: "@",
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ],
        },
      ],
    },
    placeholder: "Type or paste your content here!",
    style: {
      definitions: [
        {
          name: "Article category",
          element: "h3",
          classes: ["category"],
        },
        {
          name: "Title",
          element: "h2",
          classes: ["document-title"],
        },
        {
          name: "Subtitle",
          element: "h3",
          classes: ["document-subtitle"],
        },
        {
          name: "Info box",
          element: "p",
          classes: ["info-box"],
        },
        {
          name: "CTA Link Primary",
          element: "a",
          classes: ["button", "button--green"],
        },
        {
          name: "CTA Link Secondary",
          element: "a",
          classes: ["button", "button--black"],
        },
        {
          name: "Marker",
          element: "span",
          classes: ["marker"],
        },
        {
          name: "Spoiler",
          element: "span",
          classes: ["spoiler"],
        },
      ],
    },
    table: {
      contentToolbar: [
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "tableProperties",
        "tableCellProperties",
      ],
    },
  };
});

onMounted(() => {
  isLayoutReady.value = true;
});

watchEffect(() => {
  if (config.value) {
    configUpdateAlert(config.value);
  }
});

/**
 * This function exists to remind you to update the config needed for premium features.
 * The function can be safely removed. Make sure to also remove call to this function when doing so.
 */
function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, "<YOUR_LICENSE_KEY>")) {
    valuesToUpdate.push("LICENSE_KEY");
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        "Please update the following values in your editor config",
        "to receive full access to Premium Features:",
        "",
        ...valuesToUpdate.map((value) => ` - ${value}`),
      ].join("\n")
    );
  }
}
</script>
