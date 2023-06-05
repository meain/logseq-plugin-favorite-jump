import "@logseq/libs";

const settingsTemplate = [
  {
    key: "openInSidebar",
    type: "boolean",
    default: false,
    title: "Open in sidebar",
    description: "Open the page in the sidebar instead of the main view",
  },
  {
    key: "modifier",
    type: "string",
    default: "ctrl",
    title: "Modifier key",
    description: "The modifier key to use for shortcuts",
  },
];

async function openPage(index) {
  const pages = await logseq.App.getCurrentGraphFavorites();

  if (index < pages.length) {
    if (logseq.settings.openInSidebar) {
      const page = await logseq.Editor.getPage(pages[index]);
      await logseq.App.openInRightSidebar(page.uuid);
    } else {
      await logseq.App.pushState("page", { name: pages[index] });
    }
  } else {
    logseq.UI.showMsg("Unknown page", "error");
  }
}

const main = async () => {
  console.log("Quick Jump plugin loaded");
  logseq.useSettingsSchema(settingsTemplate);

  // Max 10. Not using count of fav pages as that might change after init
  for (let i = 1; i <= 10; i++) {
    // ctrl+0 is not a good keybinding
    logseq.App.registerCommandShortcut(
      { binding: logseq.settings.modifier + "+" + i, mode: "global" },
      async () => {
        openPage(i - 1);
      }
    );
  }
};

logseq.ready(main).catch(console.error);
