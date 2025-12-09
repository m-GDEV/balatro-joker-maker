import * as htmlToImage from "../lib/html-to-image-dist";

export function captureImage() {
  htmlToImage.toPng(document.getElementById('JokerDiv'))
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
  console.log(key, value, imageOverride)

  // If the value is an image, we need to encode it
  if ((key == "mainImage" || key == "backgroundImage") && !imageOverride) {
    copy[key] = URL.createObjectURL(value);
  } else {
    copy[key] = value;
  }
  console.log("Modified copy:", copy);
  return copy;
}

// Inverts a hex color
export function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}