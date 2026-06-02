import * as esbuild from 'esbuild';
import fs from "fs/promises";
import {
  createWriteStream
} from "fs";
import {
  zip
} from 'zip-a-folder';

const entryFile = "index.ts";
const outputFile = "index.min.js";
const buildDirPath = "./build/";

try {
  console.time("构建耗时");
  await fs.rm(buildDirPath, {
    recursive: true, force: true
  });
  await fs.mkdir(buildDirPath);
  await esbuild.build({
    entryPoints: [entryFile],
    bundle: true,
    minify: true,
    outfile: buildDirPath + outputFile,
  });
  const manifestText = (await fs.readFile("manifest.json", 'utf8')).replaceAll("{main}", outputFile);
  const manifest = JSON.parse(manifestText);
  const name = manifest.name;
  const newManifestText = JSON.stringify(manifest, null, 4);
  await fs.writeFile(buildDirPath + "manifest.json", newManifestText);
  await zip(buildDirPath, name + '.vbe');
  console.log("构建成功", "已导出的扩展文件：" + buildDirPath + name + '.vbe');
  console.timeEnd("构建耗时");
  process.exit(0);
} catch(e) {
  console.error("构建出错", e);
  process.exit(1);
}