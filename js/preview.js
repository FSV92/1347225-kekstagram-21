'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

let preview = window.scale.imgUploadPreview.querySelector(`img`);

window.form.uploadFile.addEventListener(`change`, function () {
  let file = window.form.uploadFile.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
      for (let i = 0; i < window.effects.effectsPreview.length; i++) {
        window.effects.effectsPreview[i].style.backgroundImage = `url("${reader.result}")`;
      }
    });

    reader.readAsDataURL(file);
  }
});
