import { View, Canvas } from "@tarojs/components";
import Taro, { useLoad, useReady } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";

// const props = {
//   backUrl:
//     "https://planet-yuan.oss-cn-beijing.aliyuncs.com/planet/system/aPoster/userPoster.jpg",
//   code: "https://planet-yuan.oss-cn-beijing.aliyuncs.com/planet/mpcodes/03c22705-a99e-4224-9787-9c5f393ff070-1719969356430.png",
// };

export default function SharePoster({}) {
  const ctx = useRef(null);

  // const [canvasInfo, setCanvasInfo] = useState({});

  const [ImgInfo, setImgInfo] = useState({
    path: "",
    width: 0,
    height: 0,
    displayWidth: 0,
    displayHeight: 0,
  });

  useReady(() => {
    ctx.current = Taro.createCanvasContext("myCanvas");
    // const canvas = Taro.createSelectorQuery().select("#myCanvas");
  });

  function fillTexts() {
    ctx.current.setFillStyle("#000000");
    ctx.current.setFontSize(20);
    ctx.current.fillText("Hello, World!", 10, 30);
    // ctx.current.draw();
  }

  useEffect(() => {
    if (ImgInfo.path && ctx.current) {
      const { devicePixelRatio } = Taro.getSystemInfoSync();
      ctx.current.drawImage(
        ImgInfo.path,
        0,
        0,
        ImgInfo.displayWidth,
        ImgInfo.displayHeight
      );
      fillTexts();
      ctx.current.scale(devicePixelRatio, devicePixelRatio);
      ctx.current.draw();
    }
  }, [ctx.current, ImgInfo.path]);
  useLoad(({ backUrl }) => {
    console.log(backUrl);

    const { screenHeight, screenWidth, devicePixelRatio } =
      Taro.getSystemInfoSync();
    Taro.getImageInfo({
      src: backUrl,
      success: (res) => {
        const { width, height, path } = res;

        const canvasWidth = screenWidth - 30; // 画布宽度
        const scale = width / canvasWidth;
        const canvasHeight = height / scale; // 画布高度
        setImgInfo({
          path: backUrl,
          width: canvasWidth * devicePixelRatio,
          height: canvasHeight * devicePixelRatio,
          displayWidth: canvasWidth,
          displayHeight: canvasHeight,
        });
        // ctx.current.drawImage(path, 0, 0, canvasWidth, canvasHeight);
      },
    });
  });
  return (
    <View className="relative">
      <View className="absolute top-[15px] left-[30px]">
        <Canvas
          canvasId="myCanvas"
          width={ImgInfo.width}
          height={ImgInfo.height}
          style={{
            width: `${ImgInfo.displayWidth}px`,
            height: `${ImgInfo.displayHeight}px`,
          }}
        ></Canvas>
      </View>
      <View
        className=""
        onClick={() => {
          Taro.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ["album"],
            success: (res) => {
              console.log(res.tempFilePaths[0]);
              setImgInfo({
                url: res.tempFilePaths[0],
              });
            },
          });
        }}
      >
        上传bg
      </View>
      <View
        className=""
        onClick={() => {
          Taro.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: ImgInfo.width,
            height: ImgInfo.height,
            destWidth: ImgInfo.width, // 保持高清输出
            destHeight: ImgInfo.height,
            canvasId: "myCanvas",
            success: (res) => {
              console.log(res.tempFilePath);
              // Taro.saveImageToPhotosAlbum({
              //   filePath: res.tempFilePath,
              //   success: (res) => {
              //     console.log(res);
              //   },
              // });
            },
          });
        }}
      >
        点击保存
      </View>
    </View>
  );
}
