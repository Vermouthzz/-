import { Dialog } from "@nutui/nutui-react-taro";
export function CommonDialog({ children, confirmCallback }) {
  const [visible, setVisible] = useState(false);
  const confirm = () => {
    confirmCallback();
    setVisible(false);
  };
  return (
    <Dialog
      visible={visible}
      onConfirm={confirm}
      onCancel={() => setVisible(false)}
    >
      {children}
    </Dialog>
  );
}
