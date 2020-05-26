export function readCsvFile(file, callback) {
    const reader = new FileReader();
    reader.onload = function () {
        callback(csvFromText(reader.result))
    }
    reader.readAsText(file);
}

function csvFromText(text, delimiter=',') {
    const separatorPattern = '(\\' + delimiter + '|\\r?\\n|\\r|^)';
    const quotedFieldPattern = '(?:"([^"]*(?:""[^"]*)*)"|';
    const unquotedFieldPattern = '([^"\\' + delimiter + '\\r\\n]*))'

    const nextFieldPattern = new RegExp(
        (separatorPattern + quotedFieldPattern + unquotedFieldPattern), 'gi')

    const result = [[]]
    let newRow = true
    let nextFieldMatch

    if (new RegExp('^\\w*' + delimiter).exec(text)) {
        result[0].push('')
    }

    while (nextFieldMatch = nextFieldPattern.exec(text)) {
        let [_, fieldSeparator, quotedField, unquotedField] = nextFieldMatch
        newRow = fieldSeparator !== delimiter

        if (newRow) {
            result.push([])
            if (fieldSeparator === delimiter) {
                result[result.length - 1].push('')
            }
        }

        const rowNumber = result.length - 1
        result[rowNumber].push(quotedField || unquotedField)
    }

    return result;
}