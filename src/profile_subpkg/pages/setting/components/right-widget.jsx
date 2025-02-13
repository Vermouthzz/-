import { InputNumber, Switch } from "@nutui/nutui-react-taro";
import { useContext } from "react";
import { Context } from "../../../../context";

export function RightWidget({ type, item }) {
  const { renderType } = item;
  const { setSettingState } = useContext(Context);
  return (
    <>
      {renderType === "inputNumber" ? (
        <InputNumber
          value={item.value}
          onChange={(value) =>
            setSettingState({ type, payload: { type: item.type, value } })
          }
        />
      ) : renderType === "switch" ? (
        <Switch
          checked={item.value}
          onChange={(value) => {
            setSettingState({ type, payload: { type: item.type, value } });
          }}
        />
      ) : null}
    </>
  );
}
