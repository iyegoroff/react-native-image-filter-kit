import { view as view_1, Message } from "./SelectModal";
import { Message as Message_1 } from "./Select";
import { equals, name, availableImages, random } from "./Image";
export function view(image, isVisible, dispatch) {
  const dispatch_ = function (_arg1) {
    const $var1 = _arg1.tag === 1 ? _arg1.data.data.tag === 1 ? [0] : [1, _arg1] : [1, _arg1];

    switch ($var1[0]) {
      case 0:
        dispatch(new Message(1, new Message_1(0, random())));
        break;

      case 1:
        dispatch($var1[1]);
        break;
    }
  };

  return view_1(availableImages, image, name, equals, isVisible, dispatch_);
}