// ==UserScript==
// @name         JPDB font changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  allow to change default font for jdpb.io
// @author       You
// @match        https://jpdb.io/*
// @grant        none
// ==/UserScript==

// Maybe Stylus would be much better

// default jpdb fonts
const defaultFonts = '"Nunito Sans","Extra Sans JP","Noto Sans Symbols2","Segoe UI",' +
    '"Noto Sans JP","Noto Sans CJK JP","Hiragino Sans GB","Meiryo",sans-serif';

// you may add your favorite font in the begining of list
// YuKyokasho
// Tsukushi A Round Gothic
// Klee
// Kaiti SC
// https://mhdigital.llc/web-typography-in-japanese/
const preferredFonts = '"YuKyokasho", "ヒラギノ角ゴ ProN" , "Hiragino Kaku Gothic ProN" , "游ゴシック" , "游ゴシック体" , ' +
    '"YuGothic" , "Yu Gothic" , "メイリオ" , "Meiryo" , "ＭＳ ゴシック" , "MS Gothic" , "HiraKakuProN-W3" , ' +
    '"TakaoExゴシック" , "TakaoExGothic" , "MotoyaLCedar" , "Droid Sans Japanese" , "sans-serif"';
const preferredCustomMeaningFonts = defaultFonts;

(function() {
    'use strict';
    setFont();
    // needed for review page
    waitForElm('.subsection-meanings .subsection').then((elm) => {
        setFont();
    });
})();

function setFont() {
    setFontForAllElement('body');
    setFontForAllElement('.plain');
    setFontForAllElement('ruby');
    setFontForAllElement('.nav-item');
    setFontForAllElement('.description');
    //setFontForAllElement('input');

    // Cyrillic fonts are possible in custom meaning so don't apply custom font here
    // because many of them can't work with cyrillic fonts properly
    let customMeaning = document.querySelector('.custom-meaning')
    if (customMeaning) {
        customMeaning.style.fontFamily = preferredCustomMeaningFonts;
    }
}

function setFontForAllElement(selector) {
    for (let n of document.querySelectorAll(selector)) {
        setFontForElement(n);
    }
}

function setFontForElement(node, redefineColor) {
    node.style.fontFamily = preferredFonts;
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
