let withHTML = true

if (withHTML) {
    window.onload = function () {
	let form = document.forms['input_value_to_convert_form']
	form.onsubmit = function(event) {
	    event.preventDefault()
	    updateOutputTable(form)
	}
    }
}

let meterToTargetUnitTable = {
    'meter' : 1,
    'foot'  : 3.2808,
    'yard'  : 1.0936,
    'inch'  : 39.3701,
    'millimeter' : 1000
}

function confirmInputsAreValid(distanceScalarInput, distanceUnitInput) {
    // e.g. confirm distanceScalarInput is number
    // possibly alert
}

let targetUnitTypes = [
    'meter',
    'foot',
    'yard',
    'inch',
    'millimeter'
]

// could compute this by concatenating unit to 'output_table_cell_'
let unitToIDForCellInUnitTable = {
    'meter' : 'output_table_cell_meter',
    'foot'  : 'output_table_cell_foot',
    'yard'  : 'output_table_cell_yard',
    'inch'  : 'output_table_cell_inch',
    'millimeter'  : 'output_table_cell_millimeter',
}

function getIDForCellInUnitTable(unitType) {
    return unitToIDForCellInUnitTable[unitType]
}

function getSourceUnitToMeterFactor(sourceUnit) {
    let meterToTargetUnitFactor = getMeterToTargetUnitFactor(sourceUnit)
    let sourceUnitToMeterFactor = (1 / meterToTargetUnitFactor)
    return sourceUnitToMeterFactor    
}

function getMeterToTargetUnitFactor(targetUnitType) {
    let meterToTargetUnitFactor = meterToTargetUnitTable[targetUnitType]
    return meterToTargetUnitFactor
}

function convertUnitToUnit(sourceUnit, targetUnitType, valueToConvert) {
    let sourceUnitToMeterFactor = getSourceUnitToMeterFactor(sourceUnit)
    let meterToTargetUnitFactor = getMeterToTargetUnitFactor(targetUnitType)
    let valueConvertedToTargetUnit = valueToConvert * sourceUnitToMeterFactor * meterToTargetUnitFactor
    return valueConvertedToTargetUnit
}

function updateOutputTable(inputValueForm) {
    let distanceScalarInput
    let distanceUnitInput
    if (withHTML) {
	distanceScalarInput = inputValueForm["input_value_to_convert"]
	distanceScalarInputValue = distanceScalarInput.value
	distanceUnitInput = inputValueForm["input_unit"]
	distanceUnitInputValue = distanceUnitInput.value
	confirmInputsAreValid(distanceScalarInput, distanceUnitInput)
    } else {
	distanceScalarInput = 1
	distanceUnitInput = 'meter'
    }
    let sourceUnit = distanceUnitInputValue
    let distanceScalarInputAsFloat = parseFloat(distanceScalarInputValue)
    console.log(distanceScalarInputAsFloat)
    let valueToConvert = distanceScalarInputAsFloat
    for (let targetUnitType of targetUnitTypes) {
	let valueConvertedToTargetUnitType = convertUnitToUnit(sourceUnit, targetUnitType, valueToConvert)
	if (withHTML) {
	    let idForCellInUnitTable = getIDForCellInUnitTable(targetUnitType)
	    let cellInUnitTable = document.getElementById(idForCellInUnitTable)
	    cellInUnitTable.innerHTML = valueConvertedToTargetUnitType
	}
    }
}

if (!withHTML) {
    updateOutputTable()
}
