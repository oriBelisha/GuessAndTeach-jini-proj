"use strict";

// NOTE: This is a global used only in the controller
var gLastRes = null;

$(document).ready(init);
$(".btn-start").click(onStartGuessing);
$(".btn-yes").click({ ans: "yes" }, onUserResponse);
$(".btn-no").click({ ans: "no" }, onUserResponse);
$(".btn-add-guess").click(onAddGuess);
$(".btn-close").click(onCloseModal);

function init() {
  console.log("Started...");
  createQuestsTree();
}

function onStartGuessing() {
  // TODO: hide the game-start section
  $(".game-start").hide();
  renderQuest();
  $(".quest").show();
  // TODO: show the quest section
}

function renderQuest() {
  $(".quest h2").text(getCurrQuest().txt);
  // TODO: select the <h2> inside quest and update
  // its text by the currQuest text
}

function onUserResponse(ev) {
  var res = ev.data.ans;
  console.log(res);
  gLastRes = getCurrQuest();
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === "yes") {
      // alert("Yes, I knew it!");
      victory();
      // TODO: improve UX
    } else {
      // alert("I dont know...teach me!");
      lostGame();

      // TODO: hide and show new-quest section
    }
  } else {
    // TODO: update the lastRes global var
    moveToNextQuest(res);
    renderQuest();
  }
}
function lostGame() {
  $(".quest").hide();
  $("#newGuess").val("");
  $("#newQuest").val("");
  $(".new-quest").show();
  $("#exampleModalLive").show("slow");
  $("#gini-says").text("I Dont Know... Teach Me Please");
  $("#exampleModalLiveLabel").text("jini says");
}

function onAddGuess(ev) {
  ev.preventDefault();
  // TODO: Get the inputs' values
  var newGuess = $("#newGuess").val();
  var newQuest = $("#newQuest").val();

  console.log(newGuess);
  console.log(newQuest);
  // TODO: Call the service addGuess
  if (newGuess && newQuest) {
    addGuess(newQuest, newGuess, gLastRes);
    onRestartGame();
  } else {
    $("#exampleModalLiveLabel").text("jini says");
    $("#gini-says").text("come on think of someone");
    $("#exampleModalLive").show("slow");
  }
}

function onRestartGame() {
  $(".new-quest").hide();
  $(".game-start").show();
  gLastRes = null;
  restartGame();
}
function onCloseModal() {
  $("#exampleModalLive").hide("slow");
  $("#gini-says").text("");
  $("#exampleModalLiveLabel").text("");
}
function victory() {
  var txt = "jini says " + ":" + " " + getCurrQuest().txt;
  $("#exampleModalLiveLabel").text(txt);
  $("#exampleModalLive").show("slow");
  $("#gini-says").text("Yes, I knew it!");
  $(".quest").hide();

  onRestartGame();
}
