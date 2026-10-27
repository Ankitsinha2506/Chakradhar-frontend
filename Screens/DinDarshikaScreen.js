import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

// Panchang calculations (the provided code)
// ... (include the entire panchang object code here)
// Make sure to include the calculate function and all necessary data
// Panchang calculations
const d2r = Math.PI / 180;
const r2d = 180 / Math.PI;

const zn = [
  "Mesha", "Vrushabha", "Mithuna", "Karkataka", "Simha", "Kanya", "Tula", 
  "Vrushchika", "Dhanu", "Makara", "Kumbha", "Meena"
];
const wd = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];
const naks = [
  "Ashwini", "Bharani", "Kruthika", "Rohini", "Mrugasira", "Aarudra", 
  "Punarwasu", "Pushyami", "Aslesha", "Makha", "Pubha", "Uttara", "Hasta", 
  "Chitta", "Swati", "Visakha", "Anuradha", "Jyesta", "Mula", "Purva-Shada", 
  "Uttara-Shaada", "Sravanam", "Dhanista", "Satabhisham", "Purva-Bhadra", 
  "Uttara-Bhadra", "Revathi"
];
const tith = [
  "Padyami", "Vidhiya", "Thadiya", "Chavithi", "Panchami", "Shasti", 
  "Sapthami", "Ashtami", "Navami", "Dasami", "Ekadasi", "Dvadasi", 
  "Trayodasi", "Chaturdasi", "Punnami", "Padyami", "Vidhiya", "Thadiya", 
  "Chaviti", "Panchami", "Shasti", "Sapthami", "Ashtami", "Navami", "Dasami", 
  "Ekadasi", "Dvadasi", "Trayodasi", "Chaturdasi", "Amavasya"
];
const kar = [
  "Bawa", "Balava", "Kaulava", "Taitula", "Garaja", "Vanija", "Vishti", 
  "Sakuna", "Chatushpada", "Nagava", "Kimstughana"
];
const yog = [
  "Vishkambha", "Prithi", "Ayushman", "Saubhagya", "Sobhana", "Atiganda", 
  "Sukarman", "Dhrithi", "Soola", "Ganda", "Vridhi", "Dhruva", "Vyaghata", 
  "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Siva", 
  "Siddha", "Sadhya", "Subha", "Sukla", "Bramha", "Indra", "Vaidhruthi"
];

let Lmoon, Lsun, skor, LmoonYoga, LsunYoga, dt;
let ayanamsa = 0;

// Data on the Moon outrage in length.
class Corr {
  constructor(mlcor, mscor, fcor, dcor, lcor) {
    this.mlcor = mlcor;
    this.mscor = mscor;
    this.fcor = fcor;
    this.dcor = dcor;
    this.lcor = lcor;
  }
}

class Corr2 {
  constructor(l, ml, ms, f, d) {
    this.l = l;
    this.ml = ml;
    this.ms = ms;
    this.f = f;
    this.d = d;
  }
}

const corrMoon = [];
let i = 0;
// ml, ms, f, d, l
const moonCorrections = [
  [0, 0, 0, 4, 13.902], [0, 0, 0, 2, 2369.912], [1, 0, 0, 4, 1.979], 
  [1, 0, 0, 2, 191.953], [1, 0, 0, 0, 22639.5], [1, 0, 0, -2, -4586.465], 
  [1, 0, 0, -4, -38.428], [1, 0, 0, -6, -0.393], [0, 1, 0, 4, -0.289], 
  [0, 1, 0, 2, -24.42], [0, 1, 0, 0, -668.146], [0, 1, 0, -2, -165.145], 
  [0, 1, 0, -4, -1.877], [0, 0, 0, 3, 0.403], [0, 0, 0, 1, -125.154], 
  [2, 0, 0, 4, 0.213], [2, 0, 0, 2, 14.387], [2, 0, 0, 0, 769.016], 
  [2, 0, 0, -2, -211.656], [2, 0, 0, -4, -30.773], [2, 0, 0, -6, -0.57], 
  [1, 1, 0, 2, -2.921], [1, 1, 0, 0, -109.673], [1, 1, 0, -2, -205.962], 
  [1, 1, 0, -4, -4.391], [1, -1, 0, 4, 0.283], [1, -1, 0, 2, 14.577], 
  [1, -1, 0, 0, 147.687], [1, -1, 0, -2, 28.475], [1, -1, 0, -4, 0.636], 
  [0, 2, 0, 2, -0.189], [0, 2, 0, 0, -7.486], [0, 2, 0, -2, -8.096], 
  [0, 0, 2, 2, -5.741], [0, 0, 2, 0, -411.608], [0, 0, 2, -2, -55.173], 
  [0, 0, 2, -4, 0.025], [1, 0, 0, 1, -8.466], [1, 0, 0, -1, 18.609], 
  [1, 0, 0, -3, 3.215], [0, 1, 0, 1, 18.023], [0, 1, 0, -1, 0.56], 
  [3, 0, 0, 2, 1.06], [3, 0, 0, 0, 36.124], [3, 0, 0, -2, -13.193], 
  [3, 0, 0, -4, -1.187], [3, 0, 0, -6, -0.293], [2, 1, 0, 2, -0.29], 
  [2, 1, 0, 0, -7.649], [2, 1, 0, -2, -8.627], [2, 1, 0, -4, -2.74], 
  [2, -1, 0, 2, 1.181], [2, -1, 0, 0, 9.703], [2, -1, 0, -2, -2.494], 
  [2, -1, 0, -4, 0.36], [1, 2, 0, 0, -1.167], [1, 2, 0, -2, -7.412], 
  [1, 2, 0, -4, -0.311], [1, -2, 0, 2, 0.757], [1, -2, 0, 0, 2.58], 
  [1, -2, 0, -2, 2.533], [0, 3, 0, -2, -0.344], [1, 0, 2, 2, -0.992], 
  [1, 0, 2, 0, -45.099], [1, 0, 2, -2, -0.179], [1, 0, -2, 2, -6.382], 
  [1, 0, -2, 0, 39.528], [1, 0, -2, -2, 9.366], [0, 1, 2, 0, 0.415], 
  [0, 1, 2, -2, -2.152], [0, 1, -2, 2, -1.44], [0, 1, -2, -2, 0.384], 
  [2, 0, 0, 1, -0.586], [2, 0, 0, -1, 1.75], [2, 0, 0, -3, 1.225], 
  [1, 1, 0, 1, 1.267], [1, -1, 0, -1, -1.089], [0, 0, 2, -1, 0.584], 
  [4, 0, 0, 0, 1.938], [4, 0, 0, -2, -0.952], [3, 1, 0, 0, -0.551], 
  [3, 1, 0, -2, -0.482], [3, -1, 0, 0, 0.681], [2, 0, 2, 0, -3.996], 
  [2, 0, 2, -2, 0.557], [2, 0, -2, 2, -0.459], [2, 0, -2, 0, -1.298], 
  [2, 0, -2, -2, 0.538], [1, 1, -2, -2, 0.426], [1, -1, 2, 0, -0.304], 
  [1, -1, -2, 2, -0.372], [0, 0, 4, 0, 0.418], [2, -1, 0, -1, -0.352]
];
moonCorrections.forEach(c => corrMoon.push(new Corr(...c)));

const corrMoon2 = [];
i = 0;
// l, ml, ms, f, d
const moonCorrections2 = [
  [0.127, 0, 0, 0, 6], [-0.151, 0, 2, 0, -4], [-0.085, 0, 0, 2, 4], 
  [0.15, 0, 1, 0, 3], [-0.091, 2, 1, 0, -6], [-0.103, 0, 3, 0, 0], 
  [-0.301, 1, 0, 2, -4], [0.202, 1, 0, -2, -4], [0.137, 1, 1, 0, -1], 
  [0.233, 1, 1, 0, -3], [-0.122, 1, -1, 0, 1], [-0.276, 1, -1, 0, -3], 
  [0.255, 0, 0, 2, 1], [0.254, 0, 0, 2, -3], [-0.1, 3, 1, 0, -4], 
  [-0.183, 3, -1, 0, -2], [-0.297, 2, 2, 0, -2], [-0.161, 2, 2, 0, -4], 
  [0.197, 2, -2, 0, 0], [0.254, 2, -2, 0, -2], [-0.25, 1, 3, 0, -2], 
  [-0.123, 2, 0, 2, 2], [0.173, 2, 0, -2, -4], [0.263, 1, 1, 2, 0], 
  [0.13, 3, 0, 0, -1], [0.113, 5, 0, 0, 0], [0.092, 3, 0, 2, -2]
];
moonCorrections2.forEach(c => corrMoon2.push(new Corr2(...c)));

function daysInMonth(m, y) {
  const g_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) g_days[1] = 29;
  return g_days[m];
}

// Calculating geotsent p avoid longitude Moon and angular sector p News.
function moon(jd) {
  const dgc = 1; // Replace with the correct value or calculation
  // days from 1900
  const tdays = jd - 2415020;
  const t = tdays / 36525;
  const t2 = t * t;
  const t3 = t * t * t;

  // slope travels to the equator
  const ob = 23.452294 - 0.0130125 * t - 0.00000164 * t2 + 0.000000503 * t3;
  // the average length moon
  let l = 270.4337361 + 13.176396544528099 * tdays - (5.86 * t2) / 3600 + (0.0068 * t3) / 3600;
  // the difference medium length Moon and the Sun (the averageElongation Moon):
  const d = 350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3 + 0.0000018888889 * t3;
  // Perigee moon
  const pe = 334.329556 + (14648522.52 * t) / 3600 - (37.17 * t2) / 3600 - (0.045 * t3) / 3600;
  // the average anomoly sun
  let ms = 358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4 - t3 * 3.3333333623078e-6;
  // The average anomoloy moon
  const ml = fix360(l - pe);
  // Rising length node orbit the moon:
  const om = 259.183275 - (6962911.23 * t) / 3600 + (7.48 * t2) / 3600 + (0.008 * t3) / 3600;
  // the average length Moon, measured from the bottom up hub orbit:
  const f = fix360(l - om);

  let lk = 0;
  let lk1 = 0;
  let sk = 0;
  let sinp = 0;
  let nib = 0;
  let g1c = 0;
  const i1corr = 1.0 - 6.832e-8 * tdays;
  const i2corr = dgc * dgc;

  for (let i = 0; i < 93; i++) {
    // outrage at length
    const arg = corrMoon[i].mlcor * ml + corrMoon[i].mscor * ms + corrMoon[i].fcor * f + corrMoon[i].dcor * d;
    let sinarg = Math.sin(arg * d2r);
    if (corrMoon[i].mscor !== 0) {
      sinarg *= i1corr;
      if (corrMoon[i].mscor === 2 || corrMoon[i].mscor === -2) sinarg *= i1corr;
    }
    if (corrMoon[i].fcor !== 0) sinarg *= i2corr;
    lk += corrMoon[i].lcor * sinarg;
  }
  for (let i = 0; i < 27; i++) {
    // outrage at length additional
    const arg = corrMoon2[i].ml * ml + corrMoon2[i].ms * ms + corrMoon2[i].f * f + corrMoon2[i].d * d;
    const sinarg = Math.sin(arg * d2r);
    lk1 += corrMoon2[i].l * sinarg;
  }

  // resentments of the planets
  let dlid = 0.822 * Math.sin((0.3248 - 0.0017125594 * tdays) * d2r);
  dlid += 0.307 * Math.sin((0.14905 - 0.0034251187 * tdays) * d2r);
  dlid += 0.348 * Math.sin((0.68266 - 0.0006873156 * tdays) * d2r);
  dlid += 0.662 * Math.sin((0.65162 + 0.0365724168 * tdays) * d2r);
  dlid += 0.643 * Math.sin((0.88098 - 0.0025069941 * tdays) * d2r);
  dlid += 1.137 * Math.sin((0.85823 + 0.036448727 * tdays) * d2r);
  dlid += 0.436 * Math.sin((0.71892 + 0.036217918 * tdays) * d2r);
  dlid += 0.327 * Math.sin((0.97639 + 0.000173491 * tdays) * d2r);

  l = l + nutation(jd) + (dlid + lk + lk1) / 3600.0;
  LmoonYoga = l;
  l = fix360(l);

  // angular velocity of the moon on ecliptic (deg/day):
  let vl = 13.176397;
  vl += 1.434006 * Math.cos(ml * d2r);
  vl += 0.280135 * Math.cos(2 * d * d2r);
  vl += 0.251632 * Math.cos((2 * d - ml) * d2r);
  vl += 0.09742 * Math.cos(2 * ml * d2r);
  vl -= 0.052799 * Math.cos(2 * f * d2r);
  vl += 0.034848 * Math.cos((2 * d + ml) * d2r);
  vl += 0.018732 * Math.cos((2 * d - ms) * d2r);
  vl += 0.010316 * Math.cos((2 * d - ms - ml) * d2r);
  vl += 0.008649 * Math.cos((ms - ml) * d2r);
  vl -= 0.008642 * Math.cos((2 * f + ml) * d2r);
  vl -= 0.007471 * Math.cos((ms + ml) * d2r);
  vl -= 0.007387 * Math.cos(d * d2r);
  vl += 0.006864 * Math.cos((3 * ml) * d2r);
  vl += 0.00665 * Math.cos((4 * d - ml) * d2r);
  vl += 0.003523 * Math.cos((2 * d + 2 * ml) * d2r);
  vl += 0.003377 * Math.cos((4 * d - 2 * ml) * d2r);
  vl += 0.003287 * Math.cos((4 * d) * d2r);
  vl -= 0.003193 * Math.cos(ms * d2r);
  vl -= 0.003003 * Math.cos((2 * d + ms) * d2r);
  vl += 0.002577 * Math.cos((ml - ms + 2 * d) * d2r);
  vl -= 0.002567 * Math.cos((2 * f - ml) * d2r);
  vl -= 0.001794 * Math.cos((2 * d - 2 * ml) * d2r);
  vl -= 0.001716 * Math.cos((ml - 2 * f - 2 * d) * d2r);
  vl -= 0.001698 * Math.cos((2 * d + ms - ml) * d2r);
  vl -= 0.001415 * Math.cos((2 * d + 2 * f) * d2r);
  vl += 0.001183 * Math.cos((2 * ml - ms) * d2r);
  vl += 0.00115 * Math.cos((d + ms) * d2r);
  vl -= 0.001035 * Math.cos((d + ml) * d2r);
  vl -= 0.001019 * Math.cos((2 * f + 2 * ml) * d2r);
  vl -= 0.001006 * Math.cos((ms + 2 * ml) * d2r);

  skor = vl;
  return l;
}

// Calculating geotsent p avoid longitude Sun.
function sun(jd) {
  const tdays = jd - 2415020;

  const t = tdays / 36525;
  const t2 = t * t;
  const t3 = t * t * t;

  // the avg len sun
  let ls = 279.696678 + 0.9856473354 * tdays + (1.089 * t2) / 3600;
  // perigee sun
  const pes = 101.220833 + (6189.03 * t) / 3600 + (1.63 * t2) / 3600 + (0.012 * t3) / 3600;
  // avg anomoly sun
  let ms = fix360(ls - pes + 180);
  const g = ms + (0.266 * Math.sin((31.8 + 119.0 * t) * d2r) + 6.4 * Math.sin((231.19 + 20.2 * t) * d2r) + (1.882 - 0.016 * t) * Math.sin((57.24 + 150.27 * t) * d2r)) / 3600.0;
  // Rising sun node len
  const oms = 259.18 - 1934.142 * t;
  // eccentricity orbit sun
  const ex = 0.01675104 - 0.0000418 * t - 0.000000126 * t2;
  // avg length moon
  let l = 270.4337361 + 13.176396544528099 * tdays - (5.86 * t2) / 3600 + (0.0068 * t3) / 3600;
  // avg anomaly moon
  const ml = fix360(l - pes);
  // avg len earth
  const le = 99.696678 + 0.9856473354 * tdays + (1.089 * t2) / 3600;

  const om = 259.183275 - (6962911.23 * t) / 3600 + (7.48 * t2) / 3600 + (0.008 * t3) / 3600;

  // eccentric anomaly calculation iterative method
  const u = kepler(g, ex, 0.0000003);

  const b = Math.sqrt((1 + ex) / (1 - ex));
  let truanom;
  if (Math.abs(Math.PI - u) < 1.0e-10) {
    truanom = u;
  } else {
    truanom = 2.0 * Math.atan(b * Math.tan(u / 2));
  }
  truanom = fix360(truanom * r2d);

  // corrections for cal of longitude and radius vector
  const u1 = (153.23 + 22518.7541 * t) * d2r;
  const u2 = (216.57 + 45037.5082 * t) * d2r;
  const u3 = (312.69 + 32964.3577 * t) * d2r;
  const u4 = (350.74 + 445267.1142 * t - 0.00144 * t2) * d2r;
  const u6 = (353.4 + 65928.71550000001 * t) * d2r;
  const u5 = (315.6 + 893.3 * t) * d2r;

  let dl = 0.00134 * Math.cos(u1);
  dl += 0.00154 * Math.cos(u2);
  dl += 0.002 * Math.cos(u3);
  dl += 0.00179 * Math.sin(u4);
  dl += (0.202 * Math.sin(u5)) / 3600;

  let dr = 0.00000543 * Math.sin(u1);
  dr += 0.00001575 * Math.sin(u2);
  dr += 0.00001627 * Math.sin(u3);
  dr += 0.00003076 * Math.cos(u4);
  dr += 9.26999999e-6 * Math.sin(u6);

  // true len of sun (deg)
  const il = ls + dl + truanom - ms;

  // corrections to aberrations links
  const r1 = (1.0000002 * (1 - ex * ex)) / (1 + ex * Math.cos(truanom * d2r));
  const rs = r1 + dr; // radius vector
  const ab = (20.496 * (1 - ex * ex)) / rs / 3600;
  ls = il + nutation(jd) - ab; // app len sun
  LsunYoga = ls;

  return fix360(ls);
}

// Calculate start and end of tithi (len = 12) and karana (len = 6)
function tithi(jd, n1, tzone, len) {
  const s_t = { start: null, end: null };
  let flag;
  let jdt = jd;
  const knv = Math.floor(((jd - 2415020) / 365.25) * 12.3685);

  for (let itit = n1; itit < n1 + 2; ++itit) {
    const aspect = len * itit; // sun n moon in the early tithi
    flag = 0;
    if (aspect === 0) {
      jdt = novolun(jd, knv);
      flag = 1;
    }
    if (aspect === 360) {
      jdt = novolun(jd, knv + 1);
      flag = 1;
    }
    while (flag < 1) {
      const Lsun0 = sun(jdt);
      const Lmoon0 = moon(jdt);
      const a = fix360(Lsun0 + aspect); // pt should be where luna
      let asp1 = a - Lmoon0; // asymptotes of the moon to your point
      if (asp1 > 180) asp1 -= 360;
      if (asp1 < -180) asp1 += 360;
      flag = 1;

      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / (skor - 1);
        flag = 0;
      }
    }
    if (itit === n1) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (itit === n1 + 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

// Calculate entry and exit moon in nakshatra
function nakshatra(jd, n_naksh, tzone) {
  const s_t = { start: null, end: null };
  let flag;
  let jdt = jd;

  for (let inak = n_naksh; inak < n_naksh + 2; ++inak) {
    const n1 = fix360((inak * 80) / 6); // co-ordinate start of nakshatra
    flag = 0;
    while (flag < 1) {
      const Lmoon0 = fix360(moon(jdt) + ayanamsa);
      let asp1 = n1 - Lmoon0; // distance from moon before nakshatra(degree)
      if (asp1 > 180) asp1 -= 360;
      if (asp1 < -180) asp1 += 360;
      flag = 1;
      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / skor;
        flag = 0;
      }
    }
    if (inak === n_naksh) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (inak === n_naksh + 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

// Calculate begin and end of yoga

function yoga(jd, zyoga, tzone) {
  const s_t = { start: null, end: null };
  let flag;
  let jdt = jd;
  const nn_yoga = new Array(2);
  nn_yoga[0] = (Math.floor((zyoga * 6) / 80) * 80) / 6;
  nn_yoga[1] = ((Math.floor((zyoga * 6) / 80) + 1) * 80) / 6;
  for (let iyog = 0; iyog < 2; ++iyog) {
    flag = 0;
    while (flag < 1) {
      const Lsun0 = sun(jdt);
      const Lmoon0 = moon(jdt);
      const dmoonYoga = LmoonYoga + ayanamsa - 491143.07698973856;
      const dsunYoga = LsunYoga + ayanamsa - 36976.91240579201;
      const z = dmoonYoga + dsunYoga;
      let asp1 = nn_yoga[iyog] - z;
      flag = 1;
      if (Math.abs(asp1) > 0.001) {
        jdt += asp1 / (skor + 1.0145616633);
        flag = 0;
      }
    }
    if (iyog === 0) s_t.start = calData(jdt + (tzone - dt) / 24);
    if (iyog === 1) s_t.end = calData(jdt + (tzone - dt) / 24);
  }
  return s_t;
}

// Calculate time in the near past novoluna (error less than 2 min)
function novolun(jd, knv) {
  const t = (jd - 2415020) / 36525;
  const t2 = t * t;
  const t3 = t * t * t;

  let jdnv = 2415020.75933 + 29.53058868 * knv + 0.0001178 * t2 - 0.000000155 * t3;
  jdnv += 0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * d2r);
  const m = 359.2242 + 29.10535608 * knv - 0.0000333 * t2 - 0.00000347 * t3;
  const ml = 306.0253 + 385.81691806 * knv + 0.0107306 * t2 + 0.00001236 * t3;
  const f = 21.2964 + 390.67050646 * knv - 0.0016528 * t2 - 0.00000239 * t3;
  jdnv += (0.1734 - 0.000393 * t) * Math.sin(m * d2r);
  jdnv += 0.0021 * Math.sin(2 * m * d2r);
  jdnv -= 0.4068 * Math.sin(ml * d2r);
  jdnv += 0.0161 * Math.sin(2 * ml * d2r);
  jdnv -= 0.0004 * Math.sin(3 * ml * d2r);
  jdnv += 0.0104 * Math.sin(2 * f * d2r);
  jdnv -= 0.0051 * Math.sin((m + ml) * d2r);
  jdnv -= 0.0074 * Math.sin((m - ml) * d2r);
  jdnv += 0.0004 * Math.sin((2 * f + m) * d2r);
  jdnv -= 0.0004 * Math.sin((2 * f - m) * d2r);
  jdnv -= 0.0006 * Math.sin((2 * f + ml) * d2r);
  jdnv += 0.001 * Math.sin((2 * f - ml) * d2r);
  jdnv += 0.0005 * Math.sin((m + 2 * ml) * d2r);

  return jdnv;
}

// Decision equation kepler (in rad)
function kepler(m, ex, err) {
  m *= d2r;
  let u0 = m;
  err *= d2r;
  let delta = 1;
  while (Math.abs(delta) >= err) {
    delta = (m + ex * Math.sin(u0) - u0) / (1 - ex * Math.cos(u0));
    u0 += delta;
  }
  return u0;
}

// Calculate nutation in length
function nutation(jd) {
  const t = (jd - 2415020) / 36525;
  const t2 = t * t;

  const ls = 279.6967 + 36000.7689 * t + 0.000303 * t2;
  const l = 270.4341639 + 481267.8831417 * t - 0.0011333333 * t2;
  const ms = 358.4758333333334 + 35999.04974999958 * t - t2 * 1.500000059604645e-4;
  const ml = 296.1046083333757 + 477198.8491083336 * t + 0.0091916667090522 * t2;
  const d = 350.7374861110581 + 445267.1142166667 * t - t2 * 1.436111132303874e-3;

  const om = 259.1832750002543 - 1934.142008333206 * t + 0.0020777778 * t2;
  const lsRad = ls * d2r;
  const lRad = l * d2r;
  const msRad = ms * d2r;
  const mlRad = ml * d2r;
  const dRad = d * d2r;
  const omRad = om * d2r;

  let nut = (-17.2327 - 0.01737 * t) * Math.sin(omRad);
  nut += 0.2088 * Math.sin(2.0 * omRad);
  nut += 0.0675 * Math.sin(mlRad);
  nut -= 0.0149 * Math.sin(mlRad - dRad);
  nut -= 0.0342 * Math.sin(lRad - omRad);
  nut += 0.0114 * Math.sin(lRad - mlRad);
  nut -= 0.2037 * Math.sin(lRad);
  nut -= 0.0261 * Math.sin(lRad + mlRad);
  nut += 0.0124 * Math.sin(lsRad - omRad);
  nut += 0.0214 * Math.sin(lsRad - msRad);
  nut -= 1.2729 * Math.sin(lsRad);
  nut -= 0.0497 * Math.sin(lsRad + msRad);
  nut += 0.1261 * Math.sin(msRad);
  nut = nut / 3600.0;
  return nut;
}

// Calculate ayanamsa (degrees)
function calcayan(jd) {
  const t = (jd - 2415020) / 36525;
  const om = 259.183275 - 1934.142008333206 * t + 0.0020777778 * t * t + 0.0000022222222 * t * t * t;
  const ls = 279.696678 + 36000.76892 * t + 0.0003025 * t * t;
  let aya = 17.23 * Math.sin(d2r * om) + 1.27 * Math.sin(d2r * ls * 2) - (5025.64 + 1.11 * t) * t;
  aya = (aya - 80861.27) / 3600.0; // 84038.27 = Fagan-Bradley, 80861.27 = Lahiri
  return aya;
}

// Convert date to Julian date
function mdy2julian(m, d, y) {
  const im = 12 * (y + 4800) + m - 3;
  let j = (2 * (im - Math.floor(im / 12) * 12) + 7 + 365 * im) / 12;
  j = Math.floor(j) + d + Math.floor(im / 48) - 32083;
  if (j > 2299171) j += Math.floor(im / 4800) - Math.floor(im / 1200) + 38;
  j -= 0.5;
  return j;
}

// Calculate date based on Julian date
function calData(jd) {
  if (isNaN(jd) || jd <= 0) {
    console.log("Invalid Julian Date:", jd); // Log the invalid value
    return null;
  }

  const z1 = jd + 0.5;
  const z2 = Math.floor(z1);
  const f = z1 - z2;

  console.log("z1:", z1, "z2:", z2, "f:", f);

  let a;
  if (z2 < 2299161) {
    a = z2;
  } else {
    const alf = Math.floor((z2 - 1867216.25) / 36524.25);
    a = z2 + 1 + alf - Math.floor(alf / 4);
  }

  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);

  console.log("b:", b, "c:", c, "d:", d, "e:", e);

  const days = b - d - Math.floor(30.6001 * e) + f;
  const kday = Math.floor(days);

  console.log("days:", days, "kday:", kday);

  let kmon;
  let kyear;
  if (e < 13.5) {
    kmon = e - 1;
  } else {
    kmon = e - 13;
  }

  if (kmon > 2.5) {
    kyear = c - 4716;
  }
  if (kmon < 2.5) {
    kyear = c - 4715;
  }

  console.log("kmon:", kmon, "kyear:", kyear);

  const hh1 = (days - kday) * 24;
  const khr = Math.floor(hh1);
  const kmin = (hh1 - khr) * 60;
  const ksek = (kmin - Math.floor(kmin)) * 60;
  const kminFinal = Math.floor(kmin);
  const ksekFinal = Math.floor(ksek);

  console.log("khr:", khr, "kminFinal:", kminFinal, "ksekFinal:", ksekFinal);

  // Ensure that all parts are valid numbers
  if (isNaN(kyear) || isNaN(kmon) || isNaN(kday) || isNaN(khr) || isNaN(kminFinal) || isNaN(ksekFinal)) {
    console.log("Invalid date components:", { kyear, kmon, kday, khr, kminFinal, ksekFinal });
    return null;
  }

  // Return a valid Date object
  const result = new Date(Date.UTC(kyear, kmon - 1, kday, khr, kminFinal, ksekFinal));
  console.log("Resulting Date:", result);
  return result;
}




// Fix angle within 360 degrees
function fix360(v) {
  while (v < 0.0) v += 360.0;
  while (v > 360.0) v -= 360.0;
  return v;
}

// Day of the Week
function weekDay(jd) {
  let jd0 = Math.floor(jd) + 0.5;
  if (jd < jd0) jd0 -= 1;

  const jdn = jd0 + 1.5;
  const dn1 = Math.floor(jdn / 7) * 7;

  return Math.floor(jdn - dn1);
}

// Panchang object
const panchang = {
  Day: {},
  Tithi: {},
  Nakshatra: {},
  Karna: {},
  Yoga: {},
  Ayanamsa: {},
  Raasi: {},
  version: "0.2",

  calculate: function (d, cb) {
    let n_wday, n_tithi = 1, n_naksh = 1, n_karana, n_yoga;

    const day = d.getDate();
    const mon = d.getMonth() + 1; // Months are 0-indexed in JavaScript
    const year = d.getFullYear();

    // Define kyear, kmon, and kday
    const kyear = year;
    const kmon = mon;
    const kday = day;

    let hr = d.getHours();
    hr += d.getMinutes() / 60;
    const tzone = d.getTimezoneOffset() / 60 * (-1);

    const dayhr = day + hr / 24;
    const jdlt = mdy2julian(mon, dayhr, year);

    // day:
    n_wday = weekDay(jdlt);
    this.Day.name = wd[n_wday];

    // julian day at the beginning of the day
    const jd0 = mdy2julian(mon, day, year);
    const jdut = jd0 + (hr - tzone) / 24;

    const dt = this.dTime(jdut, kyear, kmon, kday); 
    const jd = jdut + dt / 24;

    // ayanamsa
    ayanamsa = calcayan(jd);

    // length Moon
    Lmoon = moon(jd);

    // Logitudinal Sun
    Lsun = sun(jd);

    // yoga:
    const dmoonYoga = (LmoonYoga + ayanamsa - 491143.07698973856);
    const dsunYoga = (LsunYoga + ayanamsa - 36976.91240579201);
    const zyoga = dmoonYoga + dsunYoga;
    n_yoga = zyoga * 6 / 80;
    while (n_yoga < 0) n_yoga += 27;
    while (n_yoga > 27) n_yoga -= 27;
    n_yoga = Math.floor(n_yoga);
    const s_yoga = yoga(jd, zyoga, tzone);

    // Nakshatra
    const Lmoon0 = fix360(Lmoon + ayanamsa);
    n_naksh = Math.floor(Lmoon0 * 6 / 80);
    const s_naksh = nakshatra(jd, n_naksh, tzone);

    // Tithi
    let Lmoon0Tithi = Lmoon;
    let Lsun0 = Lsun;
    if (Lmoon0Tithi < Lsun0) Lmoon0Tithi += 360;
    n_tithi = Math.floor((Lmoon0Tithi - Lsun0) / 12);
    const s_tithi = tithi(jd, n_tithi, tzone, 12);

    // Karana
    Lmoon0Tithi = Lmoon;
    Lsun0 = Lsun;
    if (Lmoon0Tithi < Lsun0) Lmoon0Tithi += 360;
    const nk = Math.floor((Lmoon0Tithi - Lsun0) / 6);
    if (nk === 0) n_karana = 10;
    if (nk >= 57) n_karana = nk - 50;
    if (nk > 0 && nk < 57) n_karana = (nk - 1) - (Math.floor((nk - 1) / 7)) * 7;
    const s_karana = tithi(jd, nk, tzone, 6);

    const z = Math.floor(Math.abs(fix360(Lmoon + ayanamsa)) / 30);

    this.Ayanamsa.name = lon2dms(ayanamsa);
    this.Raasi.name = zn[z];
    this.Nakshatra.name = naks[n_naksh];
    this.Nakshatra.start = s_naksh.start;
    this.Nakshatra.end = s_naksh.end;

    this.Karna.name = kar[n_karana];
    this.Karna.start = s_karana.start;
    this.Karna.end = s_karana.end;

    this.Yoga.name = yog[n_yoga];
    this.Yoga.start = s_yoga.start;
    this.Yoga.end = s_yoga.end;

    this.Tithi.name = tith[n_tithi];
    this.Tithi.start = s_tithi.start;
    this.Tithi.end = s_tithi.end;

    if (cb) { cb(); }
  },

  dTime: function (jd, kyear, kmon, kday) {
    const efdt = [124, 85, 62, 48, 37, 26, 16, 10, 9, 10, 11, 11, 12, 13, 15, 16, 17, 17, 13.7, 12.5, 12, 7.5, 5.7, 7.1, 7.9, 1.6, -5.4, -5.9, -2.7, 10.5, 21.2, 24, 24.3, 29.2, 33.2, 40.2, 50.5, 56.9, 65.7, 75.5];
    const s = calData(jd);
    const dgod = kyear + (kmon - 1) / 12 + (kday - 1) / 365.25;
    const t = (jd - 2378497) / 36525; // IN centuries rejection of 1800 bc

    let dt;
    if (dgod >= 1620 && dgod < 2010) {
      const i1 = Math.floor((dgod - 1620) / 10);
      const di = dgod - (1620 + i1 * 10);
      dt = (efdt[i1] + ((efdt[i1 + 1] - efdt[i1]) * di) / 10);
    } else {
      if (dgod >= 2010) dt = 25.5 * t * t - 39;
      if (dgod >= 948 && dgod < 1620) dt = 25.5 * t * t;
      if (dgod < 948) dt = 1361.7 + 320 * t + 44.3 * t * t;
    }
    dt /= 3600;
    return dt;
  }
};

// Helper function to convert longitude to degrees, minutes, and seconds
function lon2dms(lon) {
  const deg = Math.floor(lon);
  const min = Math.floor((lon - deg) * 60);
  const sec = Math.floor((lon - deg - min / 60) * 3600);
  return `${deg}°${min}'${sec}''`;
}


const DinDarshikaScreen = () => {
  const [panchangData, setPanchangData] = useState(null);

  useEffect(() => {
    const today = new Date();
    panchang.calculate(today, () => {
      setPanchangData({ ...panchang });
    });
  }, []);

  if (!panchangData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  // const formatDateString = (date) => {
  //   return date instanceof Date && !isNaN(date) ? date.toLocaleString() : 'Invalid Date';
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/chimage.png')} style={styles.icon} /> 
          <Text style={styles.title}>Din Darshika (Panchang)</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 दिवस:</Text>
            <Text style={styles.sectionContent}>{panchangData.Day.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌙 तिथी:</Text>
            <Text style={styles.sectionContent}>{panchangData.Tithi.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⭐ नक्षत्र:</Text>
            <Text style={styles.sectionContent}>{panchangData.Nakshatra.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⏳ करण:</Text>
            <Text style={styles.sectionContent}>{panchangData.Karna.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🧘 योग:</Text>
            <Text style={styles.sectionContent}>{panchangData.Yoga.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🌍 अयनंसा:</Text>
            <Text style={styles.sectionContent}>{panchangData.Ayanamsa.name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>♈ चंद्र राशी:</Text>
            <Text style={styles.sectionContent}>{panchangData.Raasi.name}</Text>
          </View>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F04333',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A148C', // Purple for a divine feel
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
export default DinDarshikaScreen;

