import { Button } from "@nutui/nutui-react-taro";
import { Canvas, Image, View } from "@tarojs/components";
import Taro, { useLoad, useReady } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";

export default function ImgClip() {
  const sysInfo = useRef(null);
  const moveParent = useRef(null);
  const moveItem = useRef(null);
  const [ImgInfo, setImgInfo] = useState({
    //图片信息
    path: "",
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    displayWidth: 0,
    displayHeight: 0,
  });
  const startInfo = useRef([]);
  const [cropBoxStyle, setCropBoxStyle] = useState({
    width: 200, // 裁剪框宽度
    height: 200, // 裁剪框高度
    top: 0, // 裁剪框顶部位置
    left: 0, // 裁剪框左侧位置
  });
  const [scale, setScale] = useState(1); // 缩放比例

  const handleTouchMove = (e) => {
    if (e.touches.length === 1) {
      //单指拖动
      const { clientX, clientY } = e.touches[0];
      const { screenWidth, screenHeight } = sysInfo.current;
      const { width: cropWidth, height: cropHeight } = cropBoxStyle;

      let newLeft = clientX - cropWidth / 2;
      let newTop = clientY - cropHeight / 2;

      // 限制裁剪框在图片范围内
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + cropWidth > screenWidth) newLeft = screenWidth - cropWidth;
      if (newTop + cropHeight > screenHeight)
        newTop = screenHeight - cropHeight;

      setCropBoxStyle((prev) => ({
        ...prev,
        left: newLeft,
        top: newTop,
      }));
    } else {
      //双指放大
      let width = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
      let height = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
    }
  };

  const handleScale = (e) => {
    if (e.touches.length === 2) {
      const distance = Math.sqrt(
        Math.pow(e.touches[1].clientX - e.touches[0].clientX, 2) +
          Math.pow(e.touches[1].clientY - e.touches[0].clientY, 2)
      );

      // 计算缩放比例
      const newScale = distance / 200; // 200是一个基准值，可以根据需要调整
      setScale(newScale);
      setCropBoxStyle((prev) => ({
        ...prev,
        width: 200 * newScale, // 根据缩放比例调整裁剪框宽度
        height: 200 * newScale, // 根据缩放比例调整裁剪框高度
      }));
    }
  };
  const ctx = useRef(null);
  useReady(() => {
    ctx.current = Taro.createCanvasContext("myCanvas");
  });

  useEffect(() => {
    if (ImgInfo.path) {
      console.log(ImgInfo.width, ImgInfo.height);
      ctx.current.drawImage(
        ImgInfo.path,
        0,
        0,
        ImgInfo.displayWidth,
        ImgInfo.displayHeight
      );
      ctx.current.draw();
    }
  }, [ctx.current]);

  useLoad((options) => {
    const { path } = options;
    sysInfo.current = Taro.getSystemInfoSync();

    Taro.getImageInfo({
      src: path,
      success: (info) => {
        let w, h;
        const { screenWidth, screenHeight, devicePixelRatio } = sysInfo.current;
        const { width, height } = info;
        w = width > screenWidth ? screenWidth : width;
        const ratio = width / height;
        h = w / ratio;
        // 初始化裁剪框位置
        const top = (screenHeight - h) / 2;
        const left = (screenWidth - w) / 2;
        // 调整 Canvas 大小
        const canvasWidth = w * devicePixelRatio;
        const canvasHeight = h * devicePixelRatio;
        setImgInfo({
          width: canvasWidth,
          height: canvasHeight,
          left,
          top,
          path,
          displayWidth: w,
          displayHeight: h,
        });
        setCropBoxStyle((prev) => ({
          ...prev,
          top: top > 0 ? top : 0,
          left: left > 0 ? left : 0,
        }));
      },
    });
  });

  return (
    <View
      className="h-screen w-screen relative z-50 touch-none"
      // catchMove
    >
      <View className="absolute overflow-hidden left-0 top-0 w-full h-full">
        <Image
          className="absolute"
          style={{
            width: ImgInfo.displayWidth,
            height: ImgInfo.displayHeight,
            left: ImgInfo.left,
            top: ImgInfo.top,
          }}
          src={ImgInfo?.path}
        ></Image>
      </View>
      {/* 遮罩层 */}
      <View className="bg-[#000] opacity-50 w-full h-full absolute left-0 top-0"></View>
      {/* 裁剪框 */}
      <View
        style={{
          width: cropBoxStyle.width + "px",
          height: cropBoxStyle.height + "px",
          transform: `translate(${cropBoxStyle.left}px, ${cropBoxStyle.top}px)`,
        }}
        className="absolute"
        ref={moveParent}
      >
        <View className="w-full h-full relative overflow-hidden outline outline-1 block outline-[#39f] ">
          <Canvas
            className="absolute"
            style={{
              top: ImgInfo.top,
              left: ImgInfo.left,
              width: ImgInfo.displayWidth,
              height: ImgInfo.displayHeight,
              transform: `translate(-${cropBoxStyle.left}px, -${cropBoxStyle.top}px)`,
            }}
            width={ImgInfo.width}
            height={ImgInfo.height}
            canvasId="myCanvas"
          ></Canvas>
        </View>
        <View
          ref={moveItem}
          onTouchStart={(e) => {
            if (e.touches.length > 1) {
              startInfo.current[0] = {
                clientX: e.touches[0].clientX,
                clientY: e.touches[0].clientY,
              };
              startInfo.current[1] = {
                clientX: e.touches[1].clientX,
                clientY: e.touches[1].clientY,
              };
            }
            console.log(startInfo.current);
          }}
          onTouchMove={handleTouchMove}
          className=" bg-white opacity-10 absolute left-0 top-0 w-full h-full"
        ></View>
        {/* 线 */}
        <View
          onTouchMove={(e) => {
            console.log(111, e);
          }}
          className="line-border w-full h-[2rpx] left-0 top-0"
        ></View>
        <View className="line-border w-full h-[2rpx] left-0 bottom-0 "></View>
        <View className="line-border h-full w-[2rpx] left-0 top-0"></View>
        <View className="line-border h-full w-[2rpx] right-0 top-0"></View>
        {/* 角 */}
        <View
          onTouchMove={(e) => {
            const { clientX, clientY } = e.touches[0];
            const move = startInfo.current.clientX - clientX;
            console.log(move);
            setCropBoxStyle((prev) => ({
              ...prev,
              width: prev.width + move,
              height: prev.height + move,
              left: prev.left - move / 2,
              top: prev.top - move / 2,
            }));
          }}
          onTouchStart={(e) => {
            const { clientX, clientY } = e.touches[0];
            startInfo.current[0] = {
              clientX,
              clientY,
            };
            console.log(startInfo.current[0]);
          }}
          className="line-border w-[16rpx] h-[16rpx] left-0 top-0 z-[52]"
        ></View>
        <View className="line-border w-[16rpx] h-[16rpx] left-0 bottom-0 z-[52]"></View>
        <View className="line-border w-[16rpx] h-[16rpx] right-0 top-0 z-[52]"></View>
        <View className="line-border w-[16rpx] h-[16rpx] right-0 bottom-0 z-[52]"></View>
      </View>

      <Button
        onClick={() => {
          const { devicePixelRatio } = sysInfo.current;

          Taro.canvasToTempFilePath({
            x: cropBoxStyle.left - ImgInfo.left,
            y: cropBoxStyle.top - ImgInfo.top,
            width: cropBoxStyle.width,
            height: cropBoxStyle.height,
            destWidth: cropBoxStyle.width, // 保持高清输出
            destHeight: cropBoxStyle.height,
            canvasId: ctx.current.canvasId,
            success: function (res) {
              console.log(res.tempFilePath);
            },
          });
        }}
      >
        保存
      </Button>
    </View>
  );
}
