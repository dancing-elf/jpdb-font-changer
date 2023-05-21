// ==UserScript==
// @name         JPDB font changer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  allow to change default font for jdpb.io
// @author       You
// @match        https://jpdb.io/*
// @grant        none
// ==/UserScript==

// default jpdb fonts
const defaultFonts = '"Nunito Sans","Extra Sans JP","Noto Sans Symbols2","Segoe UI",' +
    '"Noto Sans JP","Noto Sans CJK JP","Hiragino Sans GB","Meiryo",sans-serif';

// you may want to use something like
// YuKyokasho
// Tsukushi A Round Gothic
// Klee
// Kaiti SC
const preferredFonts = 'Klee';
const preferredCustomMeaningFonts = defaultFonts;

(function() {
    'use strict';

    let body = document.querySelector('body');
    body.style.fontFamily = preferredFonts;

    for (let plain of document.querySelectorAll('.plain')) {
        plain.style.fontFamily = preferredFonts;
    }
    for (let ruby of document.querySelectorAll('ruby')) {
        ruby.style.fontFamily = preferredFonts;
    }
    for (let plain of document.querySelectorAll('.nav-item')) {
        plain.style.fontFamily = preferredFonts;
    }

    // Cyrillic fonts are possible in custom meaning so don't apply custom font here
    // because many of them can't work with cyrillic fonts properly
    let customMeaning = document.querySelector('.custom-meaning')
    if (customMeaning) {
        customMeaning.style.fontFamily = preferredCustomMeaningFonts;
    }
})();
