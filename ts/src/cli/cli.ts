import fs from 'fs/promises';
import path from 'path';
import ColorThief from 'colorthief';
import { ColorTuple, rgbToHsluv } from 'hsluv';

import appConfig from '../config';
import logger from '../logging';
import db from '../database';

type Color = [number, number, number];

interface ImageColor {
  path: string;
  dominant: Color;
  palette: Color[];
}

const processImage = async (files: Array<string>): Promise<ImageColor[]> => {
  let imageColors: ImageColor[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const dominant = await ColorThief.getColor(file);
    const palette = await ColorThief.getPalette(file);

    const imageColor: ImageColor = {
      path: file,
      dominant: dominant,
      palette: palette
    };
    logger.info(JSON.stringify(imageColor));
    imageColors.push(imageColor);
  }

  return imageColors;
};

const insertData = async (dataset: Array<ImageColor>) => {
  for (let i = 0; i < dataset.length; i++) {
    const data = dataset[i];
    db.upsertImage({
      path: data.path
    }).catch(err => {
      logger.error(err);
    });
  }
};

(async () => {
  logger.info('Synchronizing all models to database schema...');
  await db.syncSchema();
  logger.info('All models synchronized.');

  let fullPaths: Array<string> = [];
  const files = await fs.readdir(appConfig.resourcePath);

  files.forEach(f => {
    fullPaths.push(path.join(appConfig.resourcePath, f));
  });

  logger.info(`Image count: ${fullPaths.length}`);
  const imageColors = await processImage(fullPaths);
  imageColors.forEach(color => {
    logger.info(color.path);
    logger.info(rgbToHsluv(color.dominant));
  });
  // await insertData(imageColors);
})();