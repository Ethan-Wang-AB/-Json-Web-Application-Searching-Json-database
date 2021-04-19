// This is our global variable that we used to store the JSON data 
// set that comes back from our AJAX call
var dataSet3 = [];

// Add an onload event to the web page to call a function when the page is finished loading
//window.addEventListener('load', InitializeWebPage3, false);

// This method will request the JSON file using a AJAX call
// and will add an event listener to the search box the user can type into
window.onload= InitializeWebPage3;
function InitializeWebPage3() {
    LoadJSONDataFile3();
    document.getElementById("community_name").addEventListener("keyup", function () { searchAll3(); }, false);
    document.getElementById("group_category").addEventListener("keyup", function () { searchAll3(); }, false);
    document.getElementById("category").addEventListener("keyup", function () { searchAll3(); }, false);
}

// Make the AJAX call and retrieve the JSON file called fileforxemployeeRecords.json
function LoadJSONDataFile3() {
    // Setup an AJAX request object
    var xhr = new XMLHttpRequest();

    // Setup the callback
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // r = xhr.JSONparse(responseText);
            debugger
            dataSet3 = JSON.parse(xhr.responseText);
        }
    };
    // Specify what to read in
    xhr.open("GET", "https://data.calgary.ca/resource/848s-4m4z.json", true);
    // Request it
    xhr.send();

}

// Display the information we received from the AJAX call as a grid like display in the web page


function searchAll3() {
    debugger
    var element = document.getElementById('community_name');
    var element1 = document.getElementById('group_category');
    var element2 = document.getElementById('category');
    var community_name=element.value
    var group_category=element1.value
    var category=element2.value
    if (community_name.length>0 && group_category.length==0 && category.length==0) {
        searchcommunity_name();
    }
    else if (group_category.length>0 && community_name.length==0 && category.length==0) {
        searchgroup_category();
    }
    else if (category.length>0 && community_name.length==0 && group_category.length==0) {
        searchcategory();
    }
    else if (community_name.length>0 && group_category.length>0 && category.length==0) {
        searchBothCG()
    }
    else if (community_name.length>0 && group_category.length==0 && category.length>0) {
        searchBothCC4();
    }
    else if (community_name.length==0 && group_category.length>0 && category.length>0) {
        searchBothGC();
    } else {
        group_category = group_category.toLowerCase();
        community_name = community_name.toLowerCase();
        category = category.toLowerCase();
        if (community_name && community_name.length > 0 && group_category && group_category.length > 0 && category && category.length > 0) {
            var htmlFragment = GridHeaderInfo3(false);
            var rowId = 0;
            for (let idx = 0; idx < dataSet3.length; idx++) {
                // Get one employee from the data set
                var record = dataSet3[idx];
                if (record) {
                    // See if the city in this employee matches, if it does output the row
                    if (record.community_name.toLowerCase().indexOf(community_name) > -1 && record.group_category.toLowerCase().indexOf(group_category) > -1 && record.category.toLowerCase().indexOf(category) > -1) {
                        // found another match
                        rowId++;
                        var match = outputdataRow3(record, rowId);
                        htmlFragment += match;
                    }
                }

            }

            if (rowId == 0) {
                // nothing found
                htmlFragment += "<span> No matches found </span>";
            }

            // Output the results to the screen
            var searchResults = document.getElementById('SearchResults3');
            if (searchResults && searchResults.innerHTML !== undefined) {
                searchResults.innerHTML = htmlFragment;
            }
        }
    }
}

    // This function will search for the city that the user has typed into the search box
    function searchcommunity_name() {
        debugger
        var element = document.getElementById('community_name');
        if (element && element.value !== undefined) {
            var community_name = element.value;
            community_name = community_name.toLowerCase();

            // Search for that value in our dataSet3 array of employees 
            if (community_name && community_name.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.community_name.toLowerCase().indexOf(community_name) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        }
    }
    function searchgroup_category() {
        var element = document.getElementById('group_category');
        if (element && element.value !== undefined) {
            var group_category = element.value;
            group_category = group_category.toLowerCase();

            // Search for that value in our dataSet3 array of employees 
            if (group_category && group_category.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.group_category.toLowerCase().indexOf(group_category) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        }
    }
    function searchcategory() {
        var element = document.getElementById('category');
        if (element && element.value !== undefined) {
            var category = element.value;
            category = category.toLowerCase();

            // Search for that value in our dataSet3 array of employees 
            if (category && category.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.category.toLowerCase().indexOf(category) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        }
    }
    function searchBothCC4() {
        var element = document.getElementById('category');
        var element1 = document.getElementById('community_name');
        if (element && element.value !== undefined) {
            var category = element.value;
            var community_name = element1.value;
            category = category.toLowerCase();
            community_name = community_name.toLowerCase();
            // Search for that value in our dataSet3 array of employees 
            if (category && category.length > 0 && community_name && community_name.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.category.toLowerCase().indexOf(category) > -1 && record.community_name.toLowerCase().indexOf(community_name) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        }
    }
    function searchBothCG() {
        debugger
        var element = document.getElementById('group_category');
        var element1 = document.getElementById('community_name');
    
            var group_category = element.value;
            var community_name = element1.value;
            group_category = group_category.toLowerCase();
            community_name = community_name.toLowerCase();
            // Search for that value in our dataSet3 array of employees 
            if (group_category && group_category.length > 0 && community_name && community_name.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.group_category.toLowerCase().indexOf(group_category) > -1 && record.community_name.toLowerCase().indexOf(community_name) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        
    }
    function searchBothGC() {
        var element = document.getElementById('group_category');
        var element1 = document.getElementById('category');
        if (element && element.value !== undefined) {
            var group_category = element.value;
            var category = element1.value;
            group_category = group_category.toLowerCase();
            category = category.toLowerCase();
            // Search for that value in our dataSet3 array of employees 
            if (group_category && group_category.length > 0 && category && category.length > 0) {
                var htmlFragment = GridHeaderInfo3(false);
                var rowId = 0;

                for (let idx = 0; idx < dataSet3.length; idx++) {
                    // Get one employee from the data set
                    var record = dataSet3[idx];
                    if (record) {
                        // See if the city in this employee matches, if it does output the row
                        if (record.group_category.toLowerCase().indexOf(group_category) > -1 && record.category.toLowerCase().indexOf(category) > -1) {
                            // found another match
                            rowId++;
                            var match = outputdataRow3(record, rowId);
                            htmlFragment += match;
                        }
                    }

                }

                if (rowId == 0) {
                    // nothing found
                    htmlFragment += "<span> No matches found </span>";
                }

                // Output the results to the screen
                var searchResults = document.getElementById('SearchResults3');
                if (searchResults && searchResults.innerHTML !== undefined) {
                    searchResults.innerHTML = htmlFragment;
                }
            }
        }
    }
    function GridHeaderInfo3(showTotalRecords) {
        var htmlFragment = "";
        if (showTotalRecords) {
            htmlFragment += `<div id='hdr-rows'>There are ${dataSet3.length} rows in the data set</div>
        `;
        }
        htmlFragment += `
    <div id='hdr-currentRecords' class='header'>
        <span id='hdr-rowid'>ID</span>
        <span id='hdr-sector'>Sector</span>
        <span id='hdr-community_name'>community_name</span>
        <span id='hdr-group_category'>group</span>
        <span id='hdr-category'>Category</span>
        <span id='hdr-latitude'>Latitude</span>
        <span id='hdr-longitude'>Longitude</span>
        <span id='hdr-map'>selection</span>
    </div>
    <br/>
            `;
        return htmlFragment;
    }

    // This method formats an currentRecord for output
    function outputdataRow3(currentRecord, rowId) {
        var evenRow = "odd-row";
        if ((rowId + 1) % 2 == 0) {
            evenRow = "even-row"
        }
        else {
            evenRow = "odd-row"
        };
        var map = `<a target="_blank" href="https://www.google.ca/maps/place/${currentRecord.geocoded_column.latitude},${currentRecord.geocoded_column.longitude}">Click here to see Map</a>`
        var rowHtmlFragment = `
<div id='row-${rowId}' class='row ${evenRow}'>
    <span class='row-rowid'>${rowId}</span>
    <span class='row-sector'>${currentRecord.sector}</span>
    <span class='row-community_name'>${currentRecord.community_name}</span>
    <span class='row-group_category'>
       
            ${currentRecord.group_category}
       
    </span>
    <span class='row-category'>${currentRecord.category}</span>
    <span class='row-latitude'>${currentRecord.geocoded_column.latitude}</span>
    <span class='row-longitude'>${currentRecord.geocoded_column.longitude}</span>
    <span class='row-map'>${map}</span>
</div> <br>                  
            `;
        return rowHtmlFragment;
    }

