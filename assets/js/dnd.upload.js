
class DndUpload {
    constructor(target) {
        this.parent = document.querySelector(target),
        this.fileInput = document.querySelector(target + ' input[type="file"]'),
        this.infoEl = document.querySelector(target + ' .file-info'),
        this.file = null;

        var object = this;

        this.parent.addEventListener('dragover', function(e) {
            object.dragOver(e);
        });

        this.parent.addEventListener('dragleave', function(e) {
            object.dragLeave(e);
        });

        this.parent.addEventListener('drop',  function(e) {
            object.drop(e);
        });

        this.fileInput.onchange = function(e) {
            object.getBase64( e.target.files[0] );
            object.showListFiles( e.target.files );
        }
    }

    dragOver(e) {
        e.preventDefault();
        this.parent.classList.add('drag-over');
    }

    dragLeave(e) {
        this.parent.classList.remove('drag-over');
    }

    drop(e) {
        e.preventDefault();
        this.parent.classList.remove('drag-over');
        
        this.getBase64( e.dataTransfer.files[0] );

        this.showListFiles( e.dataTransfer.files );
    }

    showListFiles(files) {
        var output = '',
            listLength = files.length;
        for (var i = 0; i < listLength; i++) {
            output += files[i].name;
            if(i < listLength - 1) {
                output += ', ';
            }
        }
        this.infoEl.innerHTML = output;
        this.infoEl.classList.remove('d-none');
    }

    getBase64(file) {
        var reader = new FileReader(),
            object = this;
        reader.readAsDataURL(file);
        reader.onload = function () {
            object.fileInput.setAttribute('data-file', reader.result );
            object.file = reader.result;
        };
    }
}
