// ==================== Display Configuration Logic ====================

// Product specifications from your system
const displayProductSpecs = {
    indoor: {
        "P1.25": { module: "320x160", cabinet: ["960x960"], res: [256, 128] },
        "P1.538": { module: "320x160", cabinet: ["960x960"], res: [208, 104] },
        "P1.839": { module: "320x160", cabinet: ["960x960"], res: [174, 87] },
        "P2": { module: "320x160", cabinet: ["960x960"], res: [160, 80] },
        "P2.5": { module: "320x160", cabinet: ["960x960"], res: [128, 64] },
        "P2.6": { module: "250x250", cabinet: ["500x500", "640x480", "640x640", "576x576", "600x337.5"], res: [96, 96] },
        "P2.9": { module: "250x250", cabinet: ["500x500", "640x480", "640x640", "576x576", "600x337.5"], res: [64, 64] },
        "P3": { module: "192x192", cabinet: ["960x960"], res: [64, 64] },
        "P3.076": { module: "320x160", cabinet: ["960x960"], res: [104, 52] },
        "P3.91": { module: "250x250", cabinet: ["500x500", "640x480", "640x640", "576x576", "600x337.5"], res: [64, 64] },
        "P4": { module: "320x160", cabinet: ["960x960"], res: [80, 40] }
    },
    outdoor: {
        "P2.5": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [128, 64] },
        "P2.60": { module: "250x250", cabinet: ["960x960", "1152x1152", "960x1152", "1152x960"], res: [96, 96] },
        "P3": { module: "192x192", cabinet: ["960x960", "1152x1152", "960x1152", "1152x960"], res: [64, 64] },
        "P3.076": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [104, 52] },
        "P3.910": { module: "250x250", cabinet: ["960x960", "1152x1152", "960x1152", "1152x960"], res: [64, 64] },
        "P4": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [80, 40] },
        "P4.810": { module: "250x250", cabinet: ["960x960", "1152x1152", "960x1152", "1152x960"], res: [52, 52] },
        "P5": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [64, 32] },
        "P6": { module: "192x192", cabinet: ["960x960", "1152x1152", "960x1152", "1152x960"], res: [32, 32] },
        "P6.66": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [48, 24] },
        "P8": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [40, 20] },
        "P10": { module: "320x160", cabinet: ["960x1280", "1280x1280", "1280x960", "640x960", "640x1280"], res: [32, 16] }
    }
};

// Pixel pitch values mapping
const pixelPitchValues = {
    "P1.25": 1.25,
    "P1.538": 1.538,
    "P1.839": 1.839,
    "P2": 2,
    "P2.5": 2.5,
    "P2.6": 2.6,
    "P2.9": 2.9,
    "P3": 3,
    "P3.076": 3.076,
    "P3.91": 3.91,
    "P4": 4,
    "P4.810": 4.81,
    "P5": 5,
    "P6": 6,
    "P6.66": 6.66,
    "P8": 8,
    "P10": 10
};

// Initialize page navigation
document.addEventListener('DOMContentLoaded', function () {
    setupPageNavigation();
    setupDisplayConfiguration();
});

// Page Navigation Logic
function setupPageNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageContents = document.querySelectorAll('.page-content');

    navButtons.forEach(button => {
        button.addEventListener('click', function () {
            const pageId = this.getAttribute('data-page');

            // Remove active from all
            navButtons.forEach(btn => btn.classList.remove('active'));
            pageContents.forEach(page => page.classList.remove('active'));

            // Add active to clicked
            this.classList.add('active');
            document.getElementById(pageId).classList.add('active');
        });
    });
}

// Display Configuration Setup
function setupDisplayConfiguration() {
    const displayLedType = document.getElementById('displayLedType');
    const displayIndoorTypeWrapper = document.getElementById('displayIndoorTypeWrapper');
    const displayIndoorType = document.getElementById('displayIndoorType');
    const displayPixelPitch = document.getElementById('displayPixelPitch');
    const displayColumns = document.getElementById('displayColumns');
    const displayRows = document.getElementById('displayRows');
    const displayCabinetSize = document.getElementById('displayCabinetSize');

    // LED Type change
    displayLedType.addEventListener('change', function () {
        if (this.value === 'indoor') {
            displayIndoorTypeWrapper.style.display = 'block';
        } else {
            displayIndoorTypeWrapper.style.display = 'none';
        }
        updateDisplayPixelPitchOptions();
    });

    // Indoor Type change
    displayIndoorType.addEventListener('change', updateDisplayPixelPitchOptions);

    // Pixel pitch change
    displayPixelPitch.addEventListener('change', updateDisplayCabinetOptions);

    // Column/Row changes
    displayColumns.addEventListener('change', updateDisplayPreview);
    displayRows.addEventListener('change', updateDisplayPreview);

    // Cabinet size change
    displayCabinetSize.addEventListener('change', updateDisplayPreview);
}

function updateDisplayPixelPitchOptions() {
    const ledType = document.getElementById('displayLedType').value;
    const displayPixelPitch = document.getElementById('displayPixelPitch');

    displayPixelPitch.innerHTML = '<option value="">Select Pixel Pitch</option>';

    if (!ledType) return;

    const specs = displayProductSpecs[ledType];
    if (!specs) return;

    const pitches = Object.keys(specs).sort();
    pitches.forEach(pitch => {
        const option = document.createElement('option');
        option.value = pitch;
        option.textContent = pitch;
        displayPixelPitch.appendChild(option);
    });

    updateDisplayCabinetOptions();
}

function updateDisplayCabinetOptions() {
    const ledType = document.getElementById('displayLedType').value;
    const pixelPitch = document.getElementById('displayPixelPitch').value;
    const displayCabinetSize = document.getElementById('displayCabinetSize');

    displayCabinetSize.innerHTML = '<option value="">Select Cabinet Size</option>';

    if (!ledType || !pixelPitch) return;

    const specs = displayProductSpecs[ledType];
    if (!specs || !specs[pixelPitch]) return;

    const cabinets = specs[pixelPitch].cabinet;
    cabinets.forEach(cabinet => {
        const option = document.createElement('option');
        option.value = cabinet;
        option.textContent = cabinet + 'mm';
        displayCabinetSize.appendChild(option);
    });

    updateDisplayPreview();
}

function incrementDisplayColumns() {
    const input = document.getElementById('displayColumns');
    input.value = Math.min(parseInt(input.value) + 1, 20);
    updateDisplayPreview();
}

function decrementDisplayColumns() {
    const input = document.getElementById('displayColumns');
    input.value = Math.max(parseInt(input.value) - 1, 1);
    updateDisplayPreview();
}

function incrementDisplayRows() {
    const input = document.getElementById('displayRows');
    input.value = Math.min(parseInt(input.value) + 1, 20);
    updateDisplayPreview();
}

function decrementDisplayRows() {
    const input = document.getElementById('displayRows');
    input.value = Math.max(parseInt(input.value) - 1, 1);
    updateDisplayPreview();
}

function updateDisplayPreview() {
    const ledType = document.getElementById('displayLedType').value;
    const pixelPitch = document.getElementById('displayPixelPitch').value;
    const columns = parseInt(document.getElementById('displayColumns').value) || 1;
    const rows = parseInt(document.getElementById('displayRows').value) || 1;

    if (!ledType || !pixelPitch) {
        document.getElementById('displayGridPreview').innerHTML = '<p style="color:#fff; text-align:center; padding:20px; font-size:13px;">Select LED Type and Pixel Pitch</p>';
        return;
    }

    const specs = displayProductSpecs[ledType][pixelPitch];
    if (!specs) return;

    const moduleSize = specs.module.split('x').map(Number);
    const pixelPitchValue = pixelPitchValues[pixelPitch];

    // Calculate actual display dimensions
    const displayWidth = (columns * moduleSize[0]);
    const displayHeight = (rows * moduleSize[1]);

    // Calculate total modules
    const totalModules = columns * rows;

    // Update grid preview with module blocks - scaled to fit nicely
    const gridPreview = document.getElementById('displayGridPreview');
    gridPreview.innerHTML = '';
    gridPreview.style.display = 'grid';
    gridPreview.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    gridPreview.style.gap = '2px';
    gridPreview.style.padding = '15px';
    gridPreview.style.alignContent = 'center';
    gridPreview.style.justifyContent = 'center';

    // Calculate aspect ratio for scaling
    const aspectRatio = moduleSize[0] / moduleSize[1];

    for (let i = 0; i < totalModules; i++) {
        const moduleBlock = document.createElement('div');
        moduleBlock.className = 'module-block';

        // Use aspect-ratio to maintain proportions without exact sizes
        moduleBlock.style.cssText = `
            background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 2px;
            aspect-ratio: ${aspectRatio};
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: inset 0 1px 2px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.2);
            transition: all 0.2s ease;
            min-height: 30px;
            padding: 2px;
        `;

        // Add module size label
        const label = document.createElement('span');
        label.style.cssText = `
            font-size: 9px;
            color: rgba(255,255,255,0.7);
            font-weight: 600;
            text-align: center;
            line-height: 1.2;
        `;
        label.textContent = moduleSize[0] + 'x' + moduleSize[1];

        moduleBlock.appendChild(label);
        gridPreview.appendChild(moduleBlock);
    }

    // Update labels
    document.getElementById('displayWidthLabel').textContent = displayWidth + ' mm';
    document.getElementById('displayHeightLabel').textContent = displayHeight + ' mm';

    // Update specs
    document.getElementById('displayTotalModules').textContent = totalModules + ' (' + columns + ' × ' + rows + ')';
    document.getElementById('displayActualSize').textContent = displayWidth + ' × ' + displayHeight + ' mm';
    document.getElementById('displayModuleSize').textContent = moduleSize[0] + ' × ' + moduleSize[1] + ' mm';
    document.getElementById('displayPixelPitchValue').textContent = pixelPitch + ' (' + pixelPitchValue + ' mm)';
}

function generateDisplayConfiguration() {
    const ledType = document.getElementById('displayLedType').value;
    const indoorType = document.getElementById('displayIndoorType').value;
    const pixelPitch = document.getElementById('displayPixelPitch').value;
    const columns = document.getElementById('displayColumns').value;
    const rows = document.getElementById('displayRows').value;
    const cabinetSize = document.getElementById('displayCabinetSize').value;
    const powerRouting = document.getElementById('displayPowerRouting').value;
    const networkRouting = document.getElementById('displayNetworkRouting').value;
    const startingPoint = document.getElementById('displayStartingPoint').value;

    if (!ledType || !pixelPitch || !cabinetSize) {
        alert('Please select LED Type, Pixel Pitch, and Cabinet Size!');
        return;
    }

    const specs = displayProductSpecs[ledType][pixelPitch];
    const moduleSize = specs.module.split('x').map(Number);
    const displayWidth = columns * moduleSize[0];
    const displayHeight = rows * moduleSize[1];

    const config = {
        ledType: ledType,
        indoorType: ledType === 'indoor' ? indoorType : 'N/A',
        pixelPitch: pixelPitch,
        moduleSize: specs.module,
        cabinetSize: cabinetSize,
        layout: {
            columns: columns,
            rows: rows,
            totalModules: columns * rows
        },
        displayDimensions: {
            width: displayWidth,
            height: displayHeight,
            unit: 'mm'
        },
        cableRouting: {
            power: powerRouting,
            network: networkRouting
        },
        startingPoint: startingPoint
    };

    generatePowerDiagram(parseInt(columns), parseInt(rows));
}

function generatePowerDiagram(cols, rows) {
    const svg = document.getElementById("powerDiagram");
    if (!svg) return;

    // Clear previous drawing
    svg.innerHTML = '';

    // Get SVG dimensions
    const width = svg.clientWidth || 800; // default if hidden
    const height = 350;

    // Calculate module size to fit
    const padding = 20;
    const availW = width - (padding * 2);
    const availH = height - (padding * 2);

    const modW = availW / cols;
    const modH = availH / rows;

    // Determine size (keep square-ish or proportional, but don't stretch too much)
    // We'll use the smaller dimension to keep modules uniform
    const cellSize = Math.min(modW, modH, 60); // Max 60px size

    // Recalculate offsets to center the diagram
    const gridW = cellSize * cols;
    const gridH = cellSize * rows;
    const startX = (width - gridW) / 2;
    const startY = (height - gridH) / 2;

    // Routing preference (read from inputs)
    const routing = document.getElementById('displayPowerRouting').value;
    const isVertical = routing.includes("Vertical");

    // Create defs for arrow marker
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("markerWidth", "10");
    marker.setAttribute("markerHeight", "7");
    marker.setAttribute("refX", "9");
    marker.setAttribute("refY", "3.5");
    marker.setAttribute("orient", "auto");
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", "0 0, 10 3.5, 0 7");
    polygon.setAttribute("fill", "#00ffcc");
    marker.appendChild(polygon);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Draw Modules
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = startX + (c * cellSize);
            const y = startY + (r * cellSize);

            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            rect.setAttribute("x", x + 2);
            rect.setAttribute("y", y + 2);
            rect.setAttribute("width", cellSize - 4);
            rect.setAttribute("height", cellSize - 4);
            rect.setAttribute("fill", "none");
            rect.setAttribute("stroke", "#444");
            rect.setAttribute("stroke-width", "1");
            svg.appendChild(rect);
        }
    }

    // Draw Wiring Path (Snake Pattern)
    let pathD = "";

    // Simple Snake Path Logic based on Vertical/Horizontal priority
    // This is a simplified visual representation

    let prevX = -1, prevY = -1;

    if (isVertical) {
        // Vertical Snake: Down col 0, Up col 1, Down col 2...
        for (let c = 0; c < cols; c++) {
            if (c % 2 === 0) {
                // Down
                for (let r = 0; r < rows; r++) {
                    const cx = startX + (c * cellSize) + (cellSize / 2);
                    const cy = startY + (r * cellSize) + (cellSize / 2);
                    if (prevX === -1) {
                        pathD += `M ${cx} ${cy}`;
                    } else {
                        pathD += ` L ${cx} ${cy}`;
                    }
                    prevX = cx; prevY = cy;
                }
            } else {
                // Up
                for (let r = rows - 1; r >= 0; r--) {
                    const cx = startX + (c * cellSize) + (cellSize / 2);
                    const cy = startY + (r * cellSize) + (cellSize / 2);
                    pathD += ` L ${cx} ${cy}`;
                    prevX = cx; prevY = cy;
                }
            }
        }
    } else {
        // Horizontal Snake: Right row 0, Left row 1, Right row 2...
        for (let r = 0; r < rows; r++) {
            if (r % 2 === 0) {
                // Right
                for (let c = 0; c < cols; c++) {
                    const cx = startX + (c * cellSize) + (cellSize / 2);
                    const cy = startY + (r * cellSize) + (cellSize / 2);
                    if (prevX === -1) {
                        pathD += `M ${cx} ${cy}`;
                    } else {
                        pathD += ` L ${cx} ${cy}`;
                    }
                    prevX = cx; prevY = cy;
                }
            } else {
                // Left
                for (let c = cols - 1; c >= 0; c--) {
                    const cx = startX + (c * cellSize) + (cellSize / 2);
                    const cy = startY + (r * cellSize) + (cellSize / 2);
                    pathD += ` L ${cx} ${cy}`;
                    prevX = cx; prevY = cy;
                }
            }
        }
    }

    // Draw the path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathD);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "#00ffcc");
    path.setAttribute("stroke-width", "2");
    path.setAttribute("marker-end", "url(#arrowhead)");
    svg.appendChild(path);


    // Format output message
    const message = `
Display Configuration Generated Successfully!

Configuration Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LED Type: ${config.ledType.toUpperCase()}
${config.indoorType !== 'N/A' ? 'Indoor Type: ' + config.indoorType + '\n' : ''}Pixel Pitch: ${config.pixelPitch}
Module Size: ${config.moduleSize}mm
Cabinet Size: ${config.cabinetSize}mm

Layout Configuration:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Columns: ${config.layout.columns}
Rows: ${config.layout.rows}
Total Modules: ${config.layout.totalModules}

Display Dimensions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Width: ${config.displayDimensions.width}mm
Height: ${config.displayDimensions.height}mm

Cable Routing:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Power: ${config.cableRouting.power}
Network: ${config.cableRouting.network}

Starting Point: ${config.startingPoint}
    `;

    alert(message);
    console.log('Generated Configuration:', config);

    // You can save or export the configuration here
    // exportConfiguration(config);
}

// Optional: Export configuration to JSON
function exportConfiguration(config) {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'display-config-' + new Date().getTime() + '.json';
    link.click();
}
