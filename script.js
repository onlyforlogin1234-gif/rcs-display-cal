// Helper function to parse "100x200" string into {w: 100, h: 200} object
function parseDimensionString(dimStr) {
    const parts = dimStr.split('x');
    return {
        w: parseInt(parts[0]),
        h: parseInt(parts[1])
    };
}

// Function for the main calculation (Screen Size -> Components)
function calculateMain() {
    // 1. Get Inputs
    const cabStr = document.getElementById('cabinetSize').value;
    const modStr = document.getElementById('moduleSize').value;
    
    // Using Number() and || 0 to safely get input values
    const targetW = Number(document.getElementById('screenW').value) || 0; 
    const targetH = Number(document.getElementById('screenH').value) || 0;

    // Basic Validation: Check if numbers were entered
    if (targetW <= 0 || targetH <= 0) {
        alert("Please enter valid target screen Width and Height in mm.");
        return;
    }

    // 2. Parse Dimensions
    const cabDim = parseDimensionString(cabStr);
    const modDim = parseDimensionString(modStr);

    // 3. Calculate Modules needed (Ceiling to ensure coverage)
    const modsWide = Math.ceil(targetW / modDim.w);
    const modsHigh = Math.ceil(targetH / modDim.h);
    const totalModules = modsWide * modsHigh;

    // 4. Calculate Actual Screen Size based on whole modules
    const actualW = modsWide * modDim.w;
    const actualH = modsHigh * modDim.h;

    // 5. Component Calculations (Estimations)
    const estimatedSMPS = Math.ceil(totalModules / 6);

    const cabsWide = Math.ceil(actualW / cabDim.w);
    const cabsHigh = Math.ceil(actualH / cabDim.h);
    const totalCabinets = cabsWide * cabsHigh;
    const estimatedRC = totalCabinets; 


    // 6. Output Results
    document.getElementById('resTotalModules').innerText = totalModules;
    document.getElementById('resModW').innerText = modsWide;
    document.getElementById('resModH').innerText = modsHigh;
    document.getElementById('resSmps').innerText = estimatedSMPS;
    document.getElementById('resRc').innerText = estimatedRC;
    document.getElementById('resActualSize').innerText = `${actualW}mm W x ${actualH}mm H`;

    // Show results box
    document.getElementById('mainResults').classList.add('active');

    // Pre-fill the verification boxes for convenience
    document.getElementById('checkModW').value = modsWide;
    document.getElementById('checkModH').value = modsHigh;
}


// Function for the double-check (Modules -> Screen Size)
function verifySize() {
    // 1. Get Inputs based on currently selected module size dropdown
    const modStr = document.getElementById('moduleSize').value;
    const modDim = parseDimensionString(modStr);

    const inputModW = Number(document.getElementById('checkModW').value) || 0;
    const inputModH = Number(document.getElementById('checkModH').value) || 0;

     // Basic Validation: Check if numbers were entered
     if (inputModW <= 0 || inputModH <= 0) {
        alert("Please enter valid module counts.");
        return;
    }

    // 2. Calculate Screen Size
    const calcW = inputModW * modDim.w;
    const calcH = inputModH * modDim.h;

    // 3. Output Results
    document.getElementById('verModUsed').innerText = modStr;
    document.getElementById('verScreenSize').innerText = `${calcW}mm W x ${calcH}mm H`;

    // Show results box
    document.getElementById('verifyResults').classList.add('active');
}


// ==========================================================
// *** NEW CODE: Linking Buttons via ID (The Event Listener) ***
// ==========================================================

// This part waits until the entire HTML page is loaded before trying to find the buttons.
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Find the "Calculate Components" button using its ID
    const calculateButton = document.getElementById('calculateBtn');
    if (calculateButton) {
        // 2. Tell the button to run the calculateMain function when clicked
        calculateButton.addEventListener('click', calculateMain);
    }

    // 3. Find the "Verify Screen Size" button using its ID
    const verifyButton = document.getElementById('verifyBtn');
    if (verifyButton) {
        // 4. Tell the button to run the verifySize function when clicked
        verifyButton.addEventListener('click', verifySize);
    }
});