import "@logseq/libs";

async function openPage(index) {
  const pages = await logseq.App.getCurrentGraphFavorites();

  if (index < pages.length) {
    const page = await logseq.Editor.getPage(pages[index]);
    // await logseq.App.openInRightSidebar(page.uuid); // open in sidebar
    await logseq.App.pushState("page", { name: page.name });
  } else {
    logseq.UI.showMsg("Unknown page", "error");
  }
}

const main = async () => {
  console.log("Quick Jump plugin loaded");

  // Max 10. Not using count of fav pages as that might change after init
  for (let i = 1; i <= 10; i++) {
    // ctrl+0 is not a good keybinding
    logseq.App.registerCommandShortcut(
      { binding: "ctrl+" + i, mode: "global" },
      async () => {
        openPage(i - 1);
      }
    );
  }
};

logseq.ready(main).catch(console.error);
