var reader = new FileReader();

// file reading started
reader.addEventListener('loadstart', function() {
    console.log('File reading started');
});

// file reading finished successfully
reader.addEventListener('load', function(e) {
    var text = e.target.result;

    // contents of the file
    console.log(text);
});

// file reading failed
reader.addEventListener('error', function() {
    alert('Error : Failed to read file');
});
reader.addEventListener("loadend", function() {
    // reader.result contains the contents of blob as a typed array
    // we insert content of file in DOM here
    // document.getElementById('file').innerText = reader.result;
    console.log("reader.result", reader.result)
 });

// file read progress 
reader.addEventListener('progress', function(e) {
    if(e.lengthComputable == true) {
    	var percent_read = Math.floor((e.loaded/e.total)*100);
    	console.log(percent_read + '% read');
    }
});

reader.onload = function(){
    var dataURL = reader.result;
    console.log("reader.onload -> dataURL", dataURL)
    
};

// read as text file
// const fs = require('fs') 
  

window.document.onload = function(e){
    let table = document.getElementById("table")
    let input = document.getElementById("input")
    let content;

    input.addEventListener('change', function(e) {
        var file = input.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();

            reader.onload = function(e) {
                content = reader.result;
                var regExp = (/^[^\[]*(\[[^\]]*])/gm);
                matches = []
                // var matches = regExp.exec(content);

               
                // console.log("reader.onload -> matches", matches)
                // matches = regExp.exec(content)
                var pattern = /^[^\[]*(\[[^\]]*])/gm;

                while ((match = pattern.exec(content)) != null)
                {
                    matches.push(match[1]);
                }

                for(var i =0; i < matches.length; i++){
                    var row = table.insertRow(i);
                    var cell1 = row.insertCell(0);
                    cell1.innerHTML = `<img src='image${i}.png' alt='hello' height='100' width='100' />`

                    var cell2 = row.insertCell(1);
                    cell2.innerHTML = matches[i]

                }

                
            }

            reader.readAsText(file);    
        } else {
            fileDisplayArea.innerText = "File not supported!"
        }
    });

    
    // console.log("window.document.onload -> table", table)
    // var row = table.insertRow(0);

    // var cell1 = row.insertCell(0);
    // cell1.innerHTML = "<img src='image1.png' alt='hello'/>"

    reader.readAsText("test.txt", 'ISO-8859-1')
}

window.addEventListener('load', window.document.onload, false)