export const preloadImages = (drinks: Array<any>) => {
  const loadImage = (imageUrl: string) => {
    const img = new Image();
    img.src = imageUrl;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      }
    });
  }
  const promiseArray = new Array;
  drinks.forEach((drink, _index) => {
    promiseArray.push(loadImage(drink.sample_image_url));
    promiseArray.push(loadImage(drink.content_image_url));
  });
  return Promise.all(promiseArray);
};

export const judgeDevice = () => {
  if (navigator.userAgent.indexOf("iPhone") > 0) {
    return "iphone";
  } else if (navigator.userAgent.indexOf("Android") > 0 && navigator.userAgent.indexOf("Mobile") > 0) {
    return "android";
  } else if (navigator.userAgent.indexOf("iPad") > 0) {
    return "ipad";
  } else if (navigator.userAgent.indexOf("Android") > 0) {
    return "android_tablet";
  } else {
    return "pc";
  }
};

export const isPC = () => {
  let userAgent = judgeDevice();
  if (userAgent === "pc") {
    return true;
  } else {
    return false;
  }
};
