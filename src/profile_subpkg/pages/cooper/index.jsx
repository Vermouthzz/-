import { Button } from "@nutui/nutui-react-taro";
import { Canvas, Image, View } from "@tarojs/components";
import Taro, { useLoad, useReady } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { TouchBlock } from "./components/touch-block";
import { TouchLine } from "./components/touch-line";

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
    minScale: 160,
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
      console.log("重绘");

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
    console.log("执行顺序", options.path);

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

  const touchStartFn = (e) => {
    e.stopPropagation();
    const { clientX, clientY } = e.touches[0];
    startInfo.current[0] = {
      clientX,
      clientY,
      initialWidth: cropBoxStyle.width,
      initialHeight: cropBoxStyle.height,
      initialLeft: cropBoxStyle.left,
      initialTop: cropBoxStyle.top,
    };
  };

  const touchMoveFn = (e) => {
    const { clientX, clientY } = e.touches[0];
    console.log(
      clientX,
      clientY,
      startInfo.current[0].clientX,
      startInfo.current[0].clientY
    );

    const move = Math.abs(clientX - startInfo.current[0].clientX);
    let left, top, size;
    if (clientX - startInfo.current[0].clientX < 0) {
      size = move + cropBoxStyle.width;
      left = cropBoxStyle.left - move >= 0 ? cropBoxStyle.left - move : 0;
      top = cropBoxStyle.top - move >= 0 ? cropBoxStyle.top - move : 0;
    } else {
      size = cropBoxStyle.width - move;
      left = cropBoxStyle.left + move;
      top = cropBoxStyle.top + move;
    }

    if (size <= cropBoxStyle.minScale || size > sysInfo.current.screenWidth)
      return;

    if (left >= 0 && top >= 0) {
      requestAnimationFrame(() => {
        startInfo.current[0] = {
          ...startInfo.current[0],
          clientX,
          clientY,
        };
        setCropBoxStyle((prev) => ({
          ...prev,
          width: size,
          height: size,
          left,
          top,
        }));
      });
    }
  };

  const lineMove = (e) => {
    console.log(e.touches[0], startInfo.current[0]);

    const { clientX, clientY } = e.touches[0];
    const move = clientX - startInfo.current[0].clientX;
    let left, size;
    if (move < 0) {
      size = cropBoxStyle.width + Math.abs(move);
      left =
        cropBoxStyle.left - Math.abs(move) >= 0
          ? cropBoxStyle.left - Math.abs(move)
          : 0;
    } else {
      size = cropBoxStyle.width - move;
      left = cropBoxStyle.left + move;
    }
    if (size <= cropBoxStyle.minScale || size > sysInfo.current.screenWidth)
      return;
    if (left >= 0 && startInfo.current[0].can_change) {
      requestAnimationFrame(() => {
        startInfo.current[0] = {
          ...startInfo.current[0],
          clientX,
        };
        setCropBoxStyle((prev) => {
          if (prev.left === 0) {
            size = prev.width;
          }
          if (prev.top === 0) {
            size = prev.height;
          }
          return {
            ...prev,
            width: size,
            left,
          };
        });
      });
    }
  };

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
        onTouchMove={(e) => {
          // console.log(e, "事件委托");
        }}
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
        <TouchLine className={"w-full h-[2rpx] left-0 top-0"}></TouchLine>
        <TouchLine className=" w-full h-[2rpx] left-0 bottom-0"></TouchLine>
        <TouchLine
          startCallback={touchStartFn}
          moveCallback={lineMove}
          className="h-full w-[4rpx] left-0 top-0"
        ></TouchLine>
        <TouchLine className="h-full w-[2rpx] right-0 top-0"></TouchLine>
        {/* 左上角 */}
        <TouchBlock
          className="left-0 top-0"
          startCallback={touchStartFn}
          moveCallback={touchMoveFn}
        ></TouchBlock>
        {/* 左下角 */}
        <TouchBlock
          className="left-0 bottom-0"
          startCallback={touchStartFn}
          moveCallback={touchMoveFn}
        ></TouchBlock>
        <TouchBlock
          className="right-0 bottom-0"
          startCallback={touchStartFn}
          moveCallback={touchMoveFn}
        ></TouchBlock>
        <TouchBlock
          className="right-0 top-0"
          startCallback={touchStartFn}
          moveCallback={touchMoveFn}
        ></TouchBlock>
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
