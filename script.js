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

// ================= FORMAT PIXELS FUNCTION =================
function formatPixels(pixels) {
    if (pixels >= 1000000) {
        // Convert to millions (e.g., 1300000 → 1.3 Million)
        return (pixels / 1000000).toFixed(1) + " Million pixels";
    } else if (pixels >= 1000) {
        // Convert to thousands (e.g., 650000 → 650K)
        return (pixels / 1000).toFixed(0) + "K pixels";
    } else {
        return pixels.toLocaleString() + " pixels";
    }
}

// =================  PowerConsumption Data =================
const powerConsumptionData = {
    indoor: {
        "P1.25": { max: 586, avg: 195 },
        "P1.538": { max: 488, avg: 163 },
        "P1.839": { max: 488, avg: 163 },
        "P2": { max: 488, avg: 163 },
        "P2.5": { max: 488, avg: 163 },
        "P2.6": { max: 675, avg: 202 },
        "P2.9": { max: 480, avg: 144 },
        "P3": { max: 543, avg: 180 },
        "P3.076": { max: 488, avg: 163 },
        "P3.91": { max: 500, avg: 150 },
        "P4": { max: 488, avg: 163 }
    },

    outdoor: {
        "P2.5": { max: 879, avg: 264 },
        "P2.60": { max: 675, avg: 202 },
        "P3.076": { max: 879, avg: 264 },
        "P3.910": { max: 630, avg: 189 },
        "P4.810": { max: 540, avg: 162 },
        "P4": { max: 879, avg: 264 },
        "P5": { max: 879, avg: 264 },
        "P6": { max: 895, avg: 269 },
        "P6.66": { max: 879, avg: 264 },
        "P8": { max: 879, avg: 264 },
        "P10": { max: 645, avg: 195 }
    }
};

// ================= MEDIA PLAYER DATA (UPDATED - ONLY VX 1.3 & VX1000 Pro) =================
const mediaPlayerData = [
    // TB Series (Cloud Based) - Only TB2, TB40, TB60
    {
        model: "TB2 (Cloud)",
        series: "TB",
        maxPixels: 650000,
        maxWidth: 1920,
        maxHeight: 1080,
        videoDecoding: "1080P",
        cloudBased: true
    },
    // VX Series (Non-Cloud Based) - ONLY VX 1.3 & VX1000 Pro
    {
        model: "VX 1.3 (Non-Cloud)",
        series: "VX",
        maxPixels: 1300000,
        maxWidth: 3840,
        maxHeight: 1920,
        videoDecoding: "HD",
        cloudBased: false
    },
    {
        model: "TB40 (Cloud)",
        series: "TB",
        maxPixels: 1300000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K",
        cloudBased: true
    },
    {
        model: "TB60 (Cloud)",
        series: "TB",
        maxPixels: 2300000,
        maxWidth: 4096,
        maxHeight: 4096,
        videoDecoding: "4K",
        cloudBased: true
    },
    // DSP Series (Non-Cloud Based)
    {
        model: "DSP400 Pro (Non-Cloud)",
        series: "DSP",
        maxPixels: 2600000,
        maxWidth: 10240,
        maxHeight: 8192,
        videoDecoding: "4K",
        cloudBased: false
    },
    // SMP Pro Series
    {
        model: "SMP 4 Pro",
        series: "SMP",
        maxPixels: 2600000,
        maxWidth: 4096,
        maxHeight: 1920,
        videoDecoding: "4K",
        cloudBased: false
    },
    {
        model: "DSP600 Pro (Non-Cloud)",
        series: "DSP",
        maxPixels: 3900000,
        maxWidth: 10240,
        maxHeight: 8192,
        videoDecoding: "4K",
        cloudBased: false
    },
    {
        model: "SMP 6 Pro",
        series: "SMP",
        maxPixels: 3900000,
        maxWidth: 4096,
        maxHeight: 1920,
        videoDecoding: "4K",
        cloudBased: false
    },
    {
        model: "VX1000 Pro (Non-Cloud)",
        series: "VX",
        maxPixels: 6500000,
        maxWidth: 10240,
        maxHeight: 8192,
        videoDecoding: "4K",
        cloudBased: false
    },
    // TB Series Higher (Cloud Based)
    {
        model: "MCTRL4K (Cloud)",
        series: "TB",
        maxPixels: 8800000,
        maxWidth: 8192,
        maxHeight: 8192,
        videoDecoding: "4K UHD, 8K×1K@60Hz",
        cloudBased: true
    },
    {
        model: "NovaPro UHD (Cloud)",
        series: "TB",
        maxPixels: 10400000,
        maxWidth: 8192,
        maxHeight: 8192,
        videoDecoding: "Up to 8K×1K@60Hz",
        cloudBased: true
    }
];

// ================= PIXEL PITCH DATA =================
const pixelPitchData = {

    indoor: {
        "P1.25": { module: "320x160", res: [256, 128] },
        "P1.538": { module: "320x160", res: [208, 104] },
        "P1.839": { module: "320x160", res: [174, 87] },
        "P2": { module: "320x160", res: [160, 80] },
        "P2.5": { module: "320x160", res: [128, 64] },
        "P2.6": { module: "250x250", res: [96, 96] },
        "P2.9": { module: "250x250", res: [64, 64] },
        "P3": { module: "192x192", res: [64, 64] },
        "P3.076": { module: "320x160", res: [104, 52] },
        "P3.91": { module: "250x250", res: [64, 64] },
        "P4": { module: "320x160", res: [80, 40] }
    },
    outdoor: {
        "P2.5": { module: "320x160", res: [128, 64] },
        "P2.60": { module: "250x250", res: [96, 96] },
        "P3": { module: "192x192", res: [64, 64] },
        "P3.076": { module: "320x160", res: [104, 52] },
        "P3.910": { module: "250x250", res: [64, 64] },
        "P4": { module: "320x160", res: [80, 40] },
        "P4.810": { module: "250x250", res: [52, 52] },
        "P5": { module: "320x160", res: [64, 32] },
        "P6": { module: "192x192", res: [32, 32] },
        "P6.66": { module: "320x160", res: [48, 24] },
        "P8": { module: "320x160", res: [40, 20] },
        "P10": { module: "320x160", res: [32, 16] }
    }
};

let selectedModuleResolution = { w: 0, h: 0 };

// ================= MEDIA PLAYER RECOMMENDATION (RETURNS ALL WITH SAME SMALLEST CAPACITY) =================
function recommendMediaPlayers(totalPixels, resWidth, resHeight) {
    // Find the first (smallest) player that can handle the screen
    let firstMatch = null;

    for (let i = 0; i < mediaPlayerData.length; i++) {
        const player = mediaPlayerData[i];

        if (totalPixels <= player.maxPixels &&
            resWidth <= player.maxWidth &&
            resHeight <= player.maxHeight) {
            firstMatch = player;
            break; // Found the smallest capacity that works
        }
    }

    // If no match found, return the highest spec player
    if (!firstMatch) {
        return [mediaPlayerData[mediaPlayerData.length - 1]];
    }

    // Now find ALL players with the SAME capacity as the first match
    const matchingPlayers = [];
    const targetCapacity = firstMatch.maxPixels;

    for (let i = 0; i < mediaPlayerData.length; i++) {
        const player = mediaPlayerData[i];

        // Same capacity AND can handle the dimensions
        if (player.maxPixels === targetCapacity &&
            totalPixels <= player.maxPixels &&
            resWidth <= player.maxWidth &&
            resHeight <= player.maxHeight) {
            matchingPlayers.push(player);
        }
    }

    return matchingPlayers;
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

    if (!modStr) {
        alert("Please fill all required fields!");
        return;
    }

    if (!pixelPitch) {
        alert("Please select Pixel Pitch!");
        return;
    }

    // Handle cabinet size - either selected or custom
    let cab = { w: 0, h: 0 };
    let isCustomCabinet = false;

    if (cabStr === "custom") {
        // Use custom cabinet dimensions
        const customW = Number(document.getElementById("customCabinetW").value);
        const customH = Number(document.getElementById("customCabinetH").value);

        if (!customW || !customH || customW <= 0 || customH <= 0) {
            alert("Please enter valid custom cabinet dimensions!");
            return;
        }

        cab = { w: customW, h: customH };
        isCustomCabinet = true;
    } else if (cabStr) {
        // Use selected cabinet
        cab = parseDimensionString(cabStr);
        isCustomCabinet = false;
    } else {
        // No cabinet selected and not custom
        alert("Please select a cabinet size or choose 'Custom Cabinet Size'!");
        return;
    }

    const mod = parseDimensionString(modStr);

    let modW, modH, actualW, actualH;

    if (isCustomCabinet) {
        // For custom cabinet: calculate modules that fit in the cabinet
        modW = Math.floor(cab.w / mod.w);
        modH = Math.floor(cab.h / mod.h);
        actualW = modW * mod.w;
        actualH = modH * mod.h;
    } else {
        // For standard cabinet: use target screen size
        if (!screenW || !screenH) {
            alert("Please enter target screen size!");
            return;
        }
        modW = Math.ceil(screenW / mod.w);
        modH = Math.ceil(screenH / mod.h);
        actualW = modW * mod.w;
        actualH = modH * mod.h;
    }

    const totalModules = modW * modH;

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

    // ================= MEDIA PLAYER RECOMMENDATION (ALL WITH SAME CAPACITY) =================
    const recommendedPlayers = recommendMediaPlayers(totalPixels, totalResW, totalResH);

    // ================= OUTPUT =================
    document.getElementById("resTotalModules").innerText = totalModules;
    document.getElementById("resModW").innerText = modW;
    document.getElementById("resModH").innerText = modH;

    // ================= SMPS CALCULATION =================
    const smpsData = calculateSMPS(totalModules, installType);
    document.getElementById("resSMPSUnits").innerText = smpsData.units;
    document.getElementById("resSMPSConfig").innerText = smpsData.config;

    document.getElementById("resCabW").innerText = cabW;
    document.getElementById("resCabH").innerText = cabH;
    document.getElementById("resTotalCabinets").innerText = totalCab;

    // Show/hide actual size based on cabinet type
    const actualSizeRow = document.getElementById("actualSizeRow");
    if (isCustomCabinet) {
        // Hide actual size for custom cabinets
        actualSizeRow.style.display = "none";
    } else {
        // Show actual size for standard cabinets
        actualSizeRow.style.display = "block";
        document.getElementById("resActualSize").innerText =
            `${actualW}mm x ${actualH}mm`;
    }

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

    // ================= MEDIA PLAYER OUTPUT (SHOW ALL WITH SAME CAPACITY) =================
    if (recommendedPlayers.length === 1) {
        const player = recommendedPlayers[0];
        document.getElementById("resMediaModel").innerText = player.model;
        document.getElementById("resMediaPixels").innerText = formatPixels(player.maxPixels);
        document.getElementById("resMediaWidth").innerText =
            player.maxWidth.toLocaleString() + " px";
        document.getElementById("resMediaHeight").innerText =
            player.maxHeight.toLocaleString() + " px";
        document.getElementById("resMediaDecoding").innerText =
            player.videoDecoding;
    } else {
        // Multiple players with same capacity - show with OR
        let modelsText = "";
        let pixelsText = "";
        let widthText = "";
        let heightText = "";
        let decodingText = "";

        recommendedPlayers.forEach((player, index) => {
            const separator = index < recommendedPlayers.length - 1 ? " OR " : "";
            modelsText += player.model + separator;
            pixelsText += formatPixels(player.maxPixels) + separator;
            widthText += player.maxWidth.toLocaleString() + " px" + separator;
            heightText += player.maxHeight.toLocaleString() + " px" + separator;
            decodingText += player.videoDecoding + separator;
        });

        document.getElementById("resMediaModel").innerText = modelsText;
        document.getElementById("resMediaPixels").innerText = pixelsText;
        document.getElementById("resMediaWidth").innerText = widthText;
        document.getElementById("resMediaHeight").innerText = heightText;
        document.getElementById("resMediaDecoding").innerText = decodingText;
    }

    document.getElementById("mainResults").classList.add("active");

    document.getElementById("checkModW").value = modW;
    document.getElementById("checkModH").value = modH;
}

// ================= CABINET MAPPING FOR OUTDOOR =================
const outdoorCabinetsByModule = {
    "320x160": ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"],
    "192x192": ["960x960", "1152x1152", "960x1152", "1152x960"]
};

// Cabinet mapping by specific pixel pitch and module combination
const specificCabinetsByPitch = {
    "P6": {
        "192x192": ["960x960", "1152x1152", "960x1152", "1152x960"]
    }
};

// ================= STORE ALL CABINET OPTIONS =================
const allCabinetOptions = [
    { value: "", text: "Select Cabinet Size", group: "placeholder" },
    { value: "960x1280", text: "960mm x 1280mm (Outdoor 320x160)", group: "outdoor320" },
    { value: "1280x1280", text: "1280mm x 1280mm (Outdoor 320x160)", group: "outdoor320" },
    { value: "1280x960", text: "1280mm x 960mm (Outdoor 320x160)", group: "outdoor320" },
    { value: "640x960", text: "640mm x 960mm (Outdoor 320x160)", group: "outdoor320" },
    { value: "640x1280", text: "640mm x 1280mm (Outdoor 320x160)", group: "outdoor320" },
    { value: "960x960", text: "960mm x 960mm (Outdoor & Indoor)", group: "outdoor192" },
    { value: "1152x1152", text: "1152mm x 1152mm (Outdoor 192x192)", group: "outdoor192" },
    { value: "960x1152", text: "960mm x 1152mm (Outdoor 192x192)", group: "outdoor192" },
    { value: "1152x960", text: "1152mm x 960mm (Outdoor 192x192)", group: "outdoor192" },
    { value: "500x500", text: "500mm x 500mm (Die cast aluminium)", group: "cob", dataCob: "yes" },
    { value: "640x480", text: "640mm x 480mm (Die cast aluminium)", group: "cob", dataCob: "yes" },
    { value: "640x640", text: "640mm x 640mm (Die cast aluminium)", group: "cob", dataCob: "yes" },
    { value: "576x576", text: "576mm x 576mm (Die cast aluminium)", group: "cob", dataCob: "yes" },
    { value: "600x337.5", text: "600mm x 337.5mm (Die cast aluminium)", group: "cob", dataCob: "yes" },
    { value: "500x1000", text: "500mm x 1000mm (Indoor)", group: "indoor" }
];

// ================= Cabinets size =================
function updateCabinetOptions() {
    const installType = document.getElementById("installType")?.value;
    const indoorType = document.getElementById("indoorType")?.value;
    const moduleSize = document.getElementById("moduleSize")?.value || "";
    const pixelPitch = document.getElementById("pixelPitch")?.value || "";
    const cabinetSelect = document.getElementById("cabinetSize");

    if (!cabinetSelect) return;

    let allowedOptions = [];

    if (installType === "indoor" && indoorType === "COB") {
        // For indoor COB, show COB-compatible cabinets + 960x960 (common) + placeholder
        allowedOptions = allCabinetOptions.filter(opt =>
            opt.group === "placeholder" || opt.group === "cob" || opt.value === "960x960"
        );
    } else if (installType === "indoor" && indoorType === "SMD") {
        // For indoor SMD, show COB + indoor + 960x960 (common) + placeholder
        allowedOptions = allCabinetOptions.filter(opt =>
            opt.group === "placeholder" || opt.group === "cob" || opt.group === "indoor" || opt.value === "960x960"
        );
    } else if (installType === "outdoor") {
        // For outdoor, determine which cabinets to show
        allowedOptions = [allCabinetOptions[0]]; // Always add placeholder

        let allowedCabinets = [];

        // Check if there's a specific combination (e.g., P6 + 192x192)
        if (specificCabinetsByPitch[pixelPitch] && specificCabinetsByPitch[pixelPitch][moduleSize]) {
            allowedCabinets = specificCabinetsByPitch[pixelPitch][moduleSize];
        } else if (outdoorCabinetsByModule[moduleSize]) {
            // Otherwise use general module-based mapping
            allowedCabinets = outdoorCabinetsByModule[moduleSize];
        }

        // Add matching cabinets to allowed options
        allCabinetOptions.forEach(opt => {
            if (allowedCabinets.includes(opt.value) || opt.value === "960x960") {
                if (opt.value !== "") { // Don't add placeholder twice
                    allowedOptions.push(opt);
                }
            }
        });
    } else {
        // Default: show placeholder only
        allowedOptions = [allCabinetOptions[0]];
    }

    // Always add custom option at the end
    allowedOptions.push({ value: "custom", text: "⚙️ Custom Cabinet Size", group: "custom" });

    // Rebuild the select dropdown with only allowed options
    cabinetSelect.innerHTML = "";
    allowedOptions.forEach(opt => {
        const optElement = document.createElement("option");
        optElement.value = opt.value;
        optElement.textContent = opt.text;
        if (opt.dataCob) {
            optElement.dataset.cob = opt.dataCob;
        }
        cabinetSelect.appendChild(optElement);
    });

    // Clear selection if no valid option is selected
    if (cabinetSelect.selectedOptions.length === 0 || cabinetSelect.value === "") {
        cabinetSelect.value = "";
    }
}

// ================= SMPS CALCULATION FUNCTION =================
function calculateSMPS(totalModules, ledType) {
    // SMPS 60A configuration:
    // Indoor: 8 modules per SMPS
    // Outdoor: 6 modules per SMPS

    const modulesPerSMPS = ledType === "indoor" ? 8 : 6;
    const smpsUnits = Math.ceil(totalModules / modulesPerSMPS);

    return {
        units: smpsUnits,
        modulesPerUnit: modulesPerSMPS,
        config: `${modulesPerSMPS} modules per SMPS (${ledType === "indoor" ? "Indoor" : "Outdoor"})`
    };
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
    document.getElementById("moduleSize").addEventListener("change", updateCabinetOptions);
    document.getElementById("pixelPitch").addEventListener("change", updateCabinetOptions);

    // Custom cabinet size toggle
    document.getElementById("cabinetSize").addEventListener("change", function () {
        const customWrapper = document.getElementById("customCabinetWrapper");
        const screenSizeNote = document.getElementById("screenSizeNote");
        const targetScreenLabel = document.getElementById("targetScreenLabel");

        if (this.value === "custom") {
            customWrapper.style.display = "block";
            screenSizeNote.style.display = "block";
            targetScreenLabel.style.opacity = "0.6";
        } else {
            customWrapper.style.display = "none";
            screenSizeNote.style.display = "none";
            targetScreenLabel.style.opacity = "1";
        }
    });
}, 0);
