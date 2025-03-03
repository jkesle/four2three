import ffmpeg from "fluent-ffmpeg"
import path from "path";
import { argv } from "process";

function mp4ToMp3(inPath) {
    const outPath = path.join(path.dirname(argv[1]), "mp3", `${path.basename(inPath).split(".")[0]}.mp3`);
    ffmpeg(inPath)
          .output(outPath)
          .audioCodec('libmp3lame')
          .audioBitrate(128)
          .on('end', () => {
              console.log("Conversion finished successfully.");
          })
          .on('error', (err) => {
              console.error("ERROR: Conversion did not finish successfully", err);
          })
          .run();
}

const argsLength = argv.length;
if (argsLength < 4) throw new EvalError("No input mp4 file path provided");

mp4ToMp3(argv[3]);