jsonData = {
    "headers": [{
            "id": "dx",
            "name": "Data"
        },
        {
            "id": "ou",
            "name": "Place"
        },
        {
            "id": "value",
            "name": "Value"
        }
    ],
    "metaData": {
        "names": {
            "hTUspcBc4Yn": "HIV Prevalence",
            "EzE8xZ31zfC": "Malaria Prevalence",
            "E31SemmmFGb": "TB Prevalence",
            "dx": "Data",
            "ou": "Place",
            "R7TPl8q81Ft": "Insect District",
            "xGojHNSrFAj": "Bird District"
        },
        "dimensions": {
            "dx": ["EzE8xZ31zfC", "hTUspcBc4Yn", "E31SemmmFGb"],
            "ou": ["R7TPl8q81Ft", "xGojHNSrFAj"]
        }
    },
    "rows": [
        ["EzE8xZ31zfC", "R7TPl8q81Ft", "47.0"],
        ["hTUspcBc4Yn", "R7TPl8q81Ft", "50.6"],
        ["EzE8xZ31zfC", "xGojHNSrFAj", "40.0"],
        ["E31SemmmFGb", "xGojHNSrFAj", "74.8"],
        ["hTUspcBc4Yn", "xGojHNSrFAj", "77.0"],
        ["E31SemmmFGb", "R7TPl8q81Ft", "47.0"]
    ]
}

// Function to lookup an array element and returns an array 
function arrayLookup(searchValue, array, searchIndex, returnIndex, searchPlace, compareInd) {
    let returnVal = [];
    let ind;
    for (ind = 0; ind < array.length; ind++) {
        if (array[ind][searchIndex] == searchValue) {
            if (array[ind][compareInd] == searchPlace)
                returnVal.push(array[ind][returnIndex]);
        }
    }
    return returnVal;
}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

function deconstructJson({
    headers: [{
        id: dataId
    }, {
        id: placesId
    }, {
        id: valueId
    }],
    metaData: {
        names: dataNames,
        dimensions: dataDimensions
    },
    rows
}, tableType) {
    
    // Code for the first table
    if (tableType == 1) {
        // constructing the table header
        let tableHeader = ['Place vs Data']

        // add all places
        for (placeIdValue of dataDimensions[placesId]) {
            // get the place name using the ID in the dimensions 
            tableHeader.push(dataNames[placeIdValue])
        }

        // get the table data 
        let tableData = []

        // map all data
        for (dataIdValue of dataDimensions[dataId]) {
            tableData.push([dataNames[dataIdValue]])
        }

        for (data of tableData) {
            // add the place details
            dataKey = getKeyByValue(dataNames, data[0])
            
            for (placeIdValue of dataDimensions[placesId]) {
                arr = arrayLookup(placeIdValue, rows, 1, 2, dataKey, 0)
                data.push(arr)
            }
        }
        

        // Constructing the table rows 
        return [tableHeader, tableData]
    }
    

    // Code for the second table
    if (tableType == 2) {
        // constructing the table header
        let tableHeader = ['Data vs Places']

        // add all data 
        for (dataIdValue of dataDimensions[dataId]) {
            // get the place name using the ID in the dimensions 
            tableHeader.push(dataNames[dataIdValue])
    
        }
        

        // get the table data 
        let tableData = []

        // map all data
        
        
        for (placeIdValue of dataDimensions[placesId]) {
            tableData.push([dataNames[placeIdValue]])
        }


        for (place of tableData) {
            // add the place details
            dataKey = getKeyByValue(dataNames, place[0])
            for (dataIdValue of dataDimensions[dataId]) {
                arr = arrayLookup(dataIdValue, rows, 0, 2, dataKey, 1)
                place.push(arr)
            }
            console.log(dataKey)
        }
        // console.log(tableData)
        // console.log(tableData)
        return [tableHeader, tableData]

    }

}

const [tableHeader, tableData]= deconstructJson(jsonData, 1)



function createTable(jsonDataValue, tableType) {
    let table = null
    if (tableType == 1) {
        table = document.getElementById('table1')}
     else {
        table = document.getElementById('table2')  
    }
    let tableHead = document.createElement('thead')
    let tableBody = document.createElement('thead')

    const [tableHeader, tableData]= deconstructJson(jsonDataValue, tableType)
    
    // populate the header 
    for (let ind = 0; ind < tableHeader.length; ind++){
        let th = document.createElement('th')
        th.textContent = tableHeader[ind] 
        tableHead.appendChild(th)       
    }

    // populate the columns
    for (row of tableData){
        let tr = document.createElement('tr')

        // creating the first column
        let td = document.createElement('td')
        td.textContent = row[0]
        tr.appendChild(td)


        // adding the data
        for (let ind = 1; ind <= row.length; ind++){
            let td = document.createElement('td')
            td.textContent = row[ind]
            tr.appendChild(td)
        }
        tableBody.appendChild(tr)
        
    }
    
    table.appendChild(tableHead)
    table.appendChild(tableBody)
    

    return table
    
}

function createTables(jsonFile){
    createTable(jsonFile,1)
    createTable(jsonFile,2)
}

createTables(jsonData)
