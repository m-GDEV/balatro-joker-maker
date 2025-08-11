import html2canvas from "html2canvas";

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
            backgroundColor: null,
            scale: 2,
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