module.exports = {
    name: "Transform Value",

    description: "Transforms a value into a number, text, uppercase, lowercase or capitalize.",

    category: "Extras",

    inputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Acceptable Types: Action\n\nDescription: Executes this block.",
            "types": ["action"]
        },
        {
            "id": "value",
            "name": "Value",
            "description": "Acceptable Types: Unspecified, Number, Text\n\nDescription: The value to transform.",
            "types": ["unspecified", "number", "text"],
            "required": true
        }
    ],

    options: [
        {
            "id": "transformation_type",
            "name": "Transformation Type",
            "description": "Description: The type of transformation for the value.",
            "type": "SELECT",
            "options": {
                "number1": "Number (Integer)",
                "number2": "Number (Decimal)",
                "number3": "Number (Remove Decimals)",
                "number4": "Number (Round)",
                "number5": "Number (Remove Numbers)",
                "number6": "Number (Remove Letters)",
                "number7": "Number (Add punctuation)",
                "text": "Text",
                "uppercase": "Uppercase",
                "lowercase": "Lowercase",
                "capitalize1": "Capitalize (First Word Per Sentence)",
                "capitalize2": "Capitalize (All Words)",
            }
        }
    ],

    outputs: [
        {
            "id": "action",
            "name": "Action",
            "description": "Type: Action\n\nDescription: Executes the following blocks when this block finishes its task.",
            "types": ["action"]
        },
        {
            "id": "result",
            "name": "Result",
            "description": "Type: Unspecified\n\nDescription: The value transformed.",
            "types": ["unspecified"]
        }
    ],

    code(cache) {
        const value = this.GetInputValue("value", cache);
        const transformation_type = this.GetOptionValue("transformation_type", cache);

        let res = value;
        switch(transformation_type) {
            case "number1":
                res = ("" + value).match(/\d+/)[0];
                break;
            case "number2":
                res = parseFloat(value);
                break;
            case "number3":
                res = Math.floor(value);
                break;
            case "number4":
                res = Math.round(value);
                break;
            case "number5":
                res = value.replace(/[0-9]/g, '');
                break;
            case "number6":
                res = value.replace(/\D/g, '')
                break;
            case "number7":
                res = Number(value.replace(/\D/g, '')).toLocaleString()
                break;
            case "text":
                res = "" + value;
                break;
            case "uppercase":
                res = ("" + value).toUpperCase();
                break;
            case "lowercase":
                res = ("" + value).toLowerCase();
                break;
            case "capitalize1":
                res = ("" + value).replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
                break;
            case "capitalize2":
                res = ("" + value).replace(/(^[\s]*|[.?!] *|\n\s+)\S/g, match => match.toUpperCase());
                break;
        }

        this.StoreOutputValue(res, "result", cache);
        this.RunNextBlock("action", cache);
    }
}