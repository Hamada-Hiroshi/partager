export const preloadImages = (drinks) => {
  const loadImage = (imageUrl) => {
    const img = new Image();
    img.src = imageUrl;
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(img);
      }
    });
  }
  const promiseArray = new Array;
  drinks.forEach((drink, index) => {
    promiseArray.push(loadImage(drink.sample_image_url));
    promiseArray.push(loadImage(drink.content_image_url));
  });
  return Promise.all(promiseArray);
};
