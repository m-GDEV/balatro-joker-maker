import * as htmlToImage from "../lib/html-to-image-dist";

export function captureImage() {
  htmlToImage.toSvg(document.getElementById('JokerDiv'))
    .then(function (dataUrl) {
      var link = document.createElement('a');
      link.download = 'joker-image.png';
      link.href = dataUrl;
      link.click();
    }).catch(function (error) {
      console.log('oops, something went wrong!', error);
    });
}

export function getImageDataUrl() {
  htmlToImage.toSvg(document.getElementById('JokerDiv'))
    .then(function (dataUrl) {
      return dataUrl
    }).catch(function (error) {
      console.log('oops, something went wrong!', error);
    });
}

// ModifyValueAndReturnCopy: Makes it easy to modify one property of the object in a setState call
export function MVRC(obj, key, value, imageOverride = false) {
  let copy = structuredClone(obj);

  // If the value is an image, we need to encode it
  if ((key == "mainImage" || key == "backgroundImage") && !imageOverride) {
    copy[key] = URL.createObjectURL(value);
    console.log(copy[key])
  } else {
    copy[key] = value;
  }
  return copy;
}