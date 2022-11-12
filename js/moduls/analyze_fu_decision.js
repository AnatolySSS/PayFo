// import JSZip from 'jszip';
// import Docxtemplater from 'docxtemplater';

export function decision_analize(files){
    var numFiles = files.length;

    for (var i = 0; i < numFiles; i++) {
      // var file = files[i];
      console.log(files[i].name);
      console.log(files[i].type);
      console.log(files[i].size);
      // let reader = new FileReader();
      // reader.readAsText(files[i], "WINDOWS-1251");
      // reader.readAsArrayBuffer(files[i]);
      // const content = fs.readFileSync(
      //     files[i],
      //     "binary"
      // );
      // var zip = new JSZip(content);
      // var doc = new Docxtemplater().loadZip(zip)
      var text = doc.getFullText();
      $("#decision_text").html(text);

      // reader.onload = function(){
        // var str = String.fromCharCode(...new Uint8Array(reader.result));
        // let decoder = new TextDecoder();
        // let str = decoder.decode(reader.result);
        // $("#decision_text").html(str);
      // }
    }
	}
