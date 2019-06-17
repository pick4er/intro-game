const ASSET_NAMES = [
  'ship.svg',
  'bullet.svg',
];

const assets = {};

const downloadAssetsPromise = Promise.all(ASSET_NAMES.map(downloadAsset));

function downloadAsset(assetName) {
  return new Promise(resolve => {
    const asset = new Image();
    asset.onload = () => {
      assets[assetName] = asset;
      resolve();
    };
    asset.src = `/${assetName}`;
  });
}

export const downloadAssets = () => downloadAssetsPromise;

export const getAsset = assetName => assets[assetName];
