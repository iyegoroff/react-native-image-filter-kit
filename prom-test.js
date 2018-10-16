const config = {
  name: 'RoundAsCircle',
  image: {
    name: 'PorterDuff',
    mode: 'LIGHTEN',
    src: {
      name: 'IterativeBoxBlur',
      radius: 25,
      iterations: 5,
      image: 0
    },
    dst: {
      name: 'PorterDuff',
      mode: 'DARKEN',
      src: 1,
      dst: {
        name: 'PageTransition',
        image: 2,
        background: {
          name: 'Color',
          image: 3
        },
        nextImage: {
          name: 'Matrix',
          matrix: [1, 2, 3],
          image: 1
        }
      }
    }
  }
};

const images = ['test', 'puk', 'page', 'red'];

const roundAsCircle = (image) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`roundAsCircle(${image})`), 1000);
  });
};

const iterativeBoxBlur = (image, radius, iterations) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`iterativeBoxBlur(${image}, ${radius}, ${iterations})`), 1000);
  });
};

const porterDuff = (src, dst, mode) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`porterDuff(${src}, ${dst}, ${mode})`), 1000);
  });
};

const pageTransition = (image, background, nextImage) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`pageTransition(${image}, ${background}, ${nextImage})`), 1000);
  });
};

const color = (image) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`color(${image})`), 1000);
  });
};

const matrix = (image, matrix) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`matrix(${image}, ${matrix})`), 1000);
  });
};

const parseConfig = (config, images) => {
  if (typeof config === 'number') {
    return Promise.resolve(images[config]);
  }

  if (config.name === 'RoundAsCircle') {
    return parseConfig(config.image, images)
      .then((image) => roundAsCircle(image));
  }

  if (config.name === 'IterativeBoxBlur') {
    return parseConfig(config.image, images)
      .then((image) => iterativeBoxBlur(image, config.radius, config.iterations));
  }

  if (config.name === 'PorterDuff') {
    return Promise.all([
      parseConfig(config.src, images),
      parseConfig(config.dst, images)
    ]).then(([src, dst]) => porterDuff(src, dst, config.mode));
  }

  if (config.name === 'PageTransition') {
    return Promise.all([
      parseConfig(config.image, images),
      parseConfig(config.background, images),
      parseConfig(config.nextImage, images)
    ]).then(([image, background, nextImage]) => pageTransition(image, background, nextImage));
  }

  if (config.name === 'Color') {
    return parseConfig(config.image, images)
      .then((image) => color(image));
  }

  if (config.name === 'Matrix') {
    return parseConfig(config.image, images)
      .then((image) => matrix(image, config.matrix));
  }
};

console.time('filtering');
parseConfig(config, images)
  .then(image => {
    console.log(image);
    console.timeEnd('filtering');
  });
