import html2canvas from "html2canvas";
import * as htmlToImage from "../lib/html-to-image-dist";

export const captureElement = async () => {
    console.log("got here")
    if (typeof window !== 'undefined') {
      const element = document.getElementById("JokerDiv");
      if (element) {
        try {
          // Add delay to ensure full rendering
          await new Promise(resolve => setTimeout(resolve, 500));
          
          const canvas = await html2canvas(element, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            scale: 4,
            logging: true,
            onclone: (clonedDoc) => {
              console.log('Cloned document for capture');
            }
          });
          
          const link = document.createElement('a');
          link.download = 'joker-capture.png';
          link.href = canvas.toDataURL();
          link.click();
        } catch (error) {
          console.error('Capture failed:', error);
        }
      }
    }
  };

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