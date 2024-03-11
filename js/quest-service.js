"use strict";
var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const QUESTS_KEY = "gqueststree";

function createQuestsTree() {
  gQuestsTree = loadFromStorage(QUESTS_KEY);
  if (!loadFromStorage(QUESTS_KEY)) {
    gQuestsTree = createQuest("Male?");
    gQuestsTree.yes = createQuest("smotrich");
    gQuestsTree.no = createQuest("Rita");
  }
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  };
}

function isChildless(node) {
  return node.yes === null && node.no === null;
}

function moveToNextQuest(res) {
  //   debugger;
  gPrevQuest = gCurrQuest;
  gCurrQuest = gCurrQuest[res];
  //   gCurrQuest = gPrevQuest[res];
  console.log("gCurrQuest", gCurrQuest);
  //   console.log("gPrevQuest", gPrevQuest[res]);
  // TODO: update the gPrevQuest,
  // gCurrQuest global vars
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  //   // createQuest()
  console.log("gQuestsTree", gQuestsTree);
  console.log("newQuestTxt", newQuestTxt);
  console.log("newGuessTxt", newGuessTxt);
  console.log("lastRes", lastRes);
  //   debugger;
  lastRes.no = createQuest(lastRes.txt);
  lastRes.txt = newQuestTxt;
  lastRes.yes = createQuest(newGuessTxt);
  console.log("lastRes", lastRes);
  //   lastRes.yes.no = lastRes.yes.txt;
  //   lastRes.yes = createQuest(newQuestTxt);
  //   lastRes.yes.yes = newGuessTxt;
  //   console.log("gQuestsTree", gQuestsTree);
  //   var x = createQuest(newGuessTxt);
  //   console.log(x);
  // TODO: Create and Connect the 2 Quests
  //   to the quetsions tree
  saveToStorage(QUESTS_KEY, gQuestsTree);
}

function getCurrQuest() {
  return gCurrQuest;
}

function restartGame() {
  gCurrQuest = gQuestsTree;
  gPrevQuest = null;
}
