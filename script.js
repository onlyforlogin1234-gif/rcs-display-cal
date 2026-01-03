// ================= HELPER =================

function parseDimensionString(str) {
    if (!str) return { w: 0, h: 0 };

    const parts = str.toLowerCase().replace(/\s/g, "").split("x");
    if (parts.length !== 2) return { w: 0, h: 0 };

    return {
        w: Number(parts[0]),
        h: Number(parts[1])
    };
}

// =================  PowerConsumption Data =================
const powerConsumptionData = {
    indoor: {
        "P1.25":  { max: 586, avg: 195 },
        "P1.538":  { max: 488, avg: 163 },
        "P1.839":  { max: 488, avg: 163 },
        "P2":    { max: 488, avg: 163 },
        "P2.5":  { max: 488, avg: 163 },
        "P2.6":  { max: 675, avg: 202 },
        "P2.9":  { max: 480, avg: 144 },
        "P3":    { max: 543, avg: 180 },
        "P3.076": { max: 488, avg: 163 },
        "P3.91": { max: 500, avg: 150 },
        "P4":    { max: 488, avg: 163 }
    },

    outdoor: {
        "P2.5":  { max: 879, avg: 264 },
        "P2.60":  { max: 675, avg: 202 },
        "P3.076": { max: 879, avg: 264 },
        "P3.910": { max: 630, avg: 189 },
        "P4.810":  { max: 540, avg: 162 },
        "P4":    { max: 879, avg: 264 },
        "P5":    { max: 879, avg: 264 },
        "P6":    { max: 895, avg: 269 },
        "P6.66":  { max: 879, avg: 264 },
        "P8":    { max: 879, avg: 264 },
        "P10":   { max: 645, avg: 195 }
    }
};

// ================= MEDIA PLAYER DATA (ACCURATE NOVASTAR SPECIFICATIONS) =================
const mediaPlayerData = [
    {
        model: "TB1/TB2/TB10",
        maxPixels: 650000,
        maxWidth: 4096,
        maxHeight: 3840,
        videoDecoding: "TB1/TB2: 1080P, TB10: 4K"
    },
    {
        model: "TB30",
        maxPixels: 650000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K"
    },
    {
        model: "TB40",
        maxPixels: 1300000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K"
    },
    {
        model: "TB50",
        maxPixels: 1300000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K"
    },
    {
        model: "TB60",
        maxPixels: 2300000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K"
    },
    {
        model: "MCTRL4K",
        maxPixels: 8800000,
        maxWidth: 8192,
        maxHeight: 8192,
        videoDecoding: "4K UHD, 8K×1K@60Hz max"
    },
    {
        model: "NovaPro UHD",
        maxPixels: 10400000,
        maxWidth: 8192,
        maxHeight: 8192,
        videoDecoding: "Up to 8K×1K@60Hz"
    }
];

// ================= PIXEL PITCH DATA =================
const pixelPitchData = {

    indoor: {
        "P1.25":  { module: "320x160", res: [256,128] },
        "P1.538":  { module: "320x160", res: [208,104] },
        "P1.839":  { module: "320x160", res: [174,87] },
        "P2":    { module: "320x160", res: [160,80] },
        "P2.5":  { module: "320x160", res: [128,64] },
        "P2.6":  { module: "250x250", res: [96,96] },
        "P2.9":  { module: "250x250", res: [64,64] },
        "P3":    { module: "192x192", res: [64,64] },
        "P3.076": { module: "320x160", res: [104,52] },
        "P3.91": { module: "250x250", res: [64,64] },
        "P4":    { module: "320x160", res: [80,40] }
    },
    outdoor: {
        "P2.5":  { module: "320x160", res: [128,64] },
        "P2.60":  { module: "250x250", res: [96,96] },
        "P3":    { module: "192x192", res: [64,64] },
        "P3.076": { module: "320x160", res: [104,52] },
        "P3.910": { module: "250x250", res: [64,64] },
        "P4":    { module: "320x160", res: [80,40] },
        "P4.810":  { module: "250x250", res: [52,52] },
        "P5":    { module: "320x160", res: [64,32] },
        "P6":    { module: "192x192", res: [32,32] },
        "P6.66":  { module: "320x160", res: [48,24] },
        "P8":    { module: "320x160", res: [40,20] },
        "P10":   { module: "320x160", res: [32,16] }
    }
};

let selectedModuleResolution = { w: 0, h: 0 };

// ================= MEDIA PLAYER RECOMMENDATION =================
function recommendMediaPlayer(totalPixels, resWidth, resHeight) {
    // Sort through media players from smallest to largest capacity
    for (let i = 0; i < mediaPlayerData.length; i++) {
        const player = mediaPlayerData[i];
        
        // Check if the player can handle the total pixels AND the width AND height
        if (totalPixels <= player.maxPixels && 
            resWidth <= player.maxWidth && 
            resHeight <= player.maxHeight) {
            return player;
        }
    }
    
    // If no match found (screen too large), return the highest spec player
    return mediaPlayerData[mediaPlayerData.length - 1];
}

// ================= INSTALL TYPE CHANGE =================
const allowedCobPitches = ["P1.25", "P1.538", "P1.839"];

function updatePixelPitchOptions() {
    const installType = document.getElementById("installType").value;
    const indoorType = document.getElementById("indoorType")?.value || "SMD";
    const pitchSelect = document.getElementById("pixelPitch");

    pitchSelect.innerHTML = `<option value=""> Select Pixel Pitch </option>`;

    if (!pixelPitchData[installType]) return;

    let pitches = Object.keys(pixelPitchData[installType]);

    if (installType === "indoor" && indoorType === "COB") {
        pitches = pitches.filter(p => allowedCobPitches.includes(p));
    }

    pitches.forEach(p => {
        pitchSelect.innerHTML += `<option value="${p}">${p}</option>`;
    });
}

// ================= PIXEL PITCH CHANGE =================
document.getElementById("pixelPitch").onchange = function () {
    const type = document.getElementById("installType").value;
    const pitch = this.value;
    if (!pixelPitchData[type] || !pixelPitchData[type][pitch]) return;

    const cfg = pixelPitchData[type][pitch];
    document.getElementById("moduleSize").value = cfg.module;
    selectedModuleResolution = { w: cfg.res[0], h: cfg.res[1] };
};

// ================= MAIN CALCULATION =================
function calculateMain() {

    const installType = document.getElementById("installType")?.value || "";
    const indoorType = document.getElementById("indoorType")?.value || "SMD";
    const pixelPitch = document.getElementById("pixelPitch")?.value || "";

    const modStr = document.getElementById("moduleSize").value;
    const cabStr = document.getElementById("cabinetSize").value;
    const screenW = Number(document.getElementById("screenW").value);
    const screenH = Number(document.getElementById("screenH").value);

    if (!screenW || !screenH || !modStr || !cabStr) {
        alert("Please fill all fields!");
        return;
    }

    if (!pixelPitch) {
        alert("Please select Pixel Pitch!");
        return;
    }

    const mod = parseDimensionString(modStr);
    const cab = parseDimensionString(cabStr);

    const modW = Math.ceil(screenW / mod.w);
    const modH = Math.ceil(screenH / mod.h);
    const totalModules = modW * modH;

    const actualW = modW * mod.w;
    const actualH = modH * mod.h;

    // cabinet calculation
    const cabW = Math.ceil(actualW / cab.w);
    const cabH = Math.ceil(actualH / cab.h);
    const totalCab = cabW * cabH;

    // resolution
    const totalResW = modW * selectedModuleResolution.w;
    const totalResH = modH * selectedModuleResolution.h;
    const totalPixels = totalResW * totalResH;

    // ================= POWER DATA (FIXED) =================
    let powerData = null;
    if (powerConsumptionData[installType] &&
        powerConsumptionData[installType][pixelPitch]) {
        powerData = powerConsumptionData[installType][pixelPitch];
    }

    if (!powerData) {
        alert("Power data not available for selected configuration!");
        return;
    }

    // screen area
    const screenAreaSqM = (actualW * actualH) / 1000000;

    // kW calculation
    const totalMaxKW = (screenAreaSqM * powerData.max) / 1000;
    const totalAvgKW = (screenAreaSqM * powerData.avg) / 1000;

    const powerFactor = 0.8;
    const totalMaxKVA = totalMaxKW / powerFactor;
    const totalAvgKVA = totalAvgKW / powerFactor;

    // ================= MEDIA PLAYER RECOMMENDATION =================
    const recommendedPlayer = recommendMediaPlayer(totalPixels, totalResW, totalResH);

    // ================= OUTPUT =================
    document.getElementById("resTotalModules").innerText = totalModules;
    document.getElementById("resModW").innerText = modW;
    document.getElementById("resModH").innerText = modH;
    document.getElementById("resCabW").innerText = cabW;
    document.getElementById("resCabH").innerText = cabH;
    document.getElementById("resTotalCabinets").innerText = totalCab;

    document.getElementById("resActualSize").innerText =
        `${actualW}mm x ${actualH}mm`;

    document.getElementById("resTotalResolution").innerText =
        `${totalResW}px × ${totalResH}px = ${totalPixels.toLocaleString()} px`;

    document.getElementById("resPowerMax").innerText = powerData.max;
    document.getElementById("resPowerAvg").innerText = powerData.avg;

    document.getElementById("resTotalMaxKW").innerText =
        totalMaxKW.toFixed(2) + " kW";

    document.getElementById("resTotalAvgKW").innerText =
        totalAvgKW.toFixed(2) + " kW";

    document.getElementById("resTotalMaxKVA").innerText = 
        totalMaxKVA.toFixed(2) + " kVA";
    document.getElementById("resTotalAvgKVA").innerText = 
        totalAvgKVA.toFixed(2) + " kVA";

    // ================= MEDIA PLAYER OUTPUT =================
    document.getElementById("resMediaModel").innerText = recommendedPlayer.model;
    document.getElementById("resMediaPixels").innerText = 
        recommendedPlayer.maxPixels.toLocaleString() + " pixels";
    document.getElementById("resMediaWidth").innerText = 
        recommendedPlayer.maxWidth.toLocaleString() + " px";
    document.getElementById("resMediaHeight").innerText = 
        recommendedPlayer.maxHeight.toLocaleString() + " px";
    document.getElementById("resMediaDecoding").innerText = 
        recommendedPlayer.videoDecoding;

    document.getElementById("mainResults").classList.add("active");

    document.getElementById("checkModW").value = modW;
    document.getElementById("checkModH").value = modH;
}

// ================= Cabinets size =================
function updateCabinetOptions() {
    const installType = document.getElementById("installType")?.value;
    const indoorType = document.getElementById("indoorType")?.value;
    const cabinetSelect = document.getElementById("cabinetSize");

    if (!cabinetSelect) return;

    const options = cabinetSelect.querySelectorAll("option");

    options.forEach(opt => {
        if (installType === "indoor" && indoorType === "COB") {
            opt.style.display = opt.dataset.cob === "yes" ? "block" : "none";
        } else {
            opt.style.display = "block";
        }
    });

    if (cabinetSelect.selectedOptions.length) {
        const sel = cabinetSelect.selectedOptions[0];
        if (sel.style.display === "none") {
            cabinetSelect.value = "";
        }
    }
}

// ================= VERIFY SIZE =================
function verifySize() {
    const modStr = document.getElementById("moduleSize").value;
    const mod = parseDimensionString(modStr);
    const w = Number(document.getElementById("checkModW").value);
    const h = Number(document.getElementById("checkModH").value);
    if (!w || !h) {
        alert("Please enter module counts!");
        return;
    }

    document.getElementById("verModUsed").innerText = modStr;
    document.getElementById("verScreenSize").innerText =
        `${w * mod.w}mm x ${h * mod.h}mm`;

    document.getElementById("verifyResults").classList.add("active");
}

// ================= indoor types cob and smd =================
const installTypeSelect = document.getElementById("installType");
const indoorTypeWrapper = document.getElementById("indoorTypeWrapper");
const indoorTypeSelect = document.getElementById("indoorType");

installTypeSelect.addEventListener("change", function () {
    if (this.value === "indoor") {
        indoorTypeWrapper.style.display = "block";
    } else {
        indoorTypeWrapper.style.display = "none";
        indoorTypeSelect.value = "SMD";
    }
});

// ================= SAFE EVENT BINDING =================
setTimeout(() => {
    document.getElementById("calculateBtn")?.addEventListener("click", calculateMain);
    document.getElementById("verifyBtn")?.addEventListener("click", verifySize);
    document.getElementById("installType").addEventListener("change", updatePixelPitchOptions);
    document.getElementById("indoorType").addEventListener("change", updatePixelPitchOptions);
    document.getElementById("installType").addEventListener("change", updateCabinetOptions);
    document.getElementById("indoorType").addEventListener("change", updateCabinetOptions);
}, 0);
