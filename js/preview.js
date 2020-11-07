'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const PREVIEW = window.scale.IMG_UPLOAD_PREVIEW.querySelector(`img`);

window.form.UPLOAD_FILE.addEventListener(`change`, () => {
  let file = window.form.UPLOAD_FILE.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    let reader = new FileReader();

    reader.addEventListener(`load`, () => {
      PREVIEW.src = reader.result;
      window.effects.EFFECTS_PREVIEWS.forEach((preview) => {
        preview.style.backgroundImage = `url("${reader.result}")`;
      });
    });

    reader.readAsDataURL(file);
  }
});
