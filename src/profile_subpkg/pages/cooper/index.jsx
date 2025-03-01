import { Button } from "@nutui/nutui-react-taro";
import { Canvas, Image, View } from "@tarojs/components";
import Taro, { useLoad, useReady } from "@tarojs/taro";
import { useEffect, useRef, useState } from "react";
import "./index.scss";
import { TouchBlock } from "./components/touch-block";
import { TouchLine } from "./components/touch-line";

export default function ImgClip() {
  const sysInfo = useRef(null);
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
  const [direction, setDirection] = useState("move"); // 移动方向

  const handleTouchMove = (e) => {
    // console.log(startInfo.current);

    if (e.touches.length === 1) {
      //单指拖动
      const { clientX, clientY } = e.touches[0];
      const { clientX: startX, clientY: startY } = startInfo.current[0];
      const { screenWidth, screenHeight } = sysInfo.current;
      const { width: cropWidth, height: cropHeight, left, top } = cropBoxStyle;

      let newLeft = clientX - startX + left;
      let newTop = clientY - startY + top;

      // 限制裁剪框在图片范围内
      if (newLeft < 0) newLeft = 0;
      if (newTop < 0) newTop = 0;
      if (newLeft + cropWidth > screenWidth) newLeft = screenWidth - cropWidth;
      if (newTop + cropHeight > screenHeight)
        newTop = screenHeight - cropHeight;

      requestAnimationFrame(() => {
        startInfo.current[0] = {
          ...startInfo.current[0],
          clientX,
          clientY,
        };
        setCropBoxStyle((prev) => ({
          ...prev,
          left: newLeft,
          top: newTop,
        }));
      });
    } else {
      //双指放大
      let width = Math.abs(e.touches[0].clientX - e.touches[1].clientX);
      let height = Math.abs(e.touches[0].clientY - e.touches[1].clientY);
    }
  };

  const ctx = useRef(null);
  useReady(() => {
    ctx.current = Taro.createCanvasContext("myCanvas");
  });

  useEffect(() => {
    if (ImgInfo.path && ctx.current) {
      const { devicePixelRatio } = sysInfo.current;
      ctx.current.drawImage(
        ImgInfo.path,
        0,
        0,
        ImgInfo.displayWidth,
        ImgInfo.displayHeight
      );
      ctx.current.scale(devicePixelRatio, devicePixelRatio);
      ctx.current.draw();
    }
  }, [ctx.current, ImgInfo.path]);

  const touchStartFn = (e, type) => {
    e.stopPropagation();
    // console.log(e);
    setDirection(type);
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

  const handleScaleMove = (e) => {
    if (direction === "move") {
      handleTouchMove(e);
      return;
    }
    const flag = direction.includes("-");
    flag ? blockMove(e) : lineMove(e);
  };

  function blockMove(e) {
    const { clientX, clientY } = e.touches[0];
    const { screenWidth } = sysInfo.current;
    const move = clientX - startInfo.current[0].clientX;
    let left, top, size;

    if (direction === "left-top") {
      left = cropBoxStyle.left + move >= 0 ? cropBoxStyle.left + move : 0;
      top = cropBoxStyle.top + move >= 0 ? cropBoxStyle.top + move : 0;
      if (left === 0) top = cropBoxStyle.top;
      size = cropBoxStyle.width - move;
    }

    if (direction === "right-top") {
      left = cropBoxStyle.left;
      top = cropBoxStyle.top - move >= 0 ? cropBoxStyle.top - move : 0;
      size = cropBoxStyle.width + move;
    }

    if (direction === "left-bottom") {
      top = cropBoxStyle.top;
      left = cropBoxStyle.left + move >= 0 ? cropBoxStyle.left + move : 0;
      size = cropBoxStyle.width - move;
    }

    if (direction === "right-bottom") {
      top = cropBoxStyle.top;
      left = cropBoxStyle.left;
      size = cropBoxStyle.width + move;
    }

    if (size <= cropBoxStyle.minScale || size > screenWidth) return;

    if (left >= 0 && top >= 0 && left + size <= sysInfo.current.screenWidth) {
      requestAnimationFrame(() => {
        startInfo.current[0] = {
          ...startInfo.current[0],
          clientX,
          clientY,
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
            height: size,
            left,
            top,
          };
        });
      });
    }
  }

  const lineMove = (e) => {
    const { clientX, clientY } = e.touches[0];
    let left, size, top;
    if (direction === "left" || direction === "right") {
      const move = clientX - startInfo.current[0].clientX;
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
      if (direction === "right") left = cropBoxStyle.left;
    } else {
      const move = clientY - startInfo.current[0].clientY;
      if (move < 0) {
        size = cropBoxStyle.height + Math.abs(move);
        top =
          cropBoxStyle.top - Math.abs(move) >= 0
            ? cropBoxStyle.top - Math.abs(move)
            : 0;
      } else {
        size = cropBoxStyle.height - move;
        top = cropBoxStyle.top + move;
      }
    }

    if (size <= cropBoxStyle.minScale || size > sysInfo.current.screenWidth)
      return;
    if (left >= 0 || top >= 0) {
      requestAnimationFrame(() => {
        startInfo.current[0] = {
          ...startInfo.current[0],
          clientX,
        };
        setCropBoxStyle((prev) => {
          if (prev.left === 0) {
            size = prev.width;
          }
          if (direction === "left" || direction === "right") {
            return {
              ...prev,
              width: size,
              left,
            };
          } else {
            return {
              ...prev,
              height: size,
              top,
            };
          }
        });
      });
    }
  };

  const moveStart = (e) => {
    const { clientX, clientY } = e.touches[0];
    startInfo.current[0] = {
      clientX,
      clientY,
      initialWidth: cropBoxStyle.width,
      initialHeight: cropBoxStyle.height,
      initialLeft: cropBoxStyle.left,
      initialTop: cropBoxStyle.top,
    };
    setDirection("move");
  };

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
          src={ImgInfo.path || ""}
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
        onTouchMove={handleScaleMove}
      >
        <View className="w-full h-full relative overflow-hidden outline outline-1 block outline-[#39f] ">
          <Image
            className="absolute"
            style={{
              top: ImgInfo.top,
              left: ImgInfo.left,
              width: ImgInfo.displayWidth,
              height: ImgInfo.displayHeight,
              transform: `translate(-${cropBoxStyle.left}px, -${cropBoxStyle.top}px)`,
            }}
            src={ImgInfo.path || ""}
          ></Image>
          <Canvas
            className="absolute -left-[9999px]"
            width={ImgInfo.width}
            height={ImgInfo.height}
            canvasId="myCanvas"
          ></Canvas>
        </View>
        <View
          onTouchStart={moveStart}
          className=" bg-white opacity-10 absolute left-0 top-0 w-full h-full z-[52]"
        ></View>

        {/* 竖向 */}
        <View className="absolute top-0 left-1/3 border-l border-2 border-r border-dashed w-1/3 h-full opacity-50 border-[#eee]"></View>
        {/* 横向 */}
        <View className="absolute opacity-50 border-t border-b border-2 border-dashed left-0 top-1/3 w-full h-1/3 border-[#eee]"></View>
        {/* 裁剪框控制点 */}

        {/* 线 */}
        <TouchLine
          type="top"
          startCallback={touchStartFn}
          className={"w-full h-[6rpx] left-0 top-0"}
        ></TouchLine>
        <TouchLine
          type="bottom"
          startCallback={touchStartFn}
          className=" w-full h-[6rpx] left-0 bottom-0"
        ></TouchLine>
        <TouchLine
          startCallback={touchStartFn}
          type="left"
          className="h-full w-[6rpx] left-0 top-0"
        ></TouchLine>
        <TouchLine
          type="right"
          startCallback={touchStartFn}
          className="h-full w-[6rpx] right-0 top-0"
        ></TouchLine>
        {/* 左上角 */}
        <TouchBlock
          className="left-0 top-0"
          type="left-top"
          startCallback={touchStartFn}
        ></TouchBlock>
        {/* 左下角 */}
        <TouchBlock
          type="left-bottom"
          className="left-0 bottom-0"
          startCallback={touchStartFn}
        ></TouchBlock>
        <TouchBlock
          type="right-bottom"
          className="right-0 bottom-0"
          startCallback={touchStartFn}
        ></TouchBlock>
        <TouchBlock
          type="right-top"
          className="right-0 top-0"
          startCallback={touchStartFn}
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
              Taro.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (res) {
                  Taro.showToast({
                    title: "保存成功",
                    icon: "success",
                  });
                },
              });
            },
          });
        }}
      >
        保存
      </Button>
    </View>
  );
}
