import { view as view_1 } from "./SelectModal";
import { name, availableFilters } from "./Filters/CombinedFilter";
export function view(isVisible, dispatch) {
  return view_1(availableFilters, null, name, function (x, y) {
    return x.Equals(y);
  }, isVisible, dispatch);
}